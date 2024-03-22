const Destination = require("../models/destination");

const createTravelDestination = async (newDestinationData) => {
  try {
    const newDestination = new Destination(newDestinationData);
    const savedDestination = await newDestination.save();
    console.log("New destination added", savedDestination);
    return savedDestination;
  } catch (error) {
    throw error;
  }
};

const readTravelDestination = async (destination) => {
  try {
    const findDestination = await Destination.findOne({ name: destination });
    if (findDestination) {
      console.log("Destination found", findDestination);
      return findDestination;
    } else {
      console.log("Destination not found");
    }
  } catch (error) {
    throw error;
  }
};

const readAllTravelDestination = async () => {
  try {
    const allDestinations = await Destination.find({});
    console.log("All Destinations", allDestinations);
    return allDestinations;
  } catch (error) {
    throw error;
  }
};

const readTravelDestinationByLocation = async (location) => {
  try {
    const destinationByLocation = await Destination.find({
      $or: [{ city: location }, { country: location }],
    });
    if (destinationByLocation.length > 0) {
      console.log("Destination found", destinationByLocation);
      return destinationByLocation;
    } else {
      console.log("No Destination found");
    }
  } catch (error) {
    throw error;
  }
};

const readTravelDestinationByRating = async () => {
  try {
    const destinationByRating = await Destination.find().sort({ rating: -1 });
    console.log("Destination by Rating", destinationByRating);
    return destinationByRating;
  } catch (error) {
    throw error;
  }
};

const updateTravelDestination = async (destinationId, updatedData) => {
  try {
    const updatedDestination = await Destination.findByIdAndUpdate(
      destinationId,
      updatedData,
      { new: true },
    );
    console.log("Updated destination", updatedDestination);
    return updatedDestination;
  } catch (error) {
    throw error;
  }
};

const deleteTravelDestination = async (destinationId) => {
  try {
    const deletedDestination =
      await Destination.findByIdAndDelete(destinationId);
    console.log("Destination deleted", deletedDestination);
    return deletedDestination;
  } catch (error) {
    throw error;
  }
};

const filterDestinationsByRating = async (destinationRating) => {
  try {
    const destinationByRating = await Destination.find({
      rating: { $gte: destinationRating },
    });
    console.log("Destinations", destinationByRating);
    return destinationByRating;
  } catch (error) {
    throw error;
  }
};

const addDestinationReview = async (destinationId, newReview) => {
  try {
    const destinationToBeUpdated = await Destination.findById(destinationId);
    if (destinationToBeUpdated) {
      const review = {
        user: newReview.userId,
        text: newReview.reviewText,
      };
      destinationToBeUpdated.reviews.push(review);
      await destinationToBeUpdated.save();

      const updatedDestinationWithReview = await Destination.findById(
        destinationId,
      ).populate("reviews.user", "username profilePictureUrl");
      console.log("Updated Destination", updatedDestinationWithReview);
      return updatedDestinationWithReview;
    } else {
      console.log("Destination not found");
    }
  } catch (error) {
    throw error;
  }
};

const destinationReviews = async (destinationId) => {
  try {
    const destination = await Destination.findById(destinationId).populate(
      "reviews.user",
      "username profilePictureUrl",
    );
    const destinationReviews = destination.reviews
      .slice(0, 3)
      .map((review) => ({
        user: review.user,
        reviewText: review.text,
      }));
    console.log("3 reviews", destinationReviews);
    return destinationReviews;
  } catch (error) {
    throw error;
  }
};

module.exports = {
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
};
