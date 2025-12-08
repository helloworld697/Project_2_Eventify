import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.css';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="error-code">404</div>
        <h1>Page Not Found</h1>
        <p>Sorry, the page you're looking for doesn't exist.</p>
        <button className="home-link" onClick={() => navigate('/')}>
          Go Back Home
        </button>
      </div>
    </div>
  );
}
