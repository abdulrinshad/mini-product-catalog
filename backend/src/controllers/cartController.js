const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get cart with populated product details and calculated totals
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ sessionId: req.cartSessionId });

    if (!cart || !cart.items || cart.items.length === 0) {
      return res.status(200).json({
        items: [],
        totalPrice: 0,
      });
    }

    // Fetch referenced products from MongoDB
    const productIds = cart.items.map((item) => item.productId);
    const products = await Product.find({ id: { $in: productIds } });

    // Map products by their numeric id for quick lookup
    const productMap = new Map();
    products.forEach((product) => {
      productMap.set(product.id, product);
    });

    let totalPrice = 0;
    const items = [];

    for (const item of cart.items) {
      const product = productMap.get(item.productId);
      // Skip missing products safely
      if (!product) {
        continue;
      }

      const subtotal = product.price * item.quantity;
      totalPrice += subtotal;

      items.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        stock: product.stock,
        quantity: item.quantity,
        subtotal,
      });
    }

    return res.status(200).json({
      items,
      totalPrice,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Server error while fetching cart',
    });
  }
};

// Add a product to the cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validate productId
    if (productId === undefined || typeof productId !== 'number' || isNaN(productId)) {
      return res.status(400).json({ message: 'productId is required and must be a valid number' });
    }

    // Validate quantity
    if (
      quantity === undefined ||
      typeof quantity !== 'number' ||
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      return res.status(400).json({
        message: 'quantity is required and must be a positive integer greater than 0',
      });
    }

    // Find product in database
    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if product is out of stock
    if (product.stock === 0) {
      return res.status(400).json({ message: 'Product is out of stock' });
    }

    // Find or create session-specific cart document
    let cart = await Cart.findOne({ sessionId: req.cartSessionId });
    if (!cart) {
      cart = new Cart({ sessionId: req.cartSessionId, items: [] });
    }

    // Check if item already exists in cart
    const itemIndex = cart.items.findIndex((item) => item.productId === productId);

    if (itemIndex > -1) {
      // Item already in cart: update quantity
      const totalQuantity = cart.items[itemIndex].quantity + quantity;
      if (totalQuantity > product.stock) {
        return res.status(400).json({
          message: `Cannot add requested quantity. Total quantity in cart (${totalQuantity}) would exceed available stock (${product.stock}).`,
        });
      }
      cart.items[itemIndex].quantity = totalQuantity;
    } else {
      // Item not in cart: check stock and add
      if (quantity > product.stock) {
        return res.status(400).json({
          message: `Requested quantity (${quantity}) exceeds available stock (${product.stock}).`,
        });
      }
      cart.items.push({ productId, quantity });
    }

    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({
      message: 'Server error while adding item to cart',
    });
  }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
  try {
    const productId = Number(req.params.id);
    const { quantity } = req.body;

    // Validate productId parameter
    if (isNaN(productId) || !Number.isInteger(productId) || productId <= 0) {
      return res.status(400).json({ message: 'Invalid product ID parameter' });
    }

    // Validate quantity
    if (
      quantity === undefined ||
      typeof quantity !== 'number' ||
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      return res.status(400).json({
        message: 'quantity is required and must be a positive integer greater than 0',
      });
    }

    // Find existing session cart
    const cart = await Cart.findOne({ sessionId: req.cartSessionId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find cart item
    const itemIndex = cart.items.findIndex((item) => item.productId === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Product is not in cart' });
    }

    // Find product in database
    const product = await Product.findOne({ id: productId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check stock availability
    if (quantity > product.stock) {
      return res.status(400).json({
        message: `Requested quantity (${quantity}) exceeds available stock (${product.stock}).`,
      });
    }

    // Update cart item quantity
    cart.items[itemIndex].quantity = quantity;

    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({
      message: 'Server error while updating cart item',
    });
  }
};

// Remove a product from the cart
const removeFromCart = async (req, res) => {
  try {
    const productId = Number(req.params.id);

    // Validate productId parameter
    if (isNaN(productId) || !Number.isInteger(productId) || productId <= 0) {
      return res.status(400).json({ message: 'Invalid product ID parameter' });
    }

    // Find existing session cart
    const cart = await Cart.findOne({ sessionId: req.cartSessionId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find cart item
    const itemIndex = cart.items.findIndex((item) => item.productId === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Product is not in cart' });
    }

    // Remove item from cart.items
    cart.items.splice(itemIndex, 1);

    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({
      message: 'Server error while removing item from cart',
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
};
