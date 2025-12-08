import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Button } from '../components/ui/Button';
import './EventDetailsPage.css';

export function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [event, setEvent] = useState(null);
  const [isLoadingEvent, setIsLoadingEvent] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Fetch event details from backend
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoadingEvent(true);
        const response = await fetch(`http://localhost:5000/api/events/${id}`);
        const data = await response.json();

        if (response.ok) {
          setEvent(data);
          setLoadError('');
        } else {
          setLoadError(data.error || 'Failed to load event');
        }
      } catch (err) {
        console.error('Error fetching event:', err);
        setLoadError('Failed to connect to server');
      } finally {
        setIsLoadingEvent(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  const handleRegister = async () => {
    // Check if user is logged in
    if (!user) {
      setError('Please log in first to register for events');
      alert('Please log in first to register for events');
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          eventId: parseInt(id),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsRegistered(true);
        alert(`Successfully registered for ${event.title}!`);
      } else {
        setError(data.error || 'Failed to register for event');
        alert(data.error || 'Failed to register for event');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Failed to connect to server. Make sure backend is running.');
      alert('Failed to connect to server');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="event-details-page">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Back to Events
      </button>

      {isLoadingEvent ? (
        <div className="loading-state">
          <p>Loading event details...</p>
        </div>
      ) : loadError ? (
        <div className="error-state">
          <h2>Error</h2>
          <p>{loadError}</p>
          <Button variant="primary" onClick={() => navigate('/')}>
            Back to Events
          </Button>
        </div>
      ) : event ? (
        <div className="event-details">
          <h1>{event.title}</h1>
          
          <div className="event-info">
            <div className="info-item">
              <span className="label">Date:</span>
              <span>{event.date}</span>
            </div>
            <div className="info-item">
              <span className="label">Time:</span>
              <span>{event.time || 'Time TBA'}</span>
            </div>
            <div className="info-item">
              <span className="label">Location:</span>
              <span>{event.location || 'Location TBA'}</span>
            </div>
            <div className="info-item">
              <span className="label">Capacity:</span>
              <span>{event.capacity} attendees</span>
            </div>
          </div>

          <div className="event-description">
            <h2>About this event</h2>
            <p>{event.description}</p>
          </div>

          <div className="event-actions">
            {!isRegistered ? (
              <Button variant="primary" onClick={handleRegister} disabled={isSubmitting}>
                {isSubmitting ? 'Registering...' : 'Register Now'}
              </Button>
            ) : (
              <Button variant="secondary" disabled>
                ✓ Registered
              </Button>
            )}
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
          </div>
        </div>
      ) : (
        <div className="error-state">
          <p>Event not found</p>
        </div>
      )}
    </div>
  );
}
