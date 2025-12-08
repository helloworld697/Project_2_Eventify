// API service for Eventify
// Placeholder functions for future backend integration

export const getEvents = async () => {
  // TODO: Replace with actual API call
  // return fetch('/api/events').then(res => res.json());
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'React Workshop', date: '2025-12-15', description: 'Learn React basics' },
        { id: 2, title: 'Web Development Meetup', date: '2025-12-20', description: 'Networking event' },
        { id: 3, title: 'JavaScript Conference', date: '2025-12-28', description: 'Three-day conference' }
      ]);
    }, 500);
  });
};

export const getEventById = async (id) => {
  // TODO: Replace with actual API call
  // return fetch(`/api/events/${id}`).then(res => res.json());
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id,
        title: 'React Workshop',
        date: '2025-12-15',
        time: '10:00 AM - 5:00 PM',
        location: 'Tech Hub, Downtown',
        description: 'Learn React basics and advanced patterns in this hands-on workshop.'
      });
    }, 300);
  });
};

export const loginUser = async (email, password) => {
  // TODO: Replace with actual API call
  // return fetch('/api/auth/login', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ email, password })
  // }).then(res => res.json());
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Login successful',
        user: { id: 1, email, name: 'User' }
      });
    }, 500);
  });
};

export const getUserBookings = async (userId) => {
  // TODO: Replace with actual API call
  // return fetch(`/api/users/${userId}/bookings`).then(res => res.json());
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 300);
  });
};
