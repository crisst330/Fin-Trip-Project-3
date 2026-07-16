import PropTypes from "prop-types";
import ProgressBar from "react-bootstrap/ProgressBar";

// In plain english, this component must recieve two numeric values:
// amount spent and budget cap.
export default function BudgetProgressBar({ spent, budgetCap }) {
  const percentage =
    budgetCap > 0
      ? Math.min((spent / budgetCap) * 100, 100) : 0;

  let variant = "success";

  if (percentage >= 100) {
    variant = "danger";
  } else if (percentage >= 80) {
    variant = "warning";
  }

  return (
    <ProgressBar
      now={percentage}
      label={`${Math.round(percentage)}%`}
      variant={variant}
    />
  );
}

BudgetProgressBar.propTypes = {
  spent: PropTypes.number.isRequired,
  budgetCap: PropTypes.number.isRequired,
};