const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middlewares/authMiddleware');
const FoodItemController = require('../controllers/foodItemController');
const upload = require('../middlewares/fileUploadMiddleware');

router.post('/food-items', authMiddleware, adminMiddleware, upload.single('image'), FoodItemController.createFoodItem);
router.get('/food-items', authMiddleware, adminMiddleware, FoodItemController.getAllFoodItems);
router.get('/food-items/:id', authMiddleware, adminMiddleware, FoodItemController.getFoodItemById);
router.put('/food-items/:id', authMiddleware, adminMiddleware, upload.single('image'), FoodItemController.updateFoodItem);
router.delete('/food-items/:id', authMiddleware, adminMiddleware, FoodItemController.deleteFoodItem);

router.post('/sync', authMiddleware, adminMiddleware, FoodItemController.syncFoodItems);




module.exports = router;
