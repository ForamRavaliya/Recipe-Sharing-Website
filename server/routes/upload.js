const router = require("express").Router();
const multer = require("multer");

// STORAGE CONFIG
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// UPLOAD ROUTE
router.post("/", upload.single("image"), (req, res) => {
  res.json({
    image: req.file.filename
  });
});

module.exports = router;