const UUID_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

const cartSession = (req, res, next) => {
  const rawSessionId = req.get('X-Cart-Session');
  const sessionId = rawSessionId ? rawSessionId.trim() : '';

  if (!sessionId) {
    return res.status(400).json({
      message: 'Cart session ID is required',
    });
  }

  if (!UUID_REGEX.test(sessionId)) {
    return res.status(400).json({
      message: 'Invalid cart session ID',
    });
  }

  req.cartSessionId = sessionId;
  next();
};

module.exports = cartSession;
