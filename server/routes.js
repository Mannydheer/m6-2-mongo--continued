const router = require('express').Router();
const { getSeats, handleSeatBooking } = require('./handlers');

//

router.get('/api/seat-availability', getSeats)

//

router.put('/api/book-seat', handleSeatBooking)


module.exports = router;
