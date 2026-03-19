const router = require("express").Router();
const pool = require("../db");

// ADD TO FAVORITES
router.post("/", async (req, res) => {
  const { user_id, recipe_id } = req.body;

  await pool.query(
    "INSERT INTO favorites (user_id, recipe_id) VALUES ($1,$2)",
    [user_id, recipe_id]
  );

  res.json("Added to favorites");
});

// GET FAVORITES OF USER
router.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;

  const result = await pool.query(
    "SELECT * FROM favorites WHERE user_id = $1",
    [user_id]
  );

  res.json(result.rows);
});

module.exports = router;