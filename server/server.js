require("dotenv").config();
const express = require("express");

const app = express();

//get all restaurants
app.get("/api/restaurants", (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      restaurant: ["Subway", "McDonald's"]
    }
  });
});

const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});