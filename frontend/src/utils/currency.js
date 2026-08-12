// Purpose of this function is to format a number as currency in USD format
// For example, 1234.56 will be formatted as $1,234.56
// This function can be used in any component that needs to display currency values
export function formatCurrency(value) {
    return Number(value).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
}