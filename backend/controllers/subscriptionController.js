import { Subscription } from "../models/Subscription.js";
import { User } from "../models/User.js";
import { stripe } from "../config/stripe.js";

const priceMap = {
    monthly: process.env.STRIPE_MONTHLY_PRICE_ID,
    yearly: process.env.STRIPE_YEARLY_PRICE_ID
};

export const createCheckoutSession = async (req, res, next) => {
    try {
        const { plan } = req.body;
        const priceId = priceMap[plan];

        if (!priceId) {
            const error = new Error("Invalid subscription plan");
            error.statusCode = 400;
            throw error;
        }

        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [{ price: priceId, quantity: 1 }],
            customer_email: req.user.email,
            success_url: `${process.env.FRONTEND_URL}/subscription?status=success`,
            cancel_url: `${process.env.FRONTEND_URL}/subscription?status=cancelled`,
            metadata: {
                userId: req.user._id.toString(),
                plan
            }
        });

        if (process.env.NODE_ENV === "development" || process.env.NODE_ENV !== "production") {
            // Local testing bypass: instantly activate since local webhook may not be forwarded
            await Subscription.create({
                userId: req.user._id,
                plan,
                status: "active",
                stripeSessionId: session.id,
                startDate: new Date()
            });

            await User.findByIdAndUpdate(req.user._id, {
                subscriptionStatus: "active",
                subscriptionRenewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            });
        } else {
            // Production flow: wait for Stripe Webhook
            await Subscription.create({
                userId: req.user._id,
                plan,
                status: "pending",
                stripeSessionId: session.id
            });
        }

        res.status(201).json({ url: session.url, sessionId: session.id });
    } catch (error) {
        next(error);
    }
};

export const handleStripeWebhook = async (req, res, next) => {
    let event;

    try {
        const signature = req.headers["stripe-signature"];
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        error.statusCode = 400;
        return next(error);
    }

    try {
        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            const userId = session.metadata.userId;
            const plan = session.metadata.plan;

            await Subscription.findOneAndUpdate(
                { stripeSessionId: session.id },
                {
                    status: "active",
                    plan,
                    stripeSubscriptionId: session.subscription,
                    startDate: new Date()
                },
                { new: true }
            );

            await User.findByIdAndUpdate(userId, {
                subscriptionStatus: "active",
                stripeCustomerId: session.customer,
                subscriptionRenewalDate: session.expires_at
                    ? new Date(session.expires_at * 1000)
                    : null
            });
        }

        res.json({ received: true });
    } catch (error) {
        next(error);
    }
};

export const getMySubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findOne({ userId: req.user._id }).sort({
            createdAt: -1
        });

        res.json({
            subscription,
            user: {
                subscriptionStatus: req.user.subscriptionStatus,
                stripeCustomerId: req.user.stripeCustomerId,
                subscriptionRenewalDate: req.user.subscriptionRenewalDate
            }
        });
    } catch (error) {
        next(error);
    }
};
