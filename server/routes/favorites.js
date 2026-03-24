const router = require("express").Router();
const pool = require("../db");

// ✅ ADD FAVORITE (FIXED + NO DUPLICATE)
router.post("/", async (req, res) => {
  try {
    const { user_id, recipe_id } = req.body;

    // 🔍 Check if already exists
    const check = await pool.query(
      "SELECT * FROM favorites WHERE user_id=$1 AND recipe_id=$2",
      [user_id, recipe_id]
    );

    if (check.rows.length > 0) {
      return res.json({ message: "Already in favorites" });
    }

    // ✅ Insert
    const result = await pool.query(
      "INSERT INTO favorites (user_id, recipe_id) VALUES ($1,$2) RETURNING *",
      [user_id, recipe_id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding favorite");
  }
});

// ✅ GET FAVORITES (ONLY ONE GET)
router.get("/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    const result = await pool.query(
      `SELECT r.id, r.name, r.image
       FROM favorites f
       JOIN recipes r ON r.id = f.recipe_id
       WHERE f.user_id = $1`,
      [user_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching favorites");
  }
});

module.exports = router;