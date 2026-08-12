import Button from "react-bootstrap/Button";
import { Link } from "react-router";

import heroImg from "../../images/financetrip.jpg";

import "./DashboardPage.css";

export default function DashboardPage() {
  return (
    <section className="hero-section">
      <img
        src={heroImg}
        alt="World map with money representing travel budgeting"
        className="hero-bg-img"
      />

      <h1>Welcome to FinTrip</h1>

      <p>
        Plan trips by comparing projected expenses against a defined budget you
        set.
      </p>

      <div className="mt-3">
        <Button as={Link} to="/login" className="me-2">
          Log In
        </Button>

        <Button as={Link} to="/register" variant="secondary">
          Create Account
        </Button>
      </div>
    </section>
  );
}