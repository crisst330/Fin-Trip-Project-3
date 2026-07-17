import { useState } from "react";
import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function EditTripForm({ trip, reloadTrips, closeEditForm }) {
  const [formData, setFormData] = useState({
    name: trip.name,
    destination: trip.destination,
    startDate: trip.startDate,
    endDate: trip.endDate,
    travelers: trip.travelers,
    budgetCap: trip.budgetCap,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    const payload = {
      ...formData,
      travelers: Number(formData.travelers),
      budgetCap: Number(formData.budgetCap),
    };

    try {
      const response = await fetch(`/api/trips/${trip._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();

        setErrorMessage(data.error || "Unable to update the trip.");
        return;
      }

      await reloadTrips();
      closeEditForm();
    } catch (error) {
      console.error("Update trip error:", error);

      setErrorMessage(
        "This trip may have been updated, but the page could not refresh.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-3">
      <h3>Edit Trip</h3>

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId={`edit-name-${trip._id}`}>
          <Form.Label>Trip Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId={`edit-destination-${trip._id}`}>
          <Form.Label>Destination</Form.Label>
          <Form.Control
            type="text"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId={`edit-start-date-${trip._id}`}>
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId={`edit-end-date-${trip._id}`}>
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId={`edit-travelers-${trip._id}`}>
          <Form.Label>Number of Travelers</Form.Label>
          <Form.Control
            type="number"
            name="travelers"
            min="1"
            value={formData.travelers}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId={`edit-budget-cap-${trip._id}`}>
          <Form.Label>Budget Cap</Form.Label>
          <Form.Control
            type="number"
            name="budgetCap"
            min="1"
            step="0.01"
            value={formData.budgetCap}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button type="submit" disabled={isSubmitting} className="me-2">
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>

        <Button
          type="button"
          variant="secondary"
          onClick={closeEditForm}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </Form>
    </section>
  );
}

EditTripForm.propTypes = {
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
  closeEditForm: PropTypes.func.isRequired,
};
