# Golf Charity Subscription Platform

A unified MERN monolith application for managing golf scores, charity contributions, and subscriptions.

## Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend (Monolith)**: Node.js + Express + MongoDB + Mongoose
- **Payments**: Stripe Integration
- **Email**: Resend API
- **Database**: MongoDB Atlas

## Project Structure

- `frontend`: React application (Vite)
  - `src/components`: Reusable UI components (Navbar, StatCards, etc.)
  - `src/pages`: Functional screens (Landing, Dashboard, Score Entry, Admin Panel)
  - `src/services`: API client layer
- `backend`: Unified Express server
  - `controllers/`: Logic for Auth, Game, Charity, and Subscriptions
  - `models/`: Mongoose schemas (User, Score, Charity, Draw, Subscription)
  - `routes/`: API endpoints
  - `middleware/`: Auth guards and Error handlers
  - `config/`: Database and Stripe configuration
  - `server.js`: Main application entry point (merged logic)

## Admin Access

To access the administrative features, use the following default admin credentials:

- **Email**: `srivastavasaurbhji@gmail.com`
- **Password**: `123456789`

### Admin Functionalities:
- **User Management**: View all registered users.
- **Role Promotion**: Directly promote any standard user to an **Admin** role via the Admin Panel.
- **Score Monitoring**: View all submitted scores across the platform.
- **Draw Management**: Run and publish luck draws.

## Installation & Running Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Environment Setup**:
   - Configure `backend/.env` (MongoDB URI, JWT Secret, Stripe Keys, Resend API Key).
   - Configure `frontend/.env` (`VITE_API_URL=http://localhost:4000`).
3. **Seed Data**:
   ```bash
   npm run seed:charities -w backend
   ```
4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   - Frontend starts on: `http://localhost:5173`
   - Backend starts on: `http://localhost:4000`

## Core Features

- **Score Tracking**: Users can submit scores; the system keeps the latest 5 entries.
- **Charity Selection**: Users select a charity for their game contributions.
- **Luck Draw**: Automated system to evaluate winners based on score matches (3, 4, or 5 matches).
- **Pro Subscriptions**: Stripe-integrated monthly/yearly plans for premium features.
- **Webhooks**: Deployment-ready Stripe webhook signature verification.

## Deployment

The backend is configured with dynamic CORS to support deployment on platforms like Vercel or Render. Ensure `FRONTEND_URL` is correctly set in your production environment.
