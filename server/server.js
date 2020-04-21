const express = require('express');
const morgan = require('morgan');
const { getSeats, handleSeatBooking } = require('./handlers');

const PORT = 5678;

var app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(require('./routes'));

//all seats in DB
// app.get('/api/seat-availability', getSeats)
//update seat availability;
//


const server = app.listen(PORT, function () {
  console.info('🌍 Listening on port ' + server.address().port);
});
