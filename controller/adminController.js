const { User, Room, Booking } = require('../models');
const AppError = require('../utils/appError');
const cloudinary = require('../utils/cloudinary');
const { getRoomById } = require('./roomController');
const fs = require('fs');

exports.createRoom = async (req, res, next) => {
  try {
  } catch (err) {}
};
exports.deleteBooking = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.params;
    if (user.role !== 'admin') {
      throw new AppError('you are not admin', 400);
    }
    const deleteBooking = await Booking.findOne({ where: { id: id } });
    if (!deleteBooking) {
      throw new AppError('cannot delete Booking');
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
exports.getAllRoom = async (req, res, next) => {
  try {
    const user = req.user;
    const allRoom = await Room.findAll();
    res.status(200).json({ allRoom: allRoom });
  } catch (err) {}
};
exports.getAllBooking = async (req, res, next) => {
  try {
    const user = req.user;
    const allBooking = await Booking.findAll({
      include: [{ model: Room }, { model: User }]
    });
    res.status(200).json({ allBooking: allBooking });
  } catch (err) {}
};

exports.editRoom = async (req, res, next) => {
  try {
    const updateValue = req.body;
    const file = req.file;
    const roomById = await Room.findOne({
      where: { id: Number(req.params.id) }
    });
    console.log(
      '---------------------------------------------------',
      roomById
    );
    if (file) {
      const secureUrl = await cloudinary.upload(
        file.path,
        roomById.roomImage ? cloudinary.getPublicId(roomById.roomImage) : null
      );
      updateValue.roomImage = secureUrl;
      fs.unlinkSync(file.path);
    }
    console.log('----------------', updateValue);
    await Room.update(updateValue, { where: { id: req.params.id } });
    const room = await Room.findOne({
      where: { id: req.params.id }
    });
    res.status(200).json({ room });
  } catch (err) {
    next(err);
  }
};
