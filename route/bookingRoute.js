const express = require('express');
const bookingController = require('../controller/bookingController');
const upload = require('../middleware/upload');
const router = express.Router();

// CREATE BOOKING
router.post(
  '/',
  upload.single('paymentImage'),
  bookingController.createBooking
);
// DELETE BOOKING
router.delete('/:id', bookingController.deleteBookingByUesrId);

//GET ALL BOOKING FROM USER ID
router.get('/:id', bookingController.getBookingByUserId);
module.exports = router;
