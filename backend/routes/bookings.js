const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/', bookingController.registerForEvent);
router.get('/user/:userId', bookingController.getUserBookings);
router.get('/event/:eventId', bookingController.getEventBookings);
router.put('/:id', bookingController.updateBooking);
router.delete('/:id', bookingController.cancelBooking);

module.exports = router;
