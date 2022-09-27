require("dotenv").config();
const express = require("express");
const { mongoose } = require("mongoose");
const routes = require("./routes");

const app = express();
const port = process.env.SERVER_PORT;
const DB_URI = process.env.MONGO_DB_URI;

app.use(express.json());
app.use("/api", routes);

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
