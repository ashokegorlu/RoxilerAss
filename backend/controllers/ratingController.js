const Rating = require("../models/Rating");
const Store = require("../models/Store");

// @desc    Add a rating to a store
// @route   POST /api/ratings
// @access  Private (Authenticated Users)
const addRating = async (req, res) => {
    try {
        const { storeId, rating, comment } = req.body;

        if (!storeId || !rating) {
            return res.status(400).json({ message: "Store ID and rating are required" });
        }

        const store = await Store.findByPk(storeId);
        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }

        const newRating = await Rating.create({
            storeId,
            userId: req.user.id,
            rating,
            comment,
        });

        res.status(201).json(newRating);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Get ratings for a store
// @route   GET /api/ratings/:storeId
// @access  Public
const getStoreRatings = async (req, res) => {
    try {
        const ratings = await Rating.findAll({
            where: { storeId: req.params.storeId },
        });

        res.json(ratings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    addRating,
    getStoreRatings,
};
