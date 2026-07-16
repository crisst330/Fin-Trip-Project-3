import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import ExpenseList from "../components/ExpenseList.jsx";
import AddExpenseForm from "../components/AddExpenseForm.jsx";
import BudgetSummary from "../components/BudgetSummary.jsx";
import { useUser } from "../context/UserContext.jsx";
import "./TripDetailPage.css";

export default function TripDetailPage() {
  const { user } = useUser();
  const { tripId } = useParams();

  const [trip, setTrip] = useState(null);
  const [query, setQuery] = useState("");

  const reloadTrip = useCallback(async () => {
    const res = await fetch(`/api/trips/${tripId}`);

    if (!res.ok) {
      console.error("Failed to fetch trip:", res.statusText);
      return;
    }

    const data = await res.json();
    setTrip(data);
  }, [tripId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    reloadTrip();
  }, [reloadTrip]);

  const totalCost =
    trip?.items?.reduce((sum, item) => sum + parseFloat(item.cost || 0), 0) ||
    0;
  const perPersonCost =
    trip && trip.travelers > 0 ? totalCost / trip.travelers : 0;

  return (
    <>
      <h1>Trip Details</h1>

      {trip ? (
        <>
          <div>
            <h2>{trip.name}</h2>

            <p>
              <strong>Destination:</strong> {trip.destination}
            </p>

            <p>
              <strong>Start Date:</strong> {trip.startDate}
            </p>

            <p>
              <strong>End Date:</strong> {trip.endDate}
            </p>

            <p>
              <strong>Travelers:</strong> {trip.travelers}
            </p>

            <p>
              <strong>Per-Person Cost:</strong>{" "}
              <span className="per-person-highlight">
                ${perPersonCost.toFixed(2)}
              </span>
            </p>
          </div>

          <BudgetSummary trip={trip} />
        </>
      ) : (
        <p>Loading trip details...</p>
      )}

      <Row>
        <Col md={8} xs={12}>
          <ExpenseList
            items={trip?.items || []}
            tripId={tripId}
            reloadExpenses={reloadTrip}
            query={query}
            setQuery={setQuery}
          />
        </Col>

        <Col md={4} xs={12}>
          {user ? (
            <AddExpenseForm tripId={tripId} reloadTrip={reloadTrip} />
          ) : (
            <p>
              Please <Link to="/login">log in</Link> to add a new expense.
            </p>
          )}
        </Col>
      </Row>
    </>
  );
}
