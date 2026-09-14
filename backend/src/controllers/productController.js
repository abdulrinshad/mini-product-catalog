const Product = require('../models/Product');

// Helper function to safely escape special regular expression characters
const escapeRegex = (text) => {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// Get all products with search, filter, and sort capabilities
const getProducts = async (req, res) => {
  try {
    const { search, minPrice, maxPrice, sort, category } = req.query;

    const filter = {};

    // Filter by Category (exact match against DB category field)
    if (category !== undefined && category !== '' && category !== 'All') {
      filter.category = String(category).trim();
    }

    // Search by product name (case-insensitive & safely escaped)
    if (search !== undefined && search !== '') {
      const sanitizedSearch = escapeRegex(String(search).trim());
      filter.name = { $regex: sanitizedSearch, $options: 'i' };
    }

    let parsedMinPrice;
    let parsedMaxPrice;

    // Validate minPrice
    if (minPrice !== undefined && minPrice !== '') {
      parsedMinPrice = Number(minPrice);
      if (isNaN(parsedMinPrice)) {
        return res.status(400).json({ message: 'Invalid minPrice parameter. Must be a valid number.' });
      }
      if (parsedMinPrice < 0) {
        return res.status(400).json({ message: 'minPrice cannot be negative.' });
      }
      filter.price = { ...filter.price, $gte: parsedMinPrice };
    }

    // Validate maxPrice
    if (maxPrice !== undefined && maxPrice !== '') {
      parsedMaxPrice = Number(maxPrice);
      if (isNaN(parsedMaxPrice)) {
        return res.status(400).json({ message: 'Invalid maxPrice parameter. Must be a valid number.' });
      }
      if (parsedMaxPrice < 0) {
        return res.status(400).json({ message: 'maxPrice cannot be negative.' });
      }
      filter.price = { ...filter.price, $lte: parsedMaxPrice };
    }

    // Validate minPrice vs maxPrice range
    if (
      parsedMinPrice !== undefined &&
      parsedMaxPrice !== undefined &&
      parsedMinPrice > parsedMaxPrice
    ) {
      return res.status(400).json({ message: 'minPrice cannot be greater than maxPrice.' });
    }

    // Sorting options
    let sortOptions = {};
    if (sort === 'price_asc') {
      sortOptions.price = 1;
    } else if (sort === 'price_desc') {
      sortOptions.price = -1;
    }

    const products = await Product.find(filter).sort(sortOptions);

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      message: 'Server error while fetching products',
    });
  }
};

module.exports = {
  getProducts,
};
