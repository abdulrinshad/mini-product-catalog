const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Helper function for HTTP requests with error handling
 */
const request = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });
  
  if (!response.ok) {
    let errorMsg = `Server error (${response.status})`;
    try {
      const errorData = await response.json();
      if (errorData && errorData.message) {
        errorMsg = errorData.message;
      }
    } catch (_) {
      // Ignore JSON parsing failure for non-JSON error responses
    }
    throw new Error(errorMsg);
  }

  return response.json();
};

/**
 * Fetch products from GET /products with optional params: { search, minPrice, maxPrice, sort }
 */
export const getProducts = async (params = {}) => {
  const queryParams = new URLSearchParams();

  if (params.category && typeof params.category === 'string' && params.category.trim() && params.category !== 'All') {
    queryParams.append('category', params.category.trim());
  }
  if (params.search && typeof params.search === 'string' && params.search.trim()) {
    queryParams.append('search', params.search.trim());
  }
  if (params.minPrice !== undefined && params.minPrice !== '' && params.minPrice !== null) {
    queryParams.append('minPrice', params.minPrice);
  }
  if (params.maxPrice !== undefined && params.maxPrice !== '' && params.maxPrice !== null) {
    queryParams.append('maxPrice', params.maxPrice);
  }
  if (params.sort && params.sort !== '' && params.sort !== 'recommended') {
    queryParams.append('sort', params.sort);
  }

  const queryString = queryParams.toString();
  const endpoint = `/products${queryString ? `?${queryString}` : ''}`;

  return request(endpoint);
};

export const fetchProducts = getProducts;

/**
 * Helper function to retrieve or generate a persistent guest cart session ID
 */
export const getCartSessionId = () => {
  const key = 'cartSessionId';

  let sessionId = localStorage.getItem(key);

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(key, sessionId);
  }

  return sessionId;
};

/**
 * Helper function to generate cart headers containing X-Cart-Session
 */
const getCartHeaders = () => ({
  'Content-Type': 'application/json',
  'X-Cart-Session': getCartSessionId(),
});

// Cart API functions
export const getCart = async () => {
  return request('/cart', {
    headers: getCartHeaders(),
  });
};
export const fetchCart = getCart;

export const addToCart = async (productId, quantity = 1) => {
  return request('/cart', {
    method: 'POST',
    headers: getCartHeaders(),
    body: JSON.stringify({ productId, quantity }),
  });
};
export const addItemToCart = addToCart;

export const updateCartItem = async (productId, quantity) => {
  return request(`/cart/${productId}`, {
    method: 'PATCH',
    headers: getCartHeaders(),
    body: JSON.stringify({ quantity }),
  });
};
export const updateCartItemQuantity = updateCartItem;

export const removeFromCart = async (productId) => {
  return request(`/cart/${productId}`, {
    method: 'DELETE',
    headers: getCartHeaders(),
  });
};
export const removeItemFromCart = removeFromCart;

export default {
  getCartSessionId,
  getProducts,
  fetchProducts,
  getCart,
  fetchCart,
  addToCart,
  addItemToCart,
  updateCartItem,
  updateCartItemQuantity,
  removeFromCart,
  removeItemFromCart,
};
