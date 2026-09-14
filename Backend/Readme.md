# Paytm Clone — Backend

A backend for a Paytm-style digital wallet app, built with **Express**, **TypeScript**, and **MongoDB (Mongoose)**. Supports user authentication, protected routes, user search, and atomic peer-to-peer money transfers using MongoDB transactions.

## Features

- **User authentication** — signup and signin with hashed passwords (bcrypt) and JWT-based sessions
- **Input validation** — all request bodies validated with Zod before hitting the database
- **Protected routes** — custom auth middleware verifies JWT tokens via `Authorization: Bearer <token>` headers
- **Profile updates** — authenticated users can update their name and/or password
- **User search** — case-insensitive substring search by first/last name, for finding transfer recipients
- **Money transfers** — atomic balance transfers between users using Mongoose sessions/transactions, so a transfer either fully completes or fully rolls back (no partial deductions)
- **Auto-generated wallet accounts** — every new user gets an account with a starting balance on signup

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express 5 |
| Language | TypeScript |
| Database | MongoDB (via Mongoose) |
| Validation | Zod |
| Auth | JSON Web Tokens (jsonwebtoken) |
| Password hashing | bcrypt |
| CORS | cors |
| Env config | dotenv |

## Project Structure

```
Backend/
├── src/
│   ├── routes/
│   │   ├── user.ts        # signup, signin, update, search
│   │   └── account.ts     # balance, transfer
│   ├── types/
│   │   └── express/       # custom Request typing (req.userId)
│   ├── db.ts               # Mongoose connection + schemas/models
│   ├── middleware.ts       # JWT auth middleware
│   ├── config.ts           # environment config (JWT secret, etc.)
│   └── index.ts            # app entry point, router wiring
├── .env
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites
- Node.js installed
- A MongoDB connection string (local or Atlas)

### Installation

```bash
git clone <your-repo-url>
cd Backend
npm install
```

### Environment Variables

Create a `.env` file in the `Backend` directory:

```
MONGO_URL=your_mongodb_connection_string
JWT_PASSWORD=your_jwt_secret
```

### Run the server

```bash
npm run dev
```

Server runs on `http://localhost:3000` by default.

## API Endpoints

### Auth (public)

| Method | Endpoint | Description |
|---|---|---|
| POST | `/app/v1/user/signup` | Create a new user + wallet account |
| POST | `/app/v1/user/signin` | Log in, returns a JWT token |

### User (protected — requires Bearer token)

| Method | Endpoint | Description |
|---|---|---|
| PUT | `/app/v1/user/update` | Update first name, last name, and/or password |
| GET | `/app/v1/user/search?filter=<text>` | Search users by first/last name |

### Account (protected — requires Bearer token)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/app/v2/account/balance` | Get the logged-in user's wallet balance |
| POST | `/app/v2/account/transfer` | Transfer money to another user by their user ID |

**Example — transfer request body:**
```json
{
  "to": "<recipient_user_id>",
  "amount": 1000
}
```

## Authentication

Protected routes require a JWT sent as a Bearer token:

```
Authorization: Bearer <token>
```

The token is returned in the response body on successful signup or signin.

## Security Notes

- Passwords are never stored in plain text — hashed with bcrypt (salted automatically) before saving
- Signin returns identical error messages for "user not found" and "wrong password" to prevent user enumeration
- Transfers use MongoDB sessions/transactions to guarantee atomicity — a failure mid-transfer rolls back all changes, so funds can never be deducted from one account without being credited to the other

## Demo

*Example: successful transfer response (200 OK)*

`![Transfer success screenshot](./screenshot.png)`

*(Add the screenshot file to the repo and update the path above.)*

## Roadmap / Not Yet Implemented

- Forgot password / email OTP flow (planned, not yet built)
- Transaction history endpoint
- Rate limiting on auth routes
