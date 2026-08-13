import Button from "react-bootstrap/Button";
import { Link } from "react-router";

import heroImg from "../../images/financetrip.jpg";

import "../styles/HomePage.css";

export default function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero" aria-labelledby="home-heading">
        <img src={heroImg} alt="" className="home-hero-image" />

        <div className="home-hero-overlay">
          <h1 id="home-heading">Welcome to FinTrip</h1>

          <p>
            Plan trips by comparing projected expenses against a defined budget
            you set.
          </p>

          <div className="home-actions">
            <Button as={Link} to="/login" className="home-primary-button">
              Log In
            </Button>

            <Button as={Link} to="/register" className="home-secondary-button">
              Create Account
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
