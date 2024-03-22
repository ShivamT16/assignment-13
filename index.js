const express = require("express");
const app = express();

const destinationRouter = require("./routers/destinations.router");
const userRouter = require("./routers/user.router");
app.use(express.json());

require("./db");

app.get("/", (req, res) => {
  res.send("Welcome to the Destination API documentation.");
});

app.use("/user", userRouter);
app.use("/destinations", destinationRouter);

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ error: "Something went wrong " });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
