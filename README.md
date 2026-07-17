# FinTrip — Budget-First Trip Planner

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
├── package.json
├── package-lock.json
├── eslint.config.js
├── README.md
├── LICENSE
├── .gitignore
│
├── config/
│   └── passport.js
│
├── middleware/
│   └── auth.js
│
├── models/
│   ├── TripsDB.js
│   └── UsersDB.js
│
├── routes/
│   ├── Auth.js
│   ├── Trips.js
│   └── Expenses.js
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   │
│   ├── images/
│   │
│   ├── public/
│   │
│   ├── dist/
│   │
│   └── src/
│       ├── main.jsx
│       ├── index.css
│       │
│       ├── context/
│       │   └── UserContext.jsx
│       │
│       ├── components/
│       │   ├── AddExpenseForm.jsx
│       │   ├── AddExpenseForm.css
│       │   ├── BudgetProgressBar.jsx
│       │   ├── BudgetSummary.jsx
│       │   ├── CreateTripForm.jsx
│       │   ├── EditTripForm.jsx
│       │   ├── ExpenseItem.jsx
│       │   ├── ExpenseItem.css
│       │   ├── ExpenseList.jsx
│       │   ├── ExpenseList.css
│       │   ├── NavigationBar.jsx
│       │   ├── NavigationBar.css
│       │   └── TripCard.jsx
│       │
│       ├── pages/
│       │   ├── AboutPage.jsx
│       │   ├── AboutPage.css
│       │   ├── BaseTemplate.jsx
│       │   ├── DashboardPage.jsx
│       │   ├── DashboardPage.css
│       │   ├── LoginPage.jsx
│       │   ├── RegisterPage.jsx
│       │   ├── TripDetailPage.jsx
│       │   └── TripDetailPage.css
│       │
│       └── data/
│           └── TripInfo.json
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

## Use of Generative AI

### Student 1 — Timothy Criss Jr. (Authentication, Trip Management & Budget Visualization)

#### GenAI Usage

AI assistance for the authentication system, trip management features, and budget visualization was used for:

- brainstorming and refining the overall application architecture and user authentication workflow
- discussing Passport.js authentication concepts, session management, and protected route design
- explaining React Context (`UserContext`) and authenticated client-side state management
- clarifying Express route responsibilities, middleware organization, and MVC separation of concerns
- explaining MongoDB native driver CRUD operations (without Mongoose) for users, trips, and embedded expense data
- discussing implementation approaches for user registration, login, logout, and authenticated session persistence
- reviewing React Hooks usage (`useState`, `useEffect`, `useCallback`, and `useContext`) throughout the application
- assisting with debugging frontend/backend integration, API communication, and authenticated request flow
- explaining request/response flow between React components, Express routes, Passport, sessions, and MongoDB
- discussing reusable React component design, prop passing, callback functions, and state synchronization
- assisting with implementation of trip management features including creating, editing, deleting, and displaying trips
- reviewing implementation approaches for budget calculations, budget summaries, and dynamic progress bar visualization
- helping troubleshoot React rendering behavior, asynchronous state updates, and component refresh workflows
- explaining MongoDB update operators (`$set`, `$push`, `$pull`) and embedded document modification patterns
- refining comments, documentation wording, and project organization for readability and maintainability

Additional development and deployment assistance included:

- explaining secure password hashing using bcrypt and Passport Local Strategy
- discussing session-based authentication and protected backend routes
- helping diagnose MongoDB connection issues and native driver configuration
- troubleshooting Express routing, middleware ordering, and backend startup errors
- assisting with Vite development server integration and frontend/backend communication
- reviewing project structure, repository organization, and file responsibilities
- helping troubleshoot Git workflow issues, merge conflicts, and debugging strategies
- reviewing README documentation and deployment instructions for clarity and completeness
- assisting with application testing using Thunder Client and browser developer tools

Generated suggestions were reviewed, adapted, and manually implemented into the final project.

#### GenAI Tool Information

- **Tool Used:** ChatGPT
- **Model Used:** GPT-5.5
- **Provider:** OpenAI

---

## Example Prompts Used

### Student 1 — Timothy Criss Jr.

- "Help me design and implement a session-based authentication system using Passport.js, Express, MongoDB, and React Hooks without using Mongoose."
- "Explain how React Context, Passport sessions, Express middleware, and MongoDB work together to maintain authenticated users across requests."
- "Based on my current CRUD operations, help me refine their functionality for trips using the native MongoDB driver while keeping the architecture consistent with my previous project."
- "Help me build a budget summary and progress bar that automatically update as trips and expenses change."
- "Explain how embedded MongoDB documents should be updated using `$push`, `$pull`, and `$set` for trip expense management."
- "Help me troubleshoot Passport.js authentication, session persistence, MongoDB connectivity, and frontend/backend integration issues."
- "Review my React component architecture and recommend improvements while remaining consistent with the project rubric and course requirements."
- "Explain why my React components are not rerendering after asynchronous updates and help me implement the appropriate callback workflow."
- "Help me debug Express routes, MongoDB repository methods, and React state synchronization."
- "Review my README documentation and project organization to improve clarity, maintainability, and deployment instructions."


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
