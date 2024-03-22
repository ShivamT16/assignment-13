const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB;

mongoose
  .connect(mongoURI, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB");
  });
