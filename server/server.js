require("dotenv").config();

const express = require("express");
const db = require("./db");
const morgan = require("morgan");
const app = express();

// middleware to access body of req
app.use(express.json());

// get all restaurants
app.get("/api/restaurants", async(req, res) => {

  try {
    const results = await db.query(
      "SELECT * FROM restaurants"
    );
  
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows
      }
    });
  } catch (err) {
    console.log(err);
  }

});

// get a restaurant
app.get("/api/restaurants/:id", async(req, res) => {

  try {
    const results = await db.query(
      "SELECT * FROM restaurants WHERE id = $1",
      [req.params.id]
      // $1 is replaced with req.params.id to prevent SQL injection
    );

    res.status(200).json({
      status: "success",
      data: {
        restaurants: results.rows[0]
      }
    });
    
  } catch (err) {
    console.log(err);
  }
});

// create a restaurant
app.post("/api/restaurants", async(req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.price_range]);

    res.status(201).json({
      status: "success",
      data: {
        restaurants: results.rows[0]
      }
    });
  } catch (err) {
    console.log(err);
  }

});

// update restaurant
app.put("/api/restaurants:id", (req, res) => {

  res.status(200).json({
    status: "success",
    data: {
      restaurants: "McDonald's"
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