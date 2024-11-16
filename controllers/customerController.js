const Customer = require('../models/customerModel');

// Create a new customer
const createCustomer = async (req, res) => {
    const { name, email, phone, address } = req.body;

    try {
        const result = await Customer.createCustomer(name, email, phone, address);
        res.status(201).json({ message: 'Customer created successfully', customerId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating customer', error: error.message });
    }
};

// Get all customers
const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.getAllCustomers();
        res.status(200).json({ customers });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching customers', error: error.message });
    }
};

// Update a customer
const updateCustomer = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;

    try {
        const result = await Customer.updateCustomer(id, name, email, phone, address);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating customer', error: error.message });
    }
};

// Delete a customer
const deleteCustomer = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Customer.deleteCustomer(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting customer', error: error.message });
    }
};

// Get customer by ID
const getCustomerById = async (req, res) => {
    const { id } = req.params;

    try {
        const customer = await Customer.getCustomerById(id);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.status(200).json({ customer });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching customer', error: error.message });
    }
};

module.exports = {
    createCustomer,
    getAllCustomers,
    updateCustomer,
    deleteCustomer,
    getCustomerById,
};
