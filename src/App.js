import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchISSLocation = () => {
      fetch('https://api.wheretheiss.at/v1/satellites/25544')
        .then(response => response.json())
        .then(data => {
          const { latitude, longitude } = data;
          setLocation({ latitude, longitude });
        })
        .catch(error => {
          console.error('Error fetching ISS location:', error);
          setError(error.message || 'Error fetching ISS location');
        });
    };

    fetchISSLocation();

    const intervalId = setInterval(fetchISSLocation, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>International Space Station Location</h1>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <p>
            Current Location: Latitude {location.latitude.toFixed(2)}, Longitude {location.longitude.toFixed(2)}
          </p>
        )}
      </header>
    </div>
  );
};

export default App;
