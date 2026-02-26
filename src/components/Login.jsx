import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate slight delay for better UX
    setTimeout(() => {
      const success = login(username, password);
      if (success) {
        navigate('/list');
      } else {
        setError('Invalid username or password');
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="login-container fade-in">
      <h2>Welcome Back</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            disabled={loading}
            autoFocus
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            disabled={loading}
          />
        </div>
        {error && <p style={{ color: '#ff6b6b', background: 'rgba(255,255,255,0.2)' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? <span className="loading"></span> : 'Sign In'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.9em', opacity: '0.8' }}>
        Use: testuser / Test123
      </p>
    </div>
  );
};

export default Login;