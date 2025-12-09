const { Event } = require('../models');

const sampleEvents = [
  {
    title: 'React Workshop',
    description: 'Learn React basics and advanced patterns in this hands-on workshop.',
    date: new Date('2025-12-15'),
    time: '10:00 AM - 5:00 PM',
    location: 'Tech Hub, Downtown',
    capacity: 50,
    image_url: null,
  },
  {
    title: 'Web Development Meetup',
    description: 'Join developers from around the city for networking and talks.',
    date: new Date('2025-12-20'),
    time: '6:00 PM - 9:00 PM',
    location: 'Coffee & Code, Center Square',
    capacity: 100,
    image_url: null,
  },
  {
    title: 'JavaScript Conference',
    description: 'Three days of talks covering the latest in JavaScript ecosystem.',
    date: new Date('2025-12-28'),
    time: '9:00 AM - 6:00 PM',
    location: 'Convention Center',
    capacity: 500,
    image_url: null,
  },
];

async function seedEvents() {
  try {
    await Event.bulkCreate(sampleEvents);
    console.log('Events seeded successfully!');
  } catch (error) {
    console.error('Error seeding events:', error);
  }
}

module.exports = seedEvents;
