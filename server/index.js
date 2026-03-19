const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", require("./routes/auth"));
app.use("/recipes", require("./routes/recipes"));
app.use("/favorites", require("./routes/favorites"));
app.use("/upload", require("./routes/upload"));
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.listen(5000, () => console.log("Server running on port 5000"));