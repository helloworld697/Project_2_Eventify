const { Booking, Event, User } = require('../models');

exports.registerForEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    if (!userId || !eventId) {
      return res.status(400).json({ error: 'userId and eventId required' });
    }

    // Check  registered
    const existingBooking = await Booking.findOne({
      where: { userId, eventId },
    });

    if (existingBooking) {
      return res.status(400).json({ error: 'User already registered for this event' });
    }

    const booking = await Booking.create({
      userId,
      eventId,
      status: 'registered',
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { userId: req.params.userId },
      include: [{ association: 'event' }],
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEventBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { eventId: req.params.eventId },
      include: [{ association: 'user' }],
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    await booking.update({ status: 'cancelled' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    await booking.update(req.body);
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
