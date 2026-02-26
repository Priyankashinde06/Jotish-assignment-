import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { fetchTableData } from '../services/api';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import '../styles/MapView.css';

// Fix for default marker icon in Leaflet with bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const result = await fetchTableData();
      let list = Array.isArray(result) ? result : result.data || [];
      
      // Mocking Coordinates because the API likely doesn't provide Lat/Lng.
      // In a real app, you would use geocoding or the API should provide coordinates.
      // I'm assuming a 'city' field exists.
      const mockCoords = {
        "New York": [40.7128, -74.0060],
        "Los Angeles": [34.0522, -118.2437],
        "Chicago": [41.8781, -87.6298],
        "Houston": [29.7604, -95.3698],
        "Phoenix": [33.4484, -112.0740],
        "default": [51.505, -0.09] // Default London
      };

      const formatted = list.map(item => {
        const city = item.city || item.City || item.location || "default";
        return {
          ...item,
          city: city,
          position: mockCoords[city] || mockCoords['default']
        };
      });
      
      setLocations(formatted);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="map-container" style={{ textAlign: 'center', padding: '50px' }}>
        <div className="loading"></div>
        <p>Loading map data...</p>
      </div>
    );
  }

  return (
    <div className="map-container fade-in">
      <h2>City Locations</h2>
      <button onClick={() => navigate('/list')}>← Back to List</button>
      
      {locations.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', background: 'white', borderRadius: '10px' }}>
          <p>No location data available</p>
        </div>
      ) : (
        <>
          <MapContainer center={[20, 0]} zoom={2} style={{ height: "500px", width: "100%", marginTop: "20px" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {locations.map((loc, idx) => (
              loc.position && (
                <Marker key={idx} position={loc.position}>
                  <Popup>
                    <b>{loc.city}</b><br />
                    Name: {loc.name || loc.Name || 'N/A'}<br />
                    {loc.salary && `Salary: $${loc.salary}`}
                  </Popup>
                </Marker>
              )
            ))}
          </MapContainer>
          <p className="map-note">
            Note: Coordinates are mocked based on city names (API doesn't provide real coordinates)
          </p>
        </>
      )}
    </div>
  );
};

export default MapView;