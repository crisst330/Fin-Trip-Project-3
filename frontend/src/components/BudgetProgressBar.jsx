import PropTypes from "prop-types";

// In plain english, this component must recieve two numeric values:
// amount spent and budget cap.
export default function BudgetProgressBar({ spent, budgetCap }) {
  const percentage =
    budgetCap > 0 ? Math.min((spent / budgetCap) * 100, 100) : 0;

  let variant = "success";

  if (percentage >= 100) {
    variant = "danger";
  } else if (percentage >= 80) {
    variant = "warning";
  }

  const rounded = Math.round(percentage);
  return (
    <div className="progress">
      <div
        role="progressbar"
        aria-label={`${rounded}% of budget used`}
        aria-valuenow={rounded}
        aria-valuemin={0}
        aria-valuemax={100}
        className={`progress-bar bg-${variant} ${variant === "warning" ? "text-dark" : ""}`}
        style={{ width: `${percentage}%` }}
      >
        {rounded}%
      </div>
    </div>
  );
}

BudgetProgressBar.propTypes = {
  spent: PropTypes.number.isRequired,
  budgetCap: PropTypes.number.isRequired,
};
