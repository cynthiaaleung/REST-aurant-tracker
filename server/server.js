require("dotenv").config();

const express = require("express");
const db = require("./db");
const morgan = require("morgan");
const app = express();

// middleware to access body of req
app.use(express.json());

// get all restaurants
app.get("/api/restaurants", async(req, res) => {

  const results = await db.query("SELECT * FROM restaurants");

  console.log(results);

  res.status(200).json({
    status: "success",
    data: {
      restaurant: ["Subway", "McDonald's"]
    }
  });
});

// get a restaurant
app.get("/api/restaurants/:id", (req, res) => {
  console.log(req.params);

  res.status(200).json({
    status: "success",
    data: {
      restaurant: "McDonald's"
    }
  });
});

// create a restaurant
app.post("/api/restaurants", (req, res) => {
  console.log(req.body);

  res.status(201).json({
    status: "success",
    data: {
      restaurant: "McDonald's"
    }
  });
});

// update restaurant
app.put("/api/restaurants:id", (req, res) => {
  console.log(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      restaurant: "McDonald's"
    }
  });
});

// delete restaurant
app.delete("/api/restaurants/:id", (req, res) => {
  res.status(204).json({
    status: "success"
  });
});

const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});