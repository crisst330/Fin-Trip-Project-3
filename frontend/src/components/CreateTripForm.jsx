import { useState } from "react";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const DEFAULT_TRIP = {
  name: "",
  destination: "",
  startDate: "",
  endDate: "",
  travelers: "",
  budgetCap: "",
};

export default function CreateTripForm({ reloadTrips }) {
  const [trip, setTrip] = useState(DEFAULT_TRIP);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setTrip({
      ...trip,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    const payload = {
      ...trip,
      travelers: Number(trip.travelers),
      budgetCap: Number(trip.budgetCap),
    };

    try {
      const response = await fetch("/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.error || "Unable to create the trip.");
        return;
      }

      setTrip(DEFAULT_TRIP);
      reloadTrips();
    } catch (error) {
      console.error("Create trip error:", error);
      setErrorMessage("Unable to connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mb-4">
      <h2>Plan a New Trip</h2>

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="trip-name">
          <Form.Label>Trip Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={trip.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="trip-destination">
          <Form.Label>Destination</Form.Label>
          <Form.Control
            type="text"
            name="destination"
            value={trip.destination}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="trip-start-date">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            value={trip.startDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="trip-end-date">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            value={trip.endDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="trip-travelers">
          <Form.Label>Number of Travelers</Form.Label>
          <Form.Control
            type="number"
            name="travelers"
            min="1"
            value={trip.travelers}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="trip-budget-cap">
          <Form.Label>Budget Cap</Form.Label>
          <Form.Control
            type="number"
            name="budgetCap"
            min="0"
            step="0.01"
            value={trip.budgetCap}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating Trip..." : "Create Trip"}
        </Button>
      </Form>
    </section>
  );
}

CreateTripForm.propTypes = {
  reloadTrips: PropTypes.func.isRequired,
};
