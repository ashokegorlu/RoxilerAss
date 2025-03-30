const express = require("express");
const router = express.Router();
const { addRating, getStoreRatings } = require("../controllers/ratingController");
const authMiddleware = require("../middleware/authMiddleware");

// Routes
router.post("/", authMiddleware, addRating);  // Ensure function is correctly imported
router.get("/:storeId", getStoreRatings);

module.exports = router;
