const express = require('express');
const router = express.Router();
const FoodItemController = require('../controllers/foodItemController');
const upload = require('../middlewares/fileUploadMiddleware');

router.post('/food-items', upload.single('image'), FoodItemController.createFoodItem);
router.get('/food-items', FoodItemController.getAllFoodItems);
router.get('/food-items/:id', FoodItemController.getFoodItemById);
router.put('/food-items/:id', upload.single('image'), FoodItemController.updateFoodItem);
router.delete('/food-items/:id', FoodItemController.deleteFoodItem);



module.exports = router;
