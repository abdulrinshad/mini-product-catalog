const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const connectDB = require('../config/db');
const Product = require('../models/Product');

const products = [
  {
    id: 1,
    name: 'Wireless Mouse',
    category: 'Accessories',
    price: 599,
    stock: 25,
    image: '/images/wireless-mouse.png',
  },
  {
    id: 2,
    name: 'Wireless Mechanical Keyboard',
    category: 'Accessories',
    price: 2499,
    stock: 10,
    image: '/images/mechanical-keyboard.png',
  },
  {
    id: 3,
    name: 'Bluetooth Headphones',
    category: 'Audio',
    price: 1899,
    stock: 15,
    image: '/images/bluetooth-headphones.png',
  },
  {
    id: 4,
    name: 'USB-C Hub 7-in-1',
    category: 'Accessories',
    price: 999,
    stock: 30,
    image: '/images/usb-c-hub.png',
  },
  {
    id: 5,
    name: 'Adjustable Laptop Stand',
    category: 'Office',
    price: 799,
    stock: 20,
    image: '/images/laptop-stand.png',
  },
  {
    id: 6,
    name: '1080p HD Webcam',
    category: 'Audio',
    price: 1499,
    stock: 0,
    image: '/images/webcam.png',
  },
  {
    id: 7,
    name: 'Portable SSD 1TB',
    category: 'Storage',
    price: 5999,
    stock: 8,
    image: '/images/portable-ssd.png',
  },
  {
    id: 8,
    name: 'LED Desk Lamp with Touch Control',
    category: 'Office',
    price: 649,
    stock: 40,
    image: '/images/desk-lamp.png',
  },
  {
    id: 9,
    name: '20W Fast Phone Charger',
    category: 'Accessories',
    price: 399,
    stock: 50,
    image: '/images/phone-charger.png',
  },
  {
    id: 10,
    name: 'Smart Watch Pro',
    category: 'Wearables',
    price: 3499,
    stock: 12,
    image: '/images/smart-watch.png',
  },
  {
    id: 11,
    name: 'Noise Cancelling Earbuds',
    category: 'Audio',
    price: 2999,
    stock: 18,
    image: '/images/noise-cancelling-earbuds.png',
  },
  {
    id: 12,
    name: 'External Hard Drive 2TB',
    category: 'Storage',
    price: 4499.5,
    stock: 6,
    image: '/images/external-hard-drive.png',
  },
  {
    id: 13,
    name: 'Ergonomic Office Chair',
    category: 'Office',
    price: 8999,
    stock: 4,
    image: '/images/office-chair.png',
  },
  {
    id: 14,
    name: 'Fitness Tracker Band',
    category: 'Wearables',
    price: 1299,
    stock: 22,
    image: '/images/fitness-tracker.png',
  },
  {
    id: 15,
    name: 'Wired Gaming Mouse',
    category: 'Accessories',
    price: 799,
    stock: 0,
    image: '/images/gaming-mouse.png',
  },
];

const seedProducts = async () => {
  try {
    await connectDB();
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Database seeded successfully with 15 products!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seedProducts();
