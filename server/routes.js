const router = require('express').Router();
const { getSeats, handleSeatBooking, handleDeleteSeating, getUsers, handleUpdateEmail } = require('./handlers');

//
router.get('/api/seat-availability', getSeats)
//get all users
router.get('/api/get-all-users', getUsers)
//
router.put('/api/book-seat', handleSeatBooking)
//
router.put('/api/delete-seat', handleDeleteSeating)
//put to update email.
router.put('/api/update-email', handleUpdateEmail)

module.exports = router;
