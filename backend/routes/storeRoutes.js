const express = require("express");
const { createStore, getStores, getStoreById, updateStore, deleteStore } = require("../controllers/storeController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const db = require("../config/db");

const router = express.Router();

// Public Routes
router.get("/", getStores);
router.get("/:id", getStoreById);


// Protected Routes (Only authenticated users can access)
router.post("/", authMiddleware, roleMiddleware("storeOwner"), createStore);
router.put("/:id", authMiddleware, roleMiddleware("storeOwner"), updateStore);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteStore);

router.get("/stores", async (req, res) => {
    const { search } = req.query;

    try {
        let query = "SELECT * FROM stores";
        let params = [];

        if (search) {
            query += " WHERE name LIKE ? OR address LIKE ?";
            params = [`%${search}%`, `%${search}%`];
        }

        const [stores] = await db.query(query, params);
        res.json({ success: true, stores });
    } catch (error) {
        console.error("Error fetching stores:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Submit or update a rating
router.post("/rate-store", authMiddleware, (req, res) => {
    const { storeId, rating } = req.body;
    const userId = req.user?.id; // Ensure authMiddleware sets `req.user`

    console.log("Received rating request:", req.body); // Debugging log

    if (!storeId || !rating) {
        console.log("❌ Missing storeId or rating");
        return res.status(400).json({ message: "Store ID and rating are required" });
    }

    const query = "INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE rating = ?";
    db.query(query, [userId, storeId, rating, rating], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database error" });
        }
        res.status(200).json({ message: "Rating submitted successfully!" });
    });
});



module.exports = router;
