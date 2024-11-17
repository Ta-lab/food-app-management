const FoodItem = require('../models/foodItemModel'); // Import the FoodItem model
const upload = require('../middlewares/fileUploadMiddleware'); // Import the file upload middleware

// Create a new food item with an image
const createFoodItem = async (req, res) => {
    const { name, cost, ingredients } = req.body;
    const image = req.file ? req.file.path : null; // Get the uploaded image path

    try {
        const result = await FoodItem.createFoodItem(name, cost, ingredients, image);
        res.status(201).json({
            message: 'Food item created successfully',
            data: result,
        });
    } catch (err) {
        console.error('Error creating food item:', err);
        res.status(500).json({ message: 'Error creating food item' });
    }
};

// Get all food items
const getAllFoodItems = async (req, res) => {
    try {
        const foodItems = await FoodItem.getAllFoodItems();
        res.status(200).json(foodItems);
    } catch (err) {
        console.error('Error fetching food items:', err);
        res.status(500).json({ message: 'Error fetching food items' });
    }
};

// Get food item by ID
const getFoodItemById = async (req, res) => {
    const { id } = req.params;

    try {
        const foodItem = await FoodItem.getFoodItemById(id);
        if (!foodItem) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        res.status(200).json(foodItem);
    } catch (err) {
        console.error('Error fetching food item by ID:', err);
        res.status(500).json({ message: 'Error fetching food item' });
    }
};

// Update a food item
const updateFoodItem = async (req, res) => {
    const { id } = req.params;
    const { name, cost, ingredients, image } = req.body;
    let imagePath = null;
    try {
        if (req.file) {
            imagePath = req.file.path;
        } else if (image) {
            imagePath = image.replace(process.env.BASE_URL, '');
        }
        const result = await FoodItem.updateFoodItem(id, name, cost, ingredients, imagePath);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        res.status(200).json({
            message: 'Food item updated successfully',
        });
    } catch (err) {
        console.error('Error updating food item:', err);
        res.status(500).json({ message: 'Error updating food item' });
    }
};

// Delete a food item
const deleteFoodItem = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await FoodItem.deleteFoodItem(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Food item not found' });
        }
        res.status(200).json({
            message: 'Food item deleted successfully',
        });
    } catch (err) {
        console.error('Error deleting food item:', err);
        res.status(500).json({ message: 'Error deleting food item' });
    }
};

// Sync FoodItems
const syncFoodItems = async (req, res) => {
    const { content, id, isEdit } = req.body.data;
    const { name, cost, ingredients} = content;
    try {
        const result = await FoodItem.syncFoodItems(id, name, cost, ingredients, isEdit);
        res.status(200).json({ status: 200, message: 'FoodItems Sync successfully', FoodItemId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error Creating FoodItems', error: error.message });
    }
};


module.exports = {
    createFoodItem,
    getAllFoodItems,
    getFoodItemById,
    updateFoodItem,
    deleteFoodItem,
    syncFoodItems
};
