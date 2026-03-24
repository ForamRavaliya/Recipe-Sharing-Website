const router = require("express").Router();
const pool = require("../db");

// ✅ GET REVIEWS
router.get("/:recipe_id", async (req, res) => {
  try {
    const { recipe_id } = req.params;

    const result = await pool.query(
      "SELECT * FROM reviews WHERE recipe_id = $1",
      [recipe_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

// ✅ ADD REVIEW
router.post("/", async (req, res) => {
  try {
    const { user_id, recipe_id, rating, comment } = req.body;

    const result = await pool.query(
      "INSERT INTO reviews (user_id, recipe_id, rating, comment) VALUES ($1,$2,$3,$4) RETURNING *",
      [user_id, recipe_id, rating, comment]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding review");
  }
});

module.exports = router;