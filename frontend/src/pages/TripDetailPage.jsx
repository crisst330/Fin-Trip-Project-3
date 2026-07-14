import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ExpenseList from "../components/ExpenseList.jsx";
import AddExpenseForm from "../components/AddExpenseForm.jsx";
import { useUser } from "../context/UserContext.jsx";

export default function TripDetailPage() {
  const user = useUser();
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
    reloadTrip();
  }, [reloadTrip]);

  return (
    <>
      <h1>Trip Detail Page</h1>
      {trip ? (
        <div>
          <h2>{trip.name}</h2>
          <p>{trip.description}</p>
          <p>Start Date: {trip.startDate}</p>
          <p>End Date: {trip.endDate}</p>
        </div>
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
              Please <a href="/login">log in</a> to add a new expense.
            </p>
          )}
        </Col>
      </Row>
    </>
  );
}
