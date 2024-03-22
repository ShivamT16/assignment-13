const express = require("express");
const destinationRouter = express.Router();

const Destination = require("../models/destination");

const {
  createTravelDestination,
  readTravelDestination,
  readAllTravelDestination,
  readTravelDestinationByLocation,
  readTravelDestinationByRating,
  updateTravelDestination,
  deleteTravelDestination,
  filterDestinationsByRating,
  addDestinationReview,
  destinationReviews,
} = require("../services/destinationServices");

destinationRouter.use(express.json());

destinationRouter.post("/", async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.city ||
      !req.body.country ||
      !req.body.description
    ) {
      res.status(400).json({ error: "All fields are required" });
    } else {
      const destinationExist = await Destination.findOne({
        name: req.body.name,
      });
      if (destinationExist) {
        res.status(400).json("Destination already registered.");
      } else {
        const savedDestination = await createTravelDestination(req.body);
        res.status(201).json({
          "New Destination added": savedDestination,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Error adding new Destination" });
  }
});

destinationRouter.get("/rating", async (req, res) => {
  try {
    const destinationsByRating = await readTravelDestinationByRating();
    if (destinationsByRating) {
      res.status(200).json({ Destinations: destinationsByRating });
    } else {
      res.status(404).json("Destinations not found");
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error finding Destinations by given rating" });
  }
});

destinationRouter.get("/:name", async (req, res) => {
  try {
    const destinationByName = await readTravelDestination(req.params.name);
    if (destinationByName) {
      res.status(200).json({ "Destination found": destinationByName });
    } else {
      res.status(404).json("Destination not found");
    }
  } catch (error) {
    res.status(500).json({ "Error finding destination": error });
  }
});

destinationRouter.get("/", async (req, res) => {
  try {
    const allDestinations = await readAllTravelDestination();
    if (allDestinations) {
      res.status(200).json({ "All Destinations": allDestinations });
    } else {
      res.status(404).json({ error: "Destinations not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error finding Destinations" });
  }
});

destinationRouter.get("/location/:location", async (req, res) => {
  try {
    const destinationByLocation = await readTravelDestinationByLocation(
      req.params.location,
    );
    if (destinationByLocation) {
      res
        .status(200)
        .json({ "Destination found in given loaction": destinationByLocation });
    } else {
      res.status(404).json("Destinations not found");
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error finding destination by given location" });
  }
});

destinationRouter.post("/:destinationId", async (req, res) => {
  try {
    const updatedDestination = await updateTravelDestination(
      req.params.destinationId,
      req.body,
    );
    if (updatedDestination) {
      res.status(201).json({ "Updated Destination": updatedDestination });
    } else {
      res.status(404).json("Destination not found");
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating destination" });
  }
});

destinationRouter.delete("/:destinationId", async (req, res) => {
  try {
    const deletedDestination = await deleteTravelDestination(
      req.params.destinationId,
    );
    if (deletedDestination) {
      res.status(200).json({ "Destination Deleted": deletedDestination });
    } else {
      res.status(404).json("Destination not found");
    }
  } catch (error) {
    res.status(500).json("Error deleting destination");
  }
});

destinationRouter.get("/filter/:minRating", async (req, res) => {
  try {
    const destinationsByRating = await filterDestinationsByRating(
      req.params.minRating,
    );
    if (destinationsByRating.length > 0) {
      res.status(200).json({ "Destination by Rating": destinationsByRating });
    } else {
      res.status(404).json("No destination found for given rating");
    }
  } catch (error) {
    res.status(500).json({ error: "Error finding Destination" });
  }
});

destinationRouter.post("/:destinationId/reviews", async (req, res) => {
  try {
    const addReviews = await addDestinationReview(
      req.params.destinationId,
      req.body,
    );
    if (addReviews) {
      res.status(201).json({ "Reviews added to destination": addReviews });
    } else {
      res.status(404).json("Destination not found");
    }
  } catch {
    res.status(500).json({ error: "Error adding reviews to destination" });
  }
});

destinationRouter.get("/:destinationId/reviews", async (req, res) => {
  try {
    const getReviews = await destinationReviews(req.params.destinationId);
    if (getReviews) {
      res.status(200).json({ Reviews: getReviews });
    } else {
      res.status(404).json("Destination not found");
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting reviews" });
  }
});

module.exports = destinationRouter;
