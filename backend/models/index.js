const User = require('./User');
const Event = require('./Event');
const Booking = require('./Booking');

// Define relationships
User.hasMany(Booking, { foreignKey: 'userId', as: 'bookings' });
Booking.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Event.hasMany(Booking, { foreignKey: 'eventId', as: 'bookings' });
Booking.belongsTo(Event, { foreignKey: 'eventId', as: 'event' });

module.exports = {
  User,
  Event,
  Booking,
};
