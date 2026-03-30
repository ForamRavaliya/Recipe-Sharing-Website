const router = require("express").Router();
const pool = require("../db");

// GET all recipes
router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM recipes");
  res.json(result.rows);
});
// GET SINGLE RECIPE
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await pool.query(
    "SELECT * FROM recipes WHERE id = $1",
    [id]
  );

  res.json(result.rows[0]);
});

// ADD recipe
router.post("/", async (req, res) => {
  const { name, image, ingredients, steps, time, category } = req.body;

  const newRecipe = await pool.query(
    `INSERT INTO recipes (name, image, ingredients, steps, time, category)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [name, image, ingredients, steps, time, category]
  );

  res.json(newRecipe.rows[0]);
});

module.exports = router;