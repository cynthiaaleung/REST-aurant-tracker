require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./db");
const morgan = require("morgan");
const app = express();

app.use(cors());
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
    const restaurant = await db.query(
      "SELECT * FROM restaurants WHERE id = $1",
      [req.params.id]
      // $1 is replaced with req.params.id to prevent SQL injection
    );

    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurant_id = $1",
      [req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows
      }
    });
  } catch (err) {
    console.log(err);
  }
});

// create a restaurant
app.post("/api/restaurants", async(req, res) => {

  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) RETURNING *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0]
      }
    });
  } catch (err) {
    console.log(err);
  }

});

// update restaurant
app.put("/api/restaurants/:id", async(req, res) => {

  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0]
      }
    });
  } catch (err) {
    console.log(err);
  }

});

// delete restaurant
app.delete("/api/restaurants/:id", async(req, res) => {

  try {
    const results = await db.query(
      "DELETE FROM restaurants WHERE id = $1",
      [req.params.id]
    );
    res.status(204).json({
      status: "success"
    });
  } catch (err) {
    console.log(err);
  }
});

// add a new review
app.post("/api/restaurants/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) RETURNING *",
      [req.params.id, req.body.name, req.body.review, req.body.rating]);

    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0]
      }
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
