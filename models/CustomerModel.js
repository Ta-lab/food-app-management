const db = require('../config/db');

// Create a new customer
const createCustomer = async (name, email, phone, address) => {
    const [result] = await db.query(
        'INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)',
        [name, email, phone, address]
    );
    return result;
};

// Get all customers
const getAllCustomers = async () => {
    const [rows] = await db.query('SELECT * FROM customers ORDER BY id DESC');
    return rows;
};

// Update a customer
const updateCustomer = async (id, name, email, phone, address) => {
    const [result] = await db.query(
        'UPDATE customers SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
        [name, email, phone, address, id]
    );
    return result;
};

// Delete a customer
const deleteCustomer = async (id) => {
    const [result] = await db.query('DELETE FROM customers WHERE id = ?', [id]);
    return result;
};

// Get customer by ID
const getCustomerById = async (id) => {
    const [rows] = await db.query('SELECT * FROM customers WHERE id = ?', [id]);
    return rows[0];
};

module.exports = {
    createCustomer,
    getAllCustomers,
    updateCustomer,
    deleteCustomer,
    getCustomerById,
};
