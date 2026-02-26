import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTableData } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/List.css';

const List = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const result = await fetchTableData();
      
      // Debugging: Log the result to see its shape
      console.log("List Component Received:", result);

      // Check if result is an array directly
      if (Array.isArray(result)) {
        setData(result);
      } 
      // Check if result has a 'data' property that is an array
      else if (result && Array.isArray(result.data)) {
        setData(result.data);
      } 
      // Check if result is an object but not an array (some APIs return { users: [...] })
      else if (typeof result === 'object' && result !== null) {
        // Try to find the first array inside the object
        const key = Object.keys(result).find(k => Array.isArray(result[k]));
        if (key) {
          setData(result[key]);
        } else {
          console.error("Could not find array in response", result);
        }
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Helper to render table headers dynamically
  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  if (loading) {
    return (
      <div className="list-container" style={{ textAlign: 'center', padding: '50px' }}>
        <div className="loading"></div>
        <p>Loading data...</p>
      </div>
    );
  }

  return (
    <div className="list-container fade-in">
      <div className="header">
        <h2>Welcome, {user?.username}!</h2>
        <div className="nav-buttons">
          <button onClick={() => navigate('/charts')}>📊 View Salary Chart</button>
          <button onClick={() => navigate('/map')}>🗺️ View Map</button>
          <button onClick={handleLogout}>🚪 Logout</button>
        </div>
      </div>

      {data.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', background: 'white', borderRadius: '10px' }}>
          <p>No data available</p>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              {headers.map(key => <th key={key}>{key.toUpperCase()}</th>)}
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {headers.map(key => <td key={`${index}-${key}`}>{String(item[key])}</td>)}
                <td>
                  <button onClick={() => navigate('/details', { state: { item } })}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      <p style={{ textAlign: 'center', marginTop: '20px', color: '#6c757d', fontSize: '0.9em' }}>
        Total Records: {data.length}
      </p>
    </div>
  );
};

export default List;