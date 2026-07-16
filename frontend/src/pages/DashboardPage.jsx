import { useCallback, useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Link } from "react-router";

import heroImg from "../../images/financetrip.jpg";
import CreateTripForm from "../components/CreateTripForm.jsx";
import TripCard from "../components/TripCard.jsx";
import { useUser } from "../context/UserContext.jsx";

import "./DashboardPage.css";

export default function DashboardPage() {
  const { user } = useUser();

  const [trips, setTrips] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const reloadTrips = useCallback(async () => {
    if (!user) {
      setTrips([]);
      return;
    }

    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/trips");

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Unable to load your trips.");
        return;
      }

      setTrips(data);
    } catch (error) {
      console.error("Load trips error:", error);
      setErrorMessage("Unable to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    reloadTrips();
  }, [reloadTrips]);

  if (!user) {
    return (
      <section className="hero-section">
        <img
          src={heroImg}
          alt="World map with money"
          className="hero-bg-img"
        />

        <h1>Welcome to FinTrip</h1>

        <p>
          Plan trips by comparing projected expenses against a defined budget
          you set.
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

  return (
    <section>
      <h1>My Trips</h1>

      <p>
        Welcome, {user.name}. Create a trip or manage one of your saved trips.
      </p>

      {errorMessage && (
        <Alert variant="danger">{errorMessage}</Alert>
      )}

      <CreateTripForm reloadTrips={reloadTrips} />

      <hr />

      <h2>Saved Trips</h2>

      {isLoading ? (<p>Loading trips...</p>) : trips.length === 0 ? (
        <p>You have not created any trips yet.</p>
      ) : (
        trips.map((trip) => (
          <TripCard
            key={trip._id}
            trip={trip}
            reloadTrips={reloadTrips}
          />
        ))
      )}
    </section>
  );
}