const Store = require("../models/Store");

// @desc    Create a new store
// @route   POST /api/stores
// @access  Private (Store Owner)
const createStore = async (req, res) => {
    try {
        const { name, location, description } = req.body;

        // Validate required fields
        if (!name || !location || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create and save store
        const newStore = await Store.create({
            name,
            location,
            description,
            owner: req.user.id, // Store owner's ID
        });

        res.status(201).json(newStore);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Get all stores
// @route   GET /api/stores
// @access  Public
const getStores = async (req, res) => {
    try {
        const stores = await Store.findAll();
        res.json(stores);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Get store by ID
// @route   GET /api/stores/:id
// @access  Public
const getStoreById = async (req, res) => {
    try {
        const store = await Store.findByPk(req.params.id);

        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }

        res.json(store);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Update store
// @route   PUT /api/stores/:id
// @access  Private (Store Owner)
const updateStore = async (req, res) => {
    try {
        const store = await Store.findByPk(req.params.id);

        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }

        // Ensure only the store owner can update
        if (store.owner !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const { name, location, description } = req.body;

        store.name = name || store.name;
        store.location = location || store.location;
        store.description = description || store.description;

        await store.save();
        res.json(store);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// @desc    Delete store
// @route   DELETE /api/stores/:id
// @access  Private (Admin)
const deleteStore = async (req, res) => {
    try {
        const store = await Store.findByPk(req.params.id);

        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }

        await store.destroy();
        res.json({ message: "Store deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    createStore,
    getStores,
    getStoreById,
    updateStore,
    deleteStore,
};
