import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import List from './components/List';
import Details from './components/Details';
import PhotoResult from './components/PhotoResult';
import BarChart from './components/BarChart';
import MapView from './components/MapView';

// Protected Route Component
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/list" element={
            <PrivateRoute>
              <List />
            </PrivateRoute>
          } />
          
          <Route path="/details" element={
            <PrivateRoute>
              <Details />
            </PrivateRoute>
          } />
          
          <Route path="/photo-result" element={
            <PrivateRoute>
              <PhotoResult />
            </PrivateRoute>
          } />

          <Route path="/charts" element={
            <PrivateRoute>
              <BarChart />
            </PrivateRoute>
          } />

          <Route path="/map" element={
            <PrivateRoute>
              <MapView />
            </PrivateRoute>
          } />

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;