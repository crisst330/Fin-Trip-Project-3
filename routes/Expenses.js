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
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const newItem = {
      itemId: new ObjectId().toString(),
      category,
      title,
      cost,
      status,
      link: link || "",
      notes: notes || "",
    };
    await tripsDB.addItem(id, newItem);
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ error: "Failed to add expense" });
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
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    await tripsDB.updateItem(id, itemId, {
      category,
      title,
      cost,
      status,
      link,
      notes,
    });
    res.status(200).json({ message: "Expense updated successfully" });
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ error: "Failed to update expense" });
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
    await tripsDB.deleteItem(id, itemId);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ error: "Failed to delete expense" });
  }
});

export default router;
