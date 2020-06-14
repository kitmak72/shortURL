const jwt = require('jsonwebtoken');

function retrieveUserFromToken(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ success: false, message: 'Invalid token' });
    }

    req.user = decoded;
    return next();
  });
}

function ensureAuthenticated(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Unauthorized access' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ success: false, message: 'Invalid token' });
    }

    req.user = decoded;
    return next();
  });
}

module.exports = { ensureAuthenticated, retrieveUserFromToken };
