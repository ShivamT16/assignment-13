const mongoose = require("mongoose");

const User = require("../models/user");

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      text: String,
    },
  ],
});

const Destination = mongoose.model("Destination", destinationSchema);

module.exports = Destination;
