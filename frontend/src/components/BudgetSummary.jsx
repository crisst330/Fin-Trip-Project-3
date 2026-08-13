import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";

import BudgetProgressBar from "./BudgetProgressBar.jsx";
import { formatCurrency } from "../utils/currency.js";

export default function BudgetSummary({ trip }) {
  const spent = trip.items.reduce(
    (total, item) => total + Number(item.cost),
    0,
  );

  const remaining = trip.budgetCap - spent;

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Budget Summary</Card.Title>

        <p>
          <strong>Budget Cap:</strong> {formatCurrency(trip.budgetCap)}
        </p>

        <p>
          <strong>Spent:</strong> {formatCurrency(spent)}
        </p>

        <p>
          <strong>Remaining:</strong> {formatCurrency(remaining)}
        </p>

        <BudgetProgressBar spent={spent} budgetCap={trip.budgetCap} />
      </Card.Body>
    </Card>
  );
}

BudgetSummary.propTypes = {
  trip: PropTypes.shape({
    budgetCap: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        cost: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};
