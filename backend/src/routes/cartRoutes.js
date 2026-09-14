const express = require('express');
const router = express.Router();
const cartSession = require('../middleware/cartSession');
const { getCart, addToCart, updateCartItem, removeFromCart } = require('../controllers/cartController');

// Apply cartSession middleware to all cart routes
router.use(cartSession);

router.get('/', getCart);
router.post('/', addToCart);
router.patch('/:id', updateCartItem);
router.delete('/:id', removeFromCart);

module.exports = router;
