const validator = require('validator');
const { Booking, User, Room } = require('../models');
const AppError = require('../utils/appError');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');
const { userInfo } = require('os');

exports.createBooking = async (req, res, next) => {
  try {
    const { checkIn, checkOut, email, phone, roomId, userId } = req.body;
    if (req.file) {
      paymentImage = await cloudinary.upload(req.file.path);
    }
    if (!email) {
      throw new AppError('email address is required', 400);
    }
    if (!checkIn) {
      throw new AppError('checkin is required', 400);
    }
    if (!checkOut) {
      throw new AppError('checkout is required', 400);
    }
    if (!phone) {
      throw new AppError('phone is required', 400);
    }
    if (!paymentImage) {
      throw new AppError('paymentimage is required', 400);
    }
    const isEmail = validator.isEmail(email + '');

    if (!isEmail) {
      throw new AppError('emaill address is invalid format', 400);
    }
    if (!roomId) {
      throw new AppError('room is not match', 400);
    }
    if (!userId) {
      throw new AppError('userId is not match', 400);
    }
    console.log(req.user);
    const booking = await Booking.create({
      checkIn,
      checkOut,
      email: isEmail,
      phone,
      paymentImage,
      roomId,
      userId
    });

    res.status(201).json({ booking });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.getBookingByUserId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findAll({
      where: { userId: id },
      include: [{ model: Room }, { model: User }],
      order: [['createdAt', 'DESC']]
    });
    res.status(201).json({ booking });
  } catch (err) {
    next(err);
  }
};

exports.deleteBookingByUesrId = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const deleteBooking = await Booking.findOne({ where: { id: id } });
    if (!deleteBooking) {
      throw new AppError('Cancel Booking is not Success');
    }
    await deleteBooking.destroy();
    const allBooking = await Booking.findAll({
      include: [{ model: Room }, { model: User }]
    });
    res
      .status(200)
      .json({ message: 'Cancel Booking Success', allBookings: allBooking });
  } catch (err) {
    next(err);
  }
};
