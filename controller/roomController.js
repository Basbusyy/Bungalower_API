const { Room } = require('../models');
const AppError = require('../utils/appError');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

exports.createRoom = async (req, res, next) => {
  try {
    const { currentPrice, desc, status } = req.body;
    console.log('CREATE ROOM', req.body);
    if (!currentPrice) {
      throw new AppError('currentPrice is required', 400);
    }
    if (!desc) {
      throw new AppError('Description is required', 400);
    }
    const data = { currentPrice, desc, status };
    // if (!roomImage) {
    //   throw new AppError('RoomImage is required', 400);
    // }
    // if (desc && desc.trim()) {
    //   data.desc = desc;
    // }
    console.log(req.file);
    if (req.file) {
      data.roomImage = await cloudinary.upload(req.file.path);
    }
    console.log(data);
    const newRoom = await Room.create(data);
    const room = await Room.findOne({ where: { id: newRoom.id } });
    res.status(200).json({ room });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.getRoom = async (req, res, next) => {
  const rooms = await Room.findAll();
  res.status(200).json({rooms});
};

exports.getRoomById = async (req, res, next) => {
  // console.log(req.user);
  const rooms = await Room.findOne({ where: req.user.id });
  res.status(200).json();
};
exports.addRoom = async (req, res) => {
  try {
    const newroom = new Room(req.body);
    await newroom.save();
    res.send('New Room Added Success');
  } catch (error) {}
};
