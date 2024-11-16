const express = require('express');
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');
const {
    createCustomer,
    getAllCustomers,
    updateCustomer,
    deleteCustomer,
    getCustomerById,
} = require('../controllers/customerController');

const router = express.Router();

// Create a new customer (admin only)
router.post('/create', authMiddleware, adminMiddleware, createCustomer);

// Get all customers (admin only)
router.get('/', authMiddleware, adminMiddleware, getAllCustomers);

// Update a customer (admin only)
router.put('/update/:id', authMiddleware, adminMiddleware, updateCustomer);

// Delete a customer (admin only)
router.delete('/delete/:id', authMiddleware, adminMiddleware, deleteCustomer);

// Get customer by ID (admin only)
router.get('/:id', authMiddleware, adminMiddleware, getCustomerById);

module.exports = router;
