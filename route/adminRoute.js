const express = require('express');
const authenticate = require('../middleware/authenticate');
const adminController = require('../controller/adminController');
const roomController = require('../controller/roomController');
const upload = require('../middleware/upload');

const router = express.Router();

//CREATE
router.post(
  '/room/create',
  authenticate,
  upload.single('roomImage'),
  roomController.createRoom
);
//UPDATE
router.patch(
  '/edit/:id',
  authenticate,
  upload.single('roomImage'),
  adminController.editRoom
);
//DELETE
router.delete(
  '/deleteBooking/:id',
  authenticate,
  adminController.deleteBooking
);
//GET ROOM AND BOOKING
router.get('/getAllRoom', authenticate, adminController.getAllRoom);
router.get('/getAllBooking', authenticate, adminController.getAllBooking);

module.exports = router;
