import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";

export default function ExpenseItem({ item, tripId, reloadExpenses }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(item);
  const [error, setError] = useState(null);

  const onDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this expense?")) {
      return;
    }
    try {
      const res = await fetch(`/api/trips/${tripId}/items/${item.itemId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`Failed to delete expense: ${res.statusText}`);
      }
      reloadExpenses();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const onEdit = async (evt) => {
    evt.preventDefault();
    try {
      const res = await fetch(`/api/trips/${tripId}/items/${item.itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedItem),
      });
      if (!res.ok) {
        throw new Error(`Failed to update expense: ${res.statusText}`);
      }
      const data = await res.json();
      console.log("Expense updated successfully:", data);
      setIsEditing(false);
      reloadExpenses();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="expense-item">
      {error && <div className="alert alert-danger py-1">{error}</div>}
      {isEditing ? (
        <Form onSubmit={onEdit}>
          <Form.Group className="mb-3" controlId="expenseCategory">
            <Form.Select
              value={editedItem.category}
              onChange={(e) =>
                setEditedItem({ ...editedItem, category: e.target.value })
              }
            >
              <option value="Lodging">Lodging</option>
              <option value="Transport">Transport</option>
              <option value="Food">Food</option>
              <option value="Activities">Activities</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="expenseTitle">
            <Form.Control
              type="text"
              value={editedItem.title}
              placeholder="Enter title"
              onChange={(e) =>
                setEditedItem({ ...editedItem, title: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="expenseCost">
            <Form.Control
              type="number"
              value={editedItem.cost}
              placeholder="Enter cost"
              onChange={(e) =>
                setEditedItem({ ...editedItem, cost: +e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="expenseStatus">
            <Form.Select
              value={editedItem.status}
              onChange={(e) =>
                setEditedItem({ ...editedItem, status: e.target.value })
              }
            >
              <option value="estimated">Estimated</option>
              <option value="booked">Booked</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>{" "}
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </Form>
      ) : (
        <div>
          <h4>{item.title}</h4>
          <p>Category: {item.category}</p>
          <p>Cost: ${item.cost.toFixed(2)}</p>
          <p>Status: {item.status}</p>
          <Button variant="warning" onClick={() => setIsEditing(true)}>
            Edit
          </Button>{" "}
          <Button variant="danger" onClick={onDelete}>
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}

ExpenseItem.propTypes = {
  item: PropTypes.shape({
    itemId: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    status: PropTypes.oneOf(["estimated", "booked"]).isRequired,
  }).isRequired,
  tripId: PropTypes.string.isRequired,
  reloadExpenses: PropTypes.func.isRequired,
};
