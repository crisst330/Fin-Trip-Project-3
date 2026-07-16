import "./AboutPage.css";

export default function AboutPage() {
  return (
    <div className="about-page mt-5">
      <h1>About FinTrip</h1>
      <p>
        FinTrip is a simple web application designed to help you manage your
        travel expenses efficiently. With FinTrip, you can create trips, add
        expenses, and keep track of your spending in one place.
      </p>
      <h2>Our Mission</h2>
      <p>
        Our mission is to make travel expense management simple and efficient,
        by providing a user-friendly platform, so that travelers can focus on
        their trips while keeping track of their financials.
      </p>
      <h2>Features</h2>
      <ul>
        <li>Create and manage trips</li>
        <li>Add, edit, and delete expenses</li>
        <li>Filter expenses by title or category</li>
        <li>View total expenses for each trip</li>
      </ul>
      <h2>Getting Started</h2>
      <p>
        To get started with FinTrip, sign up for an account or log in, create a
        new trip, and start adding your expenses. You can also log in to view
        and manage your created trips and financial data.
      </p>
    </div>
  );
}
