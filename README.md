# Golf Charity Subscription Platform

Microservice-oriented MERN assignment based on the PRD.

## Stack

- Frontend: React + Vite + Tailwind CSS
- API Gateway: Express
- Auth service: Node.js + Express + JWT + bcrypt
- Game service: Node.js + Express + MongoDB + Mongoose
- Subscription service: Node.js + Express + Stripe
- Database: MongoDB

## Project structure

- `frontend`: React application with pages, reusable UI, routing, and API services
- `frontend/src/components`: shared UI blocks like navbar, route guard, and stat cards
- `frontend/src/pages`: landing, auth, dashboard, score, charity, subscription, and admin screens
- `frontend/src/services`: Axios-based API layer with domain-specific clients
- `frontend/src/context`: authentication state and token persistence
- `backend/api-gateway`: single public backend entry that forwards traffic to internal services
- `backend/services/auth-service`: user model, registration, login, profile fetch, and admin user listing
- `backend/services/game-service`: charity, score, draw, and admin score endpoints
- `backend/services/subscription-service`: Stripe checkout, webhook handling, and subscription persistence
- `controllers`: request handlers
- `routes`: endpoint registration
- `models`: database schemas
- `middleware`: auth guards and error handlers
- `services`: reusable business logic for cleaner controllers
- `config`: environment and MongoDB setup

## Domain relationships and indexing

- `User -> Charity`: `selectedCharity` stores the chosen charity reference for each user
- `Score -> User`: each score belongs to a single user through `userId`
- `Subscription -> User`: each subscription record belongs to one user through `userId`
- `Draw -> Winners -> User`: each draw stores winner snapshots and the user reference for that result
- `User.email`: unique index for fast login lookup and duplicate prevention
- `User.subscriptionStatus`, `User.selectedCharity`, `User.stripeCustomerId`: indexed for dashboard and payment workflows
- `Score.userId + date + createdAt`: indexed to fetch the latest five scores quickly
- `Subscription.userId + createdAt`: indexed to fetch the newest subscription status efficiently
- `Draw.createdAt`: indexed to fetch the latest draw quickly

## Environment files

Backend now uses one shared root env file. Frontend keeps its own Vite env file.

- `backend/.env` for all backend services and gateway
- `frontend/.env` for frontend `VITE_*` values

## Run locally

1. Install dependencies with `npm install`
2. Fill `backend/.env` and `frontend/.env` with your real values
3. Seed sample charities with `npm run seed:charities -w backend/services/game-service`
4. Start everything with `npm run dev` or run backend only with `npm run dev:backend`

## Default ports

- Gateway: `4000`
- Auth service: `4001`
- Game service: `4002`
- Subscription service: `4003`
- Frontend: `5173`

## Notes

- The score system keeps only the latest five scores per user and removes older entries automatically
- The draw system generates five unique numbers between `1` and `45`
- Winners are grouped by `3-match`, `4-match`, and `5-match` logic
- Stripe webhook support is wired for `checkout.session.completed`
- To access the admin panel, set a user's `role` to `admin` in MongoDB after signup


## Simpler backend start

- From project root: `npm run dev:backend`
- From inside `backend`: `node main.js`


pass - 5rGkcXkivn8F9qVv
user - saurbhsrivastav6_db_user

