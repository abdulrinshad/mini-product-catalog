const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model('Cart', cartSchema);

// Safely attempt to drop legacy sessionId_1 index if present in MongoDB collection
Cart.on('index', async (error) => {
  if (error) {
    console.error('Cart index build error:', error.message);
  }
  try {
    const indexes = await Cart.collection.indexes();
    const hasSessionIdIndex = indexes.some((idx) => idx.name === 'sessionId_1');
    if (hasSessionIdIndex) {
      console.log('Found obsolete index sessionId_1 on carts collection. Dropping index...');
      await Cart.collection.dropIndex('sessionId_1');
      console.log('Successfully dropped obsolete index sessionId_1.');
    }
  } catch (_) {
    // Ignore index error if collection does not exist yet
  }
});

module.exports = Cart;
