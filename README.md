# FinTrip — Budget-First Trip Planner

### CS 5610 Web Development | Project 3

**Author:** Timothy Criss Jr. & Priamos Koumas
**Class:** CS 5610 — Web Development, Northeastern University

---

## Table of Contents

- [Project Objective](#project-objective)
- [Screenshot](#screenshot)
- [Slideshow Presentation](#slideshow-presentation)
- [Demonstration Video](#demonstration-video)
- [Technologies](#technologies)
- [Division of Work](#division-of-work)
- [Project Structure](#project-structure)
- [Instructions to Build](#instructions-to-build)
- [Use of Generative AI](#use-of-generative-ai)
- [Example Prompts Used](#example-prompts-used)
- [Sources & References](#sources--references)
- [License](#license)

---

## Project Objective

Most trip planners are discovery-oriented — built to help you find a destination, not to answer "can we afford this trip?" FinTrip inverts that: the budget is the primary object, and every itinerary element (flight, hotel, museum ticket, dinner) is a cost line tracked against it.

The application consists of two primary features:

- **Trip Management** — create, edit, and delete trips with a name, destination, dates, budget cap, and traveler count, viewed on an authenticated dashboard with a live budget summary and progress bar.
- **Expense Tracking** — add, edit, and delete individual expense items inside a trip, categorized and marked estimated or booked, with category filtering and an automatic per-person cost split.

The goal is to give travelers — whether saving toward a group trip, budgeting for a one-off event, or managing recurring travel on a fixed income — a single tool where the budget drives every planning decision, not the itinerary.

This project was developed as part of CS 5610 Web Development at Northeastern University.

---

## Screenshot

![FinTrip application thumbnail](frontend/images/Project3Thumbnail.png)

---

## Slideshow Presentation

https://docs.google.com/presentation/d/1PRmUyS2YgYATipQZAFH7PVRAGdb20MQO/edit?usp=sharing&ouid=109450555598504419581&rtpof=true&sd=true

---

## Demonstration Video

https://drive.google.com/file/d/12g3EjTVK3VvAFfSsdvDgAd3UnKzRYQgj/view?usp=sharing

---

## Live Application

https://fin-trip-project-3-production.up.railway.app

---

## Live Deployment Notes

- Hosted on Railway
- Uses Railway MongoDB
- Database populated with **1,000+ synthetic Mockaroo records**
- A dedicated demo account was used to associate those records with a valid application user during seeding. As a result,
a grader may register a new account to evaluate application functionality independently.
- Authentication implemented using Passport.js sessions

---

### API Health Check
## Purpose: Shows that the backend is deployed and responsive.

https://fin-trip-project-3-production.up.railway.app/api/health

---

### Production Deployment

The application is deployed on Railway.

No local setup is required to evaluate the deployed application.

---

## Technologies

**Frontend**

- React with Hooks
- Vite (build tool and dev server)
- React Router v7 (client-side routing)
- React-Bootstrap (UI components)
- HTML5 / CSS3

**Backend**

- Node.js + Express
- Passport (passport-local) + express-session (authentication & sessions)

**Database**

- MongoDB (native Node.js driver — no Mongoose)

**Development Tools**

- Git, GitHub, Visual Studio Code, ESLint, Docker (local MongoDB)

No axios, no Mongoose, no CORS package — the Vite dev proxy handles requests to the Express backend directly.

**Deployment**

- Railway (Node.js hosting + MongoDB)

---

## Division of Work

### Timothy Criss Jr.

- Authentication system: user registration, login, logout, Passport Local Strategy, session management, and protected routes
- User management: MongoDB user repository (`UsersDB.js`), password hashing with bcrypt, Passport serialization/deserialization, and authenticated `UserContext`
- Dashboard workflow: authenticated user experience, dashboard integration, navigation updates, and session persistence
- Trip management: edit and delete trip functionality (`EditTripForm`), trip ownership validation, and authenticated trip operations
- Budget visualization: budget summary calculations and dynamic color-coded progress bar (green → yellow → red) that updates as expenses change
- Frontend/backend integration: authenticated API communication, CRUD testing, debugging, and overall application integration
- Railway deployment configuration and completion for the application

**Endpoints (Express routes):**

- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/logout`, `GET /api/auth/user`

### Priamos Koumas

- Trip creation interface (`CreateTripForm`) and trip display components (`TripCard`)
- Expense items: add, edit, and delete cost-line items (category, title, cost, link, notes, estimated-vs-booked status) inside a trip
- Category filter: filter expense list by category/title
- Trip-level backend routes (full CRUD on the trips collection)
- Per-person split: computed per-traveler share, displayed in the trip detail
- Synthetic data generation (1,000+ seeded trip records via Mockaroo, plus hand-crafted demo trips)
- Application-wide CSS design system and landing page design

**Endpoints (Express routes):**

- `GET/POST /api/trips`, `GET/PUT/DELETE /api/trips/:id`
- `POST/PUT/DELETE /api/trips/:id/items`

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
│   ├── images/
│   ├── public/
│   ├── dist/ (generated after build)
│   └── src/
│       ├── main.jsx
│       ├── index.css
│       ├── context/
│       │   └── UserContext.jsx
│       ├── components/
│       │   ├── AddExpenseForm.jsx / .css
│       │   ├── BudgetProgressBar.jsx
│       │   ├── BudgetSummary.jsx
│       │   ├── CreateTripForm.jsx
│       │   ├── EditTripForm.jsx
│       │   ├── ExpenseItem.jsx / .css
│       │   ├── ExpenseList.jsx / .css
│       │   ├── NavigationBar.jsx / .css
│       │   └── TripCard.jsx
│       ├── pages/
│       │   ├── AboutPage.jsx / .css
│       │   ├── BaseTemplate.jsx
│       │   ├── DashboardPage.jsx / .css
│       │   ├── LoginPage.jsx
│       │   ├── RegisterPage.jsx
│       │   └── TripDetailPage.jsx / .css
│       └── data/
│           └── TripInfo.json
```

---

## Instructions to Build

**Prerequisites**

- Node.js installed
- A MongoDB connection (hosted, or run locally via Docker — see below)

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

If testing locally without a hosted MongoDB instance, run MongoDB via Docker instead:

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

**How to use the app**

1. Register an account or log in.
2. From the dashboard, create a new trip with a destination, dates, budget cap, and traveler count.
3. Open a trip to add expense items by category, cost, and estimated/booked status.
4. Use the filter box to search expenses by title or category.
5. View the live budget progress bar and per-person cost split as expenses are added, edited, or removed.

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
- assisting with Railway deployment, production configuration, MongoDB database seeding, and deployment troubleshooting

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

### Student 2 — Priamos Koumas (Expense Management, Trip CRUD Backend & Application Design)

#### GenAI Usage

AI assistance for the expense management system, trip-level backend routes, data seeding, and application design/styling was used for:

- reviewing the assignment rubric and translating it into a working development checklist
- scaffolding the Vite + React + Express project structure and configuring ESLint for both the frontend (React/JSX) and backend (Node)
- explaining MongoDB native driver CRUD operations and update operators (`$push`, positional `$set`, `$pull`) for managing embedded expense items nested inside trip documents, without Mongoose
- reviewing implementation of expense item creation, editing, deletion, category filtering, and estimated-vs-booked status tracking, along with the corresponding trip-level backend routes
- diagnosing frontend bugs, including a controlled-input issue preventing a numeric field from clearing while typing, a route-parameter naming mismatch between the router and a page component, and a prop-name mismatch between a form and its parent that was silently breaking expense creation
- diagnosing backend/integration bugs, including a router not mounted in the Express app, a missing authentication middleware guard, and a stale server process silently running outdated code after a file edit
- reviewing reusable React component design, including props, callbacks, and `PropTypes` validation
- setting up local environment tooling, including `dotenv`, a root-level `.gitignore`, removing an accidentally-tracked `node_modules` directory, and a local MongoDB instance via Docker for independent testing
- generating and troubleshooting a Mockaroo schema for synthetic trip data (fixing a budget-realism issue, a date-ordering bug, and a platform-specific Mockaroo limitation), and writing a one-time script to load the data into MongoDB
- designing and implementing a shared CSS design system — `:root` color variables and typography — distributed consistently across every styled component and page (expense cards, forms, the trip detail view, and the landing page) so the site reads as one cohesive product
- building the landing page's full-bleed hero section and layout, and fixing layout issues caused by the shared Bootstrap `Container` wrapper constraining full-width elements
- refining comments, documentation wording, and project organization for readability and maintainability

GitHub Copilot was used separately, in-editor, for:

- generating specific backend functions and Express routes when prompted directly in the file
- filling out written page copy throughout the site wherever text content was needed, when prompted

Generated suggestions from both tools were reviewed, adapted, and manually implemented into the final project.

#### GenAI Tool Information

- **Tool Used:** Claude
- **Model Used:** Claude Sonnet 5
- **Provider:** Anthropic

- **Tool Used:** GitHub Copilot
- **Model Used:** GPT-4o (Copilot default)
- **Provider:** GitHub / OpenAI

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

### Student 2 — Priamos Koumas

- "How do I use $push, $set with the positional operator, and $pull to manage an array embedded inside a MongoDB document?"
- "What's the right way to set up an ESLint flat config for a React project versus a plain Node backend?"
- "Walk me through a try/catch/finally pattern for MongoDB connection handling with the native driver."
- "Why won't this controlled number input let the user clear the field while typing?"
- "My useParams value keeps coming back undefined — what am I missing?"
- "This Express route returns 404 even though the file and function both look correct. What could cause that?"
- "Is there a way to tell if a running Node process is using an outdated version of a file I just edited?"
- "What's the quickest way to get a local MongoDB instance running with Docker for development?"
- "How should I structure a .gitignore and dotenv setup so credentials never get committed?"
- "How do I build a Mockaroo schema with a nested array field, and fix values inside it that don't logically match?"
- "How do I define PropTypes for a component that receives an array of objects as a prop?"
- "What's a distinctive way to style a set of cards with CSS so the site doesn't look like default Bootstrap?"

---

## Sources & References

- Professor John Alexis Guerra Gomez's `nodeExpressReactVite_ApartmentFinder` class example — used as the foundational reference throughout the project for structure, configuration conventions, and component patterns, adapted into FinTrip's own expense and trip features
- MongoDB array update operators (`$push`, `$pull`, positional `$`) — https://www.mongodb.com/docs/manual/reference/operator/update-array/
- MongoDB Node.js Driver CRUD documentation — https://www.mongodb.com/docs/drivers/node/current/crud/
- React Router v7 documentation — https://reactrouter.com/
- React-Bootstrap component documentation — https://react-bootstrap.github.io/
- Mockaroo documentation (Formula fields, Repeating Elements) — https://mockaroo.com/docs
- ESLint documentation, disabling rules — https://eslint.org/docs/latest/use/configure/rules#disabling-rules
- Vite configuration documentation — https://vite.dev/config/
- Docker documentation, running MongoDB in a container — https://docs.docker.com/
- Class lecture materials, Professor John Alexis Guerra Gomez — https://johnguerra.co/lectures/webDevelopment_fall2025/
- This team's Project 1 (personal homepage) and Project 2 (Oncology Trial Information Hub) repositories, reused for CSS structure, Mongo CRUD patterns, and hero-section layout conventions
- Railway Documentation — https://docs.railway.com/

---

## License

This project is licensed under the MIT License.
