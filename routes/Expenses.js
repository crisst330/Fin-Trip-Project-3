import express from "express";
import { ObjectId } from "mongodb";

import tripsDB from "../models/TripsDB.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.use(isAuthenticated);

router.post("/:id/items", async (req, res) => {
  console.log("POST /api/trips/:id/items", req.params.id, req.body);

  const { id } = req.params;
  const { category, title, cost, status, link, notes } = req.body;

  if (!category || !title || !cost || !status) {
    return res.status(400).json({
      error: "Missing required fields",
    });
  }

  try {
    const newItem = {
      itemId: new ObjectId().toString(),
      category,
      title,
      cost: Number(cost),
      status,
      link: link || "",
      notes: notes || "",
    };

    const result = await tripsDB.addItem(id, req.user._id, newItem);

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Trip not found",
      });
    }

    return res.status(201).json(newItem);
  } catch (error) {
    console.error("Error adding expense:", error);

    return res.status(500).json({
      error: "Failed to add expense",
    });
  }
});

router.put("/:id/items/:itemId", async (req, res) => {
  console.log(
    "PUT /api/trips/:id/items/:itemId",
    req.params.id,
    req.params.itemId,
    req.body,
  );

  const { id, itemId } = req.params;
  const { category, title, cost, status, link, notes } = req.body;

  if (!category || !title || !cost || !status) {
    return res.status(400).json({
      error: "Missing required fields",
    });
  }

  try {
    const result = await tripsDB.updateItem(id, req.user._id, itemId, {
      category,
      title,
      cost,
      status,
      link,
      notes,
    });

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Trip or expense not found",
      });
    }

    return res.status(200).json({
      message: "Expense updated successfully",
    });
  } catch (error) {
    console.error("Error updating expense:", error);

    return res.status(500).json({
      error: "Failed to update expense",
    });
  }
});

router.delete("/:id/items/:itemId", async (req, res) => {
  console.log(
    "DELETE /api/trips/:id/items/:itemId",
    req.params.id,
    req.params.itemId,
  );

  const { id, itemId } = req.params;

  try {
    const result = await tripsDB.deleteItem(id, req.user._id, itemId);

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Trip not found",
      });
    }

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        error: "Expense not found",
      });
    }

    return res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting expense:", error);

    return res.status(500).json({
      error: "Failed to delete expense",
    });
  }
});

export default router;
