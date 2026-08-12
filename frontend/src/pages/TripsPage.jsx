import { useCallback, useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";

import CreateTripForm from "../components/CreateTripForm.jsx";
import TripCard from "../components/TripCard.jsx";
import { useUser } from "../context/UserContext.jsx";

import "../styles/TripsPage.css";

export default function TripsPage() {
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
      <section className="trips-page">
        <h1>My Trips</h1>

        <Alert variant="warning" role="alert">
          Please log in to view and manage your trips.
        </Alert>
      </section>
    );
  }

  return (
    <main className="trips-page">
      <header className="trips-page-header">
        <h1>My Trips</h1>

        <p>
          Create a new trip or manage one of your saved travel plans.
        </p>
      </header>

      {errorMessage && (
        <Alert variant="danger" role="alert">
          {errorMessage}
        </Alert>
      )}

      <section
        className="trips-create-section"
        aria-label="Create a new trip"
      >
        <CreateTripForm reloadTrips={reloadTrips} />
      </section>

      <section
        className="trips-saved-section"
        aria-labelledby="saved-trips-heading"
      >
        <h2 id="saved-trips-heading">Saved Trips</h2>

        {isLoading ? (
          <p>Loading trips...</p>
        ) : trips.length === 0 ? (
          <p>
            You have not created any trips yet. Create your first trip above.
          </p>
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
    </main>
  );
}