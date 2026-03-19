const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");

// SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *",
    [name, email, hashed]
  );

  res.json(user.rows[0]);
});

module.exports = router;