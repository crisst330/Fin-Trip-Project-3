import { useState } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router";
import EditTripForm from "./EditTripForm.jsx";

export default function TripCard({ trip, reloadTrips }) {
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${trip.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    setErrorMessage("");
    try {
      const response = await fetch(`/api/trips/${trip._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.error || "Unable to delete the trip.");
        return;
      }

      await reloadTrips();
    } catch (error) {
      console.error("Delete trip error:", error);
      setErrorMessage("Unable to connect to the server.");
    }
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{trip.name}</Card.Title>
        <Card.Text>
          <strong>Destination:</strong> {trip.destination}
        </Card.Text>
        <Card.Text>
          <strong>Dates:</strong> {trip.startDate} to {trip.endDate}
        </Card.Text>
        <Card.Text>
          <strong>Travelers:</strong> {trip.travelers}
        </Card.Text>
        <Card.Text>
          <strong>Budget Cap:</strong> ${trip.budgetCap.toFixed(2)}
        </Card.Text>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}

        <Button
          as={Link}
          to={`/trips/${trip._id}`}
          variant="primary"
          className="me-2"
        >
          View Trip
        </Button>

        <Button
          type="button"
          variant="secondary"
          className="me-2"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Close Edit" : "Edit"}
        </Button>

        <Button
          type="button"
          variant="danger"
          onClick={handleDelete}
        >
          Delete
        </Button>
        {isEditing && (
          <EditTripForm
            trip={trip}
            reloadTrips={reloadTrips}
            closeEditForm={() => setIsEditing(false)}
          />
        )}
      </Card.Body>
    </Card>
  );
}

TripCard.propTypes = {
  trip: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    travelers: PropTypes.number.isRequired,
    budgetCap: PropTypes.number.isRequired,
  }).isRequired,

  reloadTrips: PropTypes.func.isRequired,
};