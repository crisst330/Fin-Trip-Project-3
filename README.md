# FinTrip

A budget-first trip planner. Instead of starting with a destination, FinTrip starts with the money: set a budget cap for a trip, add every planned expense as a cost-line item, and watch a live running total against the cap — with a color-coded progress bar, estimated-vs-booked cost tracking, category filtering, and a per-person split for group trips.

**Author:** Timothy Criss Jr. & Priamos Koumas
**Class:** CS 5610 — Web Development, Professor John Alexis Guerra Gomez, Northeastern University
**Class Link:** _[add course/Canvas link here]_

---

## Project Objective

Most trip planners are discovery-oriented — built to help you find a destination, not to answer "can we afford this trip?" FinTrip inverts that: the budget is the primary object, and every itinerary element (flight, hotel, museum ticket, dinner) is a cost line tracked against it. The goal is to give travelers — whether saving toward a group trip, budgeting for a one-off event, or managing recurring travel on a fixed income — a single tool where the budget drives every planning decision, not the itinerary.

---

## Screenshot

_[Add a screenshot of the running app here once deployed]_

---

## Slideshow Presentation

https://docs.google.com/presentation/d/1PRmUyS2YgYATipQZAFH7PVRAGdb20MQO/edit?usp=sharing&ouid=109450555598504419581&rtpof=true&sd=true 

---

## Demonstration Video

link here

---

## Technologies

- **Node.js** + **Express** — backend server and routing
- **MongoDB** (native Node.js driver — no Mongoose) — database
- **React** with **Hooks** — client-side rendered frontend
- **Vite** — frontend build tool and dev server
- **React Router** (v7) — client-side routing
- **React-Bootstrap** — UI components
- **Passport** (passport-local) — authentication
- **express-session** — session management
- **HTML5** — Vite's single entry point (`index.html`)

No axios, no Mongoose, no CORS package — the Vite dev proxy handles cross-origin requests to the Express backend directly.

---

## Division of Work

**Timothy Criss Jr.**

- Authentication: register / log in / log out (Passport-local + sessions + UserContext)
- Trip management: create, edit, delete trips (name, destination, dates, budget cap, traveler count); dashboard listing a user's trips
- Budget visualization: summary numbers and color-shifting progress bar (green → yellow → red vs. the cap)

**Priamos Koumas**

- Expense items: add, edit, and delete cost-line items (category, title, cost, link, notes, estimated-vs-booked status) inside a trip
- Category filter: filter the expense list by category/title
- Trip-level backend routes (full CRUD on the trips collection): `GET/POST/PUT/DELETE /api/trips`, `GET /api/trips/:id`
- Per-person split: computed per-traveler share, displayed in the trip detail
- Synthetic data generation (1,000+ seeded trip records via Mockaroo, plus hand-crafted demo trips)

---

## Project Structure

```
Fin-Trip-Project-3/
├── backend.js
├── config/
│   └── passport.js
├── models/
│   ├── TripsDB.js
│   └── users.js
├── routes/
│   ├── Auth.js
│   ├── Expenses.js
│   └── Trips.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddExpenseForm.jsx
│   │   │   ├── BudgetProgressBar.jsx
│   │   │   ├── BudgetSummary.jsx
│   │   │   ├── ExpenseItem.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   ├── NavigationBar.jsx
│   │   │   └── TripCard.jsx
│   │   ├── context/
│   │   │   └── UserContext.jsx
│   │   ├── pages/
│   │   │   ├── AboutPage.jsx
│   │   │   ├── BaseTemplate.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── TripDetailPage.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── package.json
├── .env.example
├── .gitignore
└── package.json
```

---

## Instructions to Build

**1. Clone the repo**

```bash
git clone https://github.com/crisst330/Fin-Trip-Project-3.git
cd Fin-Trip-Project-3
```

**2. Install backend dependencies (project root)**

```bash
npm install
```

**3. Install frontend dependencies**

```bash
cd frontend
npm install
cd ..
```

**4. Set up environment variables**

Create a `.env` file in the project root:

```
MONGODB_URI=your-mongodb-connection-string
```

If testing locally without a hosted MongoDB instance, you can run MongoDB via Docker instead:

```bash
docker run -d -p 27017:27017 --name fintrip-mongo mongo
```

With Docker running, `MONGODB_URI` can be omitted — the app falls back to `mongodb://localhost:27017`.

**5. Run the backend**

```bash
node backend.js
```

Server runs on `http://localhost:3000`.

**6. Run the frontend (separate terminal)**

```bash
cd frontend
npm run dev
```

App runs on `http://localhost:5173`.

---

## GenAI Disclosure

**Example prompts used:**

---

## Sources & References

- MongoDB array update operators (`$push`, `$pull`, positional `$`) — https://www.mongodb.com/docs/manual/reference/operator/update-array/
- MongoDB Node.js Driver CRUD documentation — https://www.mongodb.com/docs/drivers/node/current/crud/
- React Router v7 documentation — https://reactrouter.com/
- React-Bootstrap component documentation — https://react-bootstrap.github.io/
- Mockaroo documentation (Formula fields, Repeating Elements) — https://mockaroo.com/docs
- Class lecture materials, Professor John Alexis Guerra Gomez — https://johnguerra.co/lectures/webDevelopment_fall2025/

---

## License

This project is licensed under the MIT License.
