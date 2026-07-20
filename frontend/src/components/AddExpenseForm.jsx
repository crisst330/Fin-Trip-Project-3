import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import PropTypes from "prop-types";
import "./AddExpenseForm.css";

const DEFAULT_ITEM = {
  category: "Lodging",
  title: "",
  cost: "",
  status: "estimated",
};

// The file is AddExpenseForm.jsx and the README calls it that too, but the component and its PropTypes are named CreateExpenseForm
export default function AddExpenseForm({ tripId, reloadExpenses }) {
  const [item, setItem] = useState(DEFAULT_ITEM);

  const onSubmit = async (evt) => {
    evt.preventDefault();

    const payload = {
      ...item,
      cost: parseFloat(item.cost) || 0,
    };

    // Might be a leftover debug log. The submit handler still has a console.log("🏓 onSubmit", payload) and a success log 
    // which are currently showing up in the console.
    
    console.log("Expense created successfully:", data);

    try {
      const res = await fetch(`/api/trips/${tripId}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error("Failed to create expense:", res.statusText);
        return;
      }

      const data = await res.json();
      console.log("Expense created successfully:", data);

      setItem(DEFAULT_ITEM);

      await reloadExpenses();
    } catch (error) {
      console.error("Unable to create expense:", error);
    }
  };

  return (
    <Form onSubmit={onSubmit} className="create-expense-card">
      <h3>Create New Expense</h3>

      <Form.Group className="mb-3" controlId="expenseCategory">
        <Form.Select
          value={item.category}
          onChange={(e) =>
            setItem({
              ...item,
              category: e.target.value,
            })
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
          value={item.title}
          placeholder="Enter title"
          onChange={(e) =>
            setItem({
              ...item,
              title: e.target.value,
            })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="expenseCost">
        <Form.Control
          type="number"
          value={item.cost}
          placeholder="Enter cost"
          onChange={(e) =>
            setItem({
              ...item,
              cost: e.target.value,
            })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="expenseStatus">
        <Form.Select
          value={item.status}
          onChange={(e) =>
            setItem({
              ...item,
              status: e.target.value,
            })
          }
        >
          <option value="estimated">Estimated</option>
          <option value="booked">Booked</option>
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit">
        Create Expense
      </Button>
    </Form>
  );
}

// The file is AddExpenseForm.jsx and the README calls it that too, but the component and its PropTypes are named CreateExpenseForm
AddExpenseForm.propTypes = {
  tripId: PropTypes.string.isRequired,
  reloadExpenses: PropTypes.func.isRequired,
};
