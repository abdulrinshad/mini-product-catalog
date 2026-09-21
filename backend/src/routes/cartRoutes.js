const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { getCart, addToCart, updateCartItem, removeFromCart } = require('../controllers/cartController');

// Require JWT authentication for all cart routes
router.use(protect);

router.get('/', getCart);
router.post('/', addToCart);
router.patch('/:id', updateCartItem);
router.delete('/:id', removeFromCart);

module.exports = router;

