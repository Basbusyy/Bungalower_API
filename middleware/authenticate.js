const AppError = require('../utils/appError');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer')) {
      throw new AppError('unauthenticated 1', 401);
    }
    const token = authorization.split(' ')[1];
    if (!token) {
      throw new AppError('unauthenticated 2', 401);
    }

    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || 'private_key'
    );
    
    const user = await User.findOne({
      where: { id: payload.id },
      attributes: { exclude: 'password' }
    });
    if (!user) {
      throw new AppError('unauthenticated 3', 401);
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
