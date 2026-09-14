const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const connectDB = require('../config/db');
const Product = require('../models/Product');

const imageUpdates = [
  { id: 1, image: '/images/wireless-mouse.png' },
  { id: 2, image: '/images/mechanical-keyboard.png' },
  { id: 3, image: '/images/bluetooth-headphones.png' },
  { id: 4, image: '/images/usb-c-hub.png' },
  { id: 5, image: '/images/laptop-stand.png' },
  { id: 6, image: '/images/webcam.png' },
  { id: 7, image: '/images/portable-ssd.png' },
  { id: 8, image: '/images/desk-lamp.png' },
  { id: 9, image: '/images/phone-charger.png' },
  { id: 10, image: '/images/smart-watch.png' },
  { id: 11, image: '/images/noise-cancelling-earbuds.png' },
  { id: 12, image: '/images/external-hard-drive.png' },
  { id: 13, image: '/images/office-chair.png' },
  { id: 14, image: '/images/fitness-tracker.png' },
  { id: 15, image: '/images/gaming-mouse.png' },
];

const updateProductImages = async () => {
  try {
    await connectDB();
    for (const item of imageUpdates) {
      await Product.updateOne({ id: item.id }, { $set: { image: item.image } });
    }
    console.log('Successfully updated image paths to transparent PNGs for all 15 products in MongoDB!');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Update failed:', error.message);
    process.exit(1);
  }
};

updateProductImages();
