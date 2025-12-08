import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './DashboardPage.css';

export function DashboardPage() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // If user is not logged in, redirect to login
    if (!user) {
      navigate('/login');
      return;
    }

    // Fetch user's bookings from backend
    const fetchUserBookings = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/bookings/user/${user.id}`);
        const data = await response.json();

        if (response.ok) {
          console.log('Bookings data:', data);
          // Map bookings to events for display
          setRegisteredEvents(data);
        } else {
          setError(data.error || 'Failed to fetch bookings');
        }
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to connect to server');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserBookings();
  }, [user, navigate]);

  return (
    <div className="dashboard-page">
      <h1>My Dashboard</h1>
      <p className="subtitle">Your registered events</p>
      
      <div className="dashboard-container">
        {isLoading ? (
          <div className="loading-state">
            <p>Loading your bookings...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <h2>Error</h2>
            <p>{error}</p>
          </div>
        ) : registeredEvents.length === 0 ? (
          <div className="empty-state">
            <h2>No events registered yet</h2>
            <p>You haven't registered for any events. Browse available events and register to see them here.</p>
            <a href="/" className="link">Browse Events</a>
          </div>
        ) : (
          <div className="events-grid">
            {registeredEvents.map((booking) => {
              const eventData = booking.event || booking.Event;
              return (
                <div key={booking.id} className="dashboard-card">
                  <h3>{eventData?.title || 'Event Title'}</h3>
                  <p><strong>Date:</strong> {eventData?.date || 'Date TBA'}</p>
                  <p><strong>Time:</strong> {eventData?.time || 'Time TBA'}</p>
                  <p><strong>Location:</strong> {eventData?.location || 'Location TBA'}</p>
                  <p><strong>Status:</strong> {booking.status || 'pending'}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
