const { get } = require('express/lib/request');
const db = require('../config/db');  // Assuming db.js handles your database connection

// Create a new food item
const createFoodItem = async (name, cost, ingredients, image) => {
    const [result] = await db.query(
        'INSERT INTO food_items (name, cost, ingredients, image) VALUES (?, ?, ?, ?)',
        [name, cost, ingredients, image]
    );
    return result;
};

// Get all food items
const getAllFoodItems = async () => {
    const [rows] = await db.query('SELECT * FROM food_items ORDER BY id DESC');
    return rows;
};

// Get food item by ID
const getFoodItemById = async (id) => {
    const [rows] = await db.query('SELECT * FROM food_items WHERE id = ?', [id]);
    return rows[0];
};

// Update a food item
const updateFoodItem = async (id, name, cost, ingredients, image) => {
    const [result] = await db.query(
        'UPDATE food_items SET name = ?, cost = ?, ingredients = ?, image = ? WHERE id = ?',
        [name, cost, ingredients, image, id]
    );
    return result;
};

// Delete a food item
const deleteFoodItem = async (id) => {
    const [result] = await db.query('DELETE FROM food_items WHERE id = ?', [id]);
    return result;
};

// Sync FoodItems
const syncFoodItems = async (id, name, cost, ingredients, isEdit) => {
    try {
        if (isEdit) {
            const query = `
                UPDATE food_items
                SET name = ?, cost = ?, ingredients = ?,
                WHERE id = ?`;

            const [result] = await db.query(query, [name, cost, ingredients, id]);

            if (result.affectedRows === 0) {
                throw new Error(`No food item found with id ${id} to update.`);
            }
            return result;
        } else {
            const query = `
                INSERT INTO food_items (name, cost, ingredients)
                VALUES (?, ?, ?)`;

            const [result] = await db.query(query, [name, cost, ingredients]);
            return result;
        }
    } catch (err) {
        console.error('Error syncing data:', err.message);
        throw new Error(err.message);
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
