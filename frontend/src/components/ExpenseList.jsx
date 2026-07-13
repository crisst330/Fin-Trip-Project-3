import React, { useState, useEffect } from "react";
import ExpenseItem from "./ExpenseItem.jsx";
import PropTypes from "prop-types";

export default function ExpenseList({
  items,
  tripId,
  reloadExpenses,
  query,
  setQuery,
}) {
  function renderExpense(item) {
    return (
      <ExpenseItem
        key={item.itemId}
        item={item}
        tripId={tripId}
        reloadExpenses={reloadExpenses}
      />
    );
  }

  const onQuery = (evt) => {
    console.log("🏓 onQuery", evt.target.value);
    setQuery(evt.target.value);
  };

  console.log("👨🏽‍🍳 Render ExpenseList ", items);

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div>
      <h2>Expenses</h2>
      <input
        value={query}
        onChange={onQuery}
        placeholder="Filter expenses..."
      />
      {!items?.length ? (
        <div>Loading expenses...</div>
      ) : (
        filteredItems.map(renderExpense)
      )}
    </div>
  );
}

ExpenseList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      itemId: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      cost: PropTypes.number.isRequired,
      status: PropTypes.oneOf(["estimated", "booked"]).isRequired,
    }),
  ).isRequired,
  tripId: PropTypes.string.isRequired,
  reloadExpenses: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};
