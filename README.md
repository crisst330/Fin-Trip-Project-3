# FinTrip — Budget-First Trip Planner

### CS 5610 Web Development | Final Project (Iterating Project 3)

**Author:** Timothy Criss Jr. & Priamos Koumas
**Class:** [CS 5610 — Web Development, Northeastern University](https://johnguerra.co/lectures/webDevelopment_fall2025/)

---

## Table of Contents

- [Project Objective](#project-objective)
- [Screenshot](#screenshot)
- [Design System](#design-system)
- [Design Principles Applied](#design-principles-applied)
- [Accessibility](#accessibility)
- [Usability Study](#usability-study)
- [Slideshow Presentation](#slideshow-presentation)
- [Demonstration Video](#demonstration-video)
- [Live Application](#live-application)
- [Live Deployment Notes](#live-deployment-notes)
- [API Health Check](#api-health-check)
- [Production Deployment](#production-deployment)
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

For this final iteration, the application was substantially redesigned based on a structured usability study conducted with three participants per team member. Changes include a full visual redesign (color palette, typography, and layout hierarchy), in-place trip editing, password strength validation with accessible guidance, currency formatting fixes, and a full accessibility pass across every route to meet WCAG 2.1 AA standards with axe DevTools and Lighthouse.

The goal is to give travelers — whether saving toward a group trip, budgeting for a one-off event, or managing recurring travel on a fixed income — a single tool where the budget drives every planning decision, not the itinerary.

This project was developed as part of CS 5610 Web Development at Northeastern University.

---

## Screenshot

![FinTrip application thumbnail](frontend/images/Project3Thumbnail.png)

*[Replace with the final-project thumbnail, 500x500 PNG, before Google Form submission]*

---

## Design System

FinTrip's redesign is built on a warm, travel-inspired color palette generated from the app's own hero imagery, paired with a deliberate typography contrast between body and heading text.

**Color Palette**

| Variable | Hex | Use |
|---|---|---|
| `--navy` | `#3F438C` | Primary accents, headings |
| `--forest-green` | `#2E8B57` | Primary actions, links |
| `--forest-green-dark` | `#006400` | Primary action hover/active states, high-contrast text on light backgrounds |
| `--tan` | `#A67C58` | Secondary accents |
| `--gold` | `#DAA520` | Status highlights |
| `--military-green` | `#2F4F4F` | Footer, dark surfaces |
| `--background` | `#FFFAF0` | Page background |

The palette was derived from the application's hero photography using Adobe Express's color palette tool, then refined into the CSS custom properties above and adjusted where necessary to meet WCAG AA contrast thresholds (see [Accessibility](#accessibility)).

**Typography**

- **Body text:** [Spinnaker](https://fonts.google.com/specimen/Spinnaker) (sans-serif)
- **Headings:** [Poppins](https://fonts.google.com/specimen/Poppins) (sans-serif, weight 700)

Both fonts are geometric sans-serifs, chosen so the pairing reads as a cohesive, deliberate design system rather than two clashing typefaces. Poppins' heavier weight gives page titles and section headers a stronger visual hierarchy against Spinnaker's clean, legible body copy, which stays easy to scan in expense tables and forms. Neither is a default browser font.

Approval and cancel actions use a consistent color mapping across the whole application: green (`--forest-green` / `--forest-green-dark`) for primary/confirm actions, and a muted secondary style for cancel/dismiss actions.

---

## Design Principles Applied

Following the four core design principles covered in class:

- **Proximity** — related fields are grouped inside bordered `Form.Group`/card containers (e.g. the trip creation form, the expense creation form), with unrelated sections separated by consistent spacing (`--space-md`, `--space-lg` variables) so visual grouping matches logical grouping.
- **Alignment** — form fields, labels, and buttons are left-aligned within a consistent grid (Bootstrap's container/row/column system), and card content follows a consistent internal padding and heading position across every page.
- **Contrast** — heading text (Poppins, bold, navy) is visually distinct from body text (Spinnaker, regular weight, muted green-gray), and primary actions use a saturated green against the app's cream background, distinguishing interactive elements from static content.
- **Repetition** — the same card styling, button variants, spacing scale, and color palette repeat across every page (dashboard, trips list, trip detail, forms), so the application reads as one cohesive product rather than a set of independently styled pages.

---

## Accessibility

Every route in the application was tested with the **axe DevTools** and **Lighthouse** Chrome extensions and iterated on until reaching zero automatically-detected errors:

| Route | axe DevTools Result |
|---|---|
| `/` | 0 issues |
| `/about` | 0 issues |
| `/login` | 0 issues |
| `/register` | 0 issues |
| `/dashboard` | 0 issues |
| `/trips` | 0 issues |
| `/trips/:id` | 0 issues |

Issues identified and resolved during this pass included:

- Insufficient color contrast on buttons, status badges, and highlighted text (adjusted to darker shades of the existing palette)
- A missing accessible name on the ARIA progress bar element (rewritten with a plain `role="progressbar"` element carrying its own `aria-label`, after diagnosing that the third-party UI library component was not forwarding accessibility props to its rendered DOM node)
- Missing form labels on the expense-creation form's category, title, cost, and status fields
- Out-of-sequence heading levels across multiple pages, corrected so each page has a single `<h1>` in proper document order

The application is also fully operable via keyboard alone, with visible focus indicators on every interactive element (inputs, buttons, links) using a consistent focus-ring style defined in the global stylesheet.

---

## Usability Study

A structured usability study was conducted with three participants per project member, following the course's provided template: task-based scripts, demographic questions, Likert-scale post-task questionnaires, and recorded sessions.

Full report: **[link to usability study report]**

Key findings implemented in this iteration:

- **Password visibility toggle** and **live password requirements** on the registration form, linked to the password field via `aria-describedby` for screen reader accessibility
- **In-place trip editing** — an Edit Trip button was added directly to the Trip Details page, removing the need to navigate back to the trips list to make changes
- **Currency formatting** — dollar amounts now display with comma separators for readability on larger budgets
- Full visual redesign of the homepage, login, and register pages based on participant feedback on visual hierarchy and clarity

---

## Slideshow Presentation

[link]

---

## Demonstration Video

[link]

---

## Live Application

[https://fin-trip-project-3-production.up.railway.app](https://fin-trip-project-3-production.up.railway.app)

---

## Live Deployment Notes

- Hosted on Railway
- Uses Railway MongoDB
- Database populated with **1,000+ synthetic Mockaroo records**
- A dedicated demo account was used to associate those records with a valid application user during seeding. As a result, a grader may register a new account to evaluate application functionality independently.
- Authentication implemented using Passport.js sessions

---

## API Health Check

Purpose: Shows that the backend is deployed and responsive.

[https://fin-trip-project-3-production.up.railway.app/api/health](https://fin-trip-project-3-production.up.railway.app/api/health)

---

## Production Deployment

The application is deployed on Railway. No local setup is required to evaluate the deployed application.

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
- `validator` (password strength validation)

**Database**

- MongoDB (native Node.js driver — no Mongoose)

**Development & Testing Tools**

- Git, GitHub, Visual Studio Code, ESLint, Prettier, Docker (local MongoDB)
- axe DevTools, Lighthouse (accessibility testing)

No axios, no Mongoose, no CORS package — the Vite dev proxy handles requests to the Express backend directly.

**Deployment**

- Railway (Node.js hosting + MongoDB)

---

## Division of Work

### Timothy Criss Jr.

- Authentication system: user registration, login, logout, Passport Local Strategy, session management, and protected routes
- User management: MongoDB user repository (`UsersDB.js`), password hashing with bcrypt, Passport serialization/deserialization, and authenticated `UserContext`
- Dashboard workflow: authenticated user experience, dashboard redesign, navigation updates, and session persistence
- Trip management: edit and delete trip functionality (`EditTripForm`), trip ownership validation, and authenticated trip operations
- Budget visualization: budget summary calculations and dynamic color-coded progress bar (green → yellow → red)
- Full visual redesign: color palette, homepage/login/register page redesign, and design system implementation in `index.css`
- Frontend/backend integration: authenticated API communication, CRUD testing, debugging, and overall application integration
- Railway deployment configuration and completion
- Usability study sessions and prioritized issue list

**Endpoints (Express routes):**

- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/logout`, `GET /api/auth/user`

### Priamos Koumas

- Trip creation interface (`CreateTripForm`) and trip display components (`TripCard`)
- Expense items: add, edit, and delete cost-line items (category, title, cost, link, notes, estimated-vs-booked status) inside a trip
- Category filter: filter expense list by category/title
- Trip-level backend routes (full CRUD on the trips collection)
- Per-person split: computed per-traveler share, displayed in the trip detail
- Synthetic data generation (1,000+ seeded trip records via Mockaroo, plus hand-crafted demo trips)
- Password strength validation and accessible requirements hint on the registration form
- In-place trip editing (Edit Trip button and modal on the Trip Details page)
- Currency display formatting fix
- Full accessibility remediation across all seven application routes (axe DevTools/Lighthouse), including color contrast, form labeling, ARIA progress bar labeling, and heading hierarchy corrections
- Usability study sessions and report

**Endpoints (Express routes):**

- `GET/POST /api/trips`, `GET/PUT/DELETE /api/trips/:id`
- `POST/PUT/DELETE /api/trips/:id/items`

---

## Project Structure

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
│ └── passport.js
│
├── middleware/
│ └── auth.js
│
├── models/
│ ├── TripsDB.js
│ └── UsersDB.js
│
├── routes/
│ ├── Auth.js
│ ├── Trips.js
│ └── Expenses.js
│
├── frontend/
│ ├── index.html
│ ├── package.json
│ ├── package-lock.json
│ ├── vite.config.js
│ ├── eslint.config.js
│ ├── images/
│ ├── public/
│ ├── dist/ (generated after build)
│ └── src/
│ ├── main.jsx
│ ├── index.css
│ ├── context/
│ │ └── UserContext.jsx
│ ├── components/
│ │ ├── AddExpenseForm.jsx / .css
│ │ ├── BudgetProgressBar.jsx
│ │ ├── BudgetSummary.jsx
│ │ ├── CreateTripForm.jsx
│ │ ├── EditTripForm.jsx
│ │ ├── ExpenseItem.jsx / .css
│ │ ├── ExpenseList.jsx / .css
│ │ ├── NavigationBar.jsx / .css
│ │ └── TripCard.jsx
│ ├── pages/
│ │ ├── AboutPage.jsx / .css
│ │ ├── BaseTemplate.jsx
│ │ ├── HomePage.jsx / .css
│ │ ├── UserDashboardPage.jsx / .css
│ │ ├── LoginPage.jsx / .css
│ │ ├── RegisterPage.jsx / .css
│ │ ├── TripsPage.jsx / .css
│ │ └── TripDetailPage.jsx / .css
│ └── data/
│ └── TripInfo.json

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

If testing locally without a hosted MongoDB instance, run MongoDB via Docker instead:

```bash
docker run -d -p 27017:27017 --name fintrip-mongo mongo
```

With Docker running, `MONGODB_URI` can be omitted — the app falls back to `mongodb://localhost:27017`.

> **Note:** if this project directory lives inside a cloud-synced folder (e.g. `~/Desktop` or `~/Documents` with iCloud Drive, OneDrive, or Google Drive sync enabled), move it outside that folder before running `npm install`. Cloud sync can evict `node_modules` files to placeholders, causing the backend to hang on startup with no error output.

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
4. Edit trip details directly from the Trip Details page using the Edit Trip button.
5. Use the filter box to search expenses by title or category.
6. View the live budget progress bar and per-person cost split as expenses are added, edited, or removed.

---

## Use of Generative AI

### Student 1 — Timothy Criss Jr. (Authentication, Trip Management, Budget Visualization & Redesign)

#### GenAI Usage

AI assistance for the authentication system, trip management features, budget visualization, and application redesign was used for:

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
- generating a color palette from application imagery and translating it into CSS custom properties
- redesigning the homepage, login, and register pages, including layout, typography pairing, and visual hierarchy
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

### Student 2 — Priamos Koumas (Expense Management, Trip CRUD Backend, Accessibility & Usability)

#### GenAI Usage

AI assistance for the expense management system, trip-level backend routes, data seeding, application design/styling, and the accessibility/usability iteration was used for:

- reviewing the assignment rubric and translating it into a working development checklist
- scaffolding the Vite + React + Express project structure and configuring ESLint for both the frontend (React/JSX) and backend (Node)
- explaining MongoDB native driver CRUD operations and update operators (`$push`, positional `$set`, `$pull`) for managing embedded expense items nested inside trip documents, without Mongoose
- reviewing implementation of expense item creation, editing, deletion, category filtering, and estimated-vs-booked status tracking, along with the corresponding trip-level backend routes
- diagnosing frontend bugs, including a controlled-input issue preventing a numeric field from clearing while typing, a route-parameter naming mismatch between the router and a page component, and a prop-name mismatch between a form and its parent that was silently breaking expense creation
- diagnosing backend/integration bugs, including a router not mounted in the Express app, a missing authentication middleware guard, and a stale server process silently running outdated code after a file edit
- reviewing reusable React component design, including props, callbacks, and `PropTypes` validation
- setting up local environment tooling, including `dotenv`, a root-level `.gitignore`, removing an accidentally-tracked `node_modules` directory, and a local MongoDB instance via Docker for independent testing
- generating and troubleshooting a Mockaroo schema for synthetic trip data (fixing a budget-realism issue, a date-ordering bug, and a platform-specific Mockaroo limitation), and writing a one-time script to load the data into MongoDB
- designing and implementing a shared CSS design system — `:root` color variables and typography — distributed consistently across every styled component and page
- building the landing page's full-bleed hero section and layout, and fixing layout issues caused by the shared Bootstrap `Container` wrapper constraining full-width elements
- helping plan and draft the structure, scripts, and demographic/task questionnaires for a three-participant usability study, aligned to the course's provided template
- helping add client-side password strength validation to the registration form using the `validator` package, with an accessible, screen-reader-linked (`aria-describedby`) requirements hint tied to the password field
- assisting with an in-place trip editing flow added to the trip detail page, reusing the existing edit form component inside a modal rather than requiring navigation back to a separate page
- helping run and interpret axe DevTools accessibility scans across every application route, and working through the resulting issues together: insufficient color-contrast ratios on buttons, status badges, and highlighted text; a missing accessible name on an ARIA progress bar (including diagnosing that a UI library component was not forwarding the `aria-label` prop to its rendered DOM element, and rewriting the component with plain semantic markup instead); and missing form labels on the expense-creation form's category, title, cost, and status fields
- assisting with corrections to heading hierarchy across the application's pages so that headings appear in proper semantic order (single `h1` per page, no out-of-sequence or skipped heading levels) for screen reader navigation
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
- "Help me generate a cohesive color palette from this hero image and turn it into CSS variables."
- "Redesign my homepage layout to use a grid with a full-bleed hero section, matching this reference image."
- "Review my README documentation and project organization to improve clarity, maintainability, and deployment instructions."

### Student 2 — Priamos Koumas

- "How do I use $push, $set with the positional operator, and $pull to manage an array embedded inside a MongoDB document?"
- "What's the right way to set up an ESLint flat config for a React project versus a plain Node backend?"
- "Why won't this controlled number input let the user clear the field while typing?"
- "My useParams value keeps coming back undefined — what am I missing?"
- "This Express route returns 404 even though the file and function both look correct. What could cause that?"
- "How do I build a Mockaroo schema with a nested array field, and fix values inside it that don't logically match?"
- "How do I define PropTypes for a component that receives an array of objects as a prop?"
- "Help me draft a usability study report structure with task scripts, demographic questions, and Likert-scale questionnaires."
- "Why is axe DevTools still flagging this element as missing an accessible name even after I added an aria-label prop?"
- "How do I add password strength validation to a registration form and link the requirements text to the input for screen readers?"
- "Why does my heading structure fail a semantic-order accessibility check, and how do I fix it without changing how the page looks?"

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
- axe DevTools documentation — https://www.deque.com/axe/devtools/
- WCAG 2.1 AA color contrast guidelines — https://www.w3.org/WAI/WCAG21/quickref/
- FontPair, typography pairing reference — http://fontpair.co/
- GeeksforGeeks, "Create a Password Validator using ReactJS" — https://www.geeksforgeeks.org/reactjs/create-a-password-validator-using-reactjs/
- Class lecture materials, Professor John Alexis Guerra Gomez — https://johnguerra.co/lectures/webDevelopment_fall2025/
- This team's Project 1 (personal homepage) and Project 2 (Oncology Trial Information Hub) repositories, reused for CSS structure, Mongo CRUD patterns, and hero-section layout conventions
- Railway Documentation — https://docs.railway.com/

---

## License

This project is licensed under the MIT License.