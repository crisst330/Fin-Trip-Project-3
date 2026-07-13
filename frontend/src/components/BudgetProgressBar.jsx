import PropTypes from 'prop-types';

// In plain english, this component must recieve two numeric values: amount spent and budget cap. 
// Neither value may be omitted though.
export default function BudgetProgressBar({ spent, budgetCap }) {
    const percentage = budgetCap > 0 ? Math.min((spent / budgetCap) * 100, 100) : 0;

    return (
        <progress value={percentage} max="100">
            {percentage}%
        </progress>
    );
}

BudgetProgressBar.prototype = {
    spent: PropTypes.number.isRequired,
    budgetCap: PropTypes.number.isRequired,
};