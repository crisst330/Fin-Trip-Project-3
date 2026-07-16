import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";

import BudgetProgressBar from "./BudgetProgressBar";

export default function BudgetSummary({ trip }) {
    const spent = trip.items.reduce((total, item) => total + Number(item.cost), 0);

    const remaining = trip.budgetCap - spent;

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>Budget Summary</Card.Title>

                <p>
                    <strong>Budget Cap:</strong> ${trip.budgetCap.toFixed(2)}
                </p>

                <p>
                    <strong>Spent:</strong> ${spent.toFixed(2)}
                </p>

                <p>
                    <strong>Remaining:</strong> ${remaining.toFixed(2)}
                </p>

                <BudgetProgressBar
                    spent={spent}
                    budgetCap={trip.budgetCap}
                />
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