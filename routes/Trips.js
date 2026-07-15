import express from "express";
import tripsDB from "../models/TripsDB.js";

const router = express.Router();

router.get("/trips/", async (req, res) => {
  console.log("Received request to GET /api/trips/");
  try {
    const trips = await tripsDB.getTrips(req.user._id);
    res.status(200).json(trips);
  } catch (error) {
    console.error("Error fetching trips:", error);
    res.status(500).json({ error: "Failed to fetch trips" });
  }
});

router.get("/trips/:id", async (req, res) => {
  console.log("Received request to GET /api/trips/:id", req.params.id);
  try {
    const trip = await tripsDB.getTripById(req.params.id, req.user._id);
    if (trip) {
      res.status(200).json(trip);
    } else {
      res.status(404).json({ error: "Trip not found" });
    }
  } catch (error) {
    console.error("Error fetching trip:", error);
    res.status(500).json({ error: "Failed to fetch trip" });
  }
});

router.post("/trips/", async (req, res) => {
  console.log("Received request to POST /api/trips/", req.body);
  try {
    const newTrip = await tripsDB.createTrip({
      ...req.body,
      ownerId: req.user._id,
    });
    res.status(201).json(newTrip);
  } catch (error) {
    console.error("Error creating trip:", error);
    res.status(500).json({ error: "Failed to create trip" });
  }
});

router.put("/trips/:id", async (req, res) => {
  console.log(
    "Received request to PUT /api/trips/:id",
    req.params.id,
    req.body,
  );
  try {
    const updatedTrip = await tripsDB.updateTrip(
      req.params.id,
      req.user._id,
      req.body,
    );
    res.status(200).json(updatedTrip);
  } catch (error) {
    console.error("Error updating trip:", error);
    res.status(500).json({ error: "Failed to update trip" });
  }
});

router.delete("/trips/:id", async (req, res) => {
  console.log("Received request to DELETE /api/trips/:id", req.params.id);
  try {
    await tripsDB.deleteTrip(req.params.id, req.user._id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting trip:", error);
    res.status(500).json({ error: "Failed to delete trip" });
  }
});

export default router;
