import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { EventCard } from '../components/ui/EventCard';
import { InputField } from '../components/ui/InputField';
import { Button } from '../components/ui/Button';
import './HomePage.css';

export function HomePage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [events, setEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createError, setCreateError] = useState('');
  const [createSuccess, setCreateSuccess] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: '',
    image_url: ''
  });

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoadingEvents(true);
        const response = await fetch('http://localhost:5000/api/events');
        const data = await response.json();
        
        if (response.ok) {
          setEvents(data);
          setLoadError('');
        } else {
          setLoadError(data.error || 'Failed to load events');
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setLoadError('Failed to connect to server');
      } finally {
        setIsLoadingEvents(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (eventId) => {
    navigate(`/events/${eventId}`);
  };

  const validateCreateForm = () => {
    setCreateError('');
    
    if (!formData.title.trim()) {
      setCreateError('Event title is required');
      return false;
    }
    if (!formData.description.trim()) {
      setCreateError('Event description is required');
      return false;
    }
    if (!formData.date) {
      setCreateError('Event date is required');
      return false;
    }
    if (!formData.time) {
      setCreateError('Event time is required');
      return false;
    }
    if (!formData.location.trim()) {
      setCreateError('Event location is required');
      return false;
    }
    if (!formData.capacity || parseInt(formData.capacity) <= 0) {
      setCreateError('Event capacity must be a positive number');
      return false;
    }
    if (formData.image_url && !isValidUrl(formData.image_url)) {
      setCreateError('Please provide a valid image URL');
      return false;
    }
    
    return true;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setCreateError('');
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateCreateForm()) return;
    
    setIsSubmitting(true);
    setCreateError('');
    setCreateSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          createdBy: user?.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCreateSuccess(`Event "${data.title}" created successfully!`);
        setEvents([...events, data]);
        
        // Reset form
        setFormData({
          title: '',
          description: '',
          date: '',
          time: '',
          location: '',
          capacity: '',
          image_url: ''
        });

        // Hide form after 2 seconds
        setTimeout(() => {
          setShowCreateForm(false);
          setCreateSuccess('');
        }, 2000);
      } else {
        setCreateError(data.error || 'Failed to create event');
      }
    } catch (err) {
      console.error('Create event error:', err);
      setCreateError('Failed to connect to server. Make sure backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    const confirmed = window.confirm('Are you sure you want to delete this event? This action cannot be undone.');
    
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setEvents(events.filter(event => event.id !== eventId));
        alert('Event deleted successfully!');
      } else {
        alert(data.error || 'Failed to delete event');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete event');
    }
  };

  return (
    <div className="home-page">
      <h1>Upcoming Events</h1>
      <p className="subtitle">Discover and register for exciting events near you</p>
      
      {user && (
        <div className="create-event-section">
          <Button 
            variant="primary" 
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            {showCreateForm ? 'Cancel' : '+ Create Event'}
          </Button>

          {showCreateForm && (
            <div className="create-event-form-container">
              <h2>Create New Event</h2>
              
              {createError && (
                <div className="error-message">
                  {createError}
                </div>
              )}

              {createSuccess && (
                <div className="success-message">
                  {createSuccess}
                </div>
              )}

              <form onSubmit={handleCreateSubmit} className="create-event-form">
                <InputField
                  label="Event Title"
                  type="text"
                  name="title"
                  placeholder="Enter event title"
                  value={formData.title}
                  onChange={handleCreateChange}
                  required
                />

                <InputField
                  label="Description"
                  type="text"
                  name="description"
                  placeholder="Enter event description"
                  value={formData.description}
                  onChange={handleCreateChange}
                  required
                />

                <div className="form-row">
                  <InputField
                    label="Date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleCreateChange}
                    required
                  />

                  <InputField
                    label="Time"
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleCreateChange}
                    required
                  />
                </div>

                <InputField
                  label="Location"
                  type="text"
                  name="location"
                  placeholder="Enter event location"
                  value={formData.location}
                  onChange={handleCreateChange}
                  required
                />

                <InputField
                  label="Capacity"
                  type="number"
                  name="capacity"
                  placeholder="Enter maximum attendees"
                  value={formData.capacity}
                  onChange={handleCreateChange}
                  required
                />

                <InputField
                  label="Image URL (Optional)"
                  type="text"
                  name="image_url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image_url}
                  onChange={handleCreateChange}
                />

                <Button 
                  variant="primary" 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create Event'}
                </Button>
              </form>
            </div>
          )}
        </div>
      )}

      {isLoadingEvents ? (
        <div className="loading-state">
          <p>Loading events...</p>
        </div>
      ) : loadError ? (
        <div className="error-message">
          <p>{loadError}</p>
        </div>
      ) : events.length === 0 ? (
        <div className="empty-state">
          <p>No events available yet. Be the first to create one!</p>
        </div>
      ) : (
        <div className="events-list">
          {events.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              date={event.date}
              description={event.description}
              onClick={() => handleEventClick(event.id)}
              onDelete={handleDeleteEvent}
              canDelete={user && event.createdBy === user.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
