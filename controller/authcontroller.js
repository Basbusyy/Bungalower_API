const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const AppError = require('../utils/appError');
const { User } = require('../models');

const genToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY || 'private_key', {
    expiresIn: process.env.JWT_EXPIRES || '5d'
  });

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, userName, email, password, confirmPassword } =
      req.body;
    if (!email) {
      throw new AppError('email address is required', 400);
    }
    if (!password) {
      throw new AppError('password is required', 400);
    }
    if (!userName) {
      throw new AppError('username is required', 400);
    }
    if (!password) {
      throw new AppError('password is required', 400);
    }
    if (password !== confirmPassword) {
      throw new AppError('password and confirm password is not match', 400);
    }
    const isEmail = validator.isEmail(email + '');

    if (!isEmail) {
      throw new AppError('email address is invalid format', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword
    });

    const token = genToken({ id: user.id });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    if (!userName || typeof password !== 'string') {
      throw new AppError('username or password is invalid', 400);
    }
    const user = await User.findOne({ where: { userName } });

    if (!user) {
      throw new AppError('username or password is invalid ', 400);
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      throw new AppError('username or password is invalid', 400);
    }
    const token = genToken({ id: user.id });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (err) {
    next(err);
  }
};

// exports.updateUser = async (req, res, next) => {
//   try {
//     const user = req.user
//     const {}
//   } catch (err) {
//     next(err);
//   }
// };
