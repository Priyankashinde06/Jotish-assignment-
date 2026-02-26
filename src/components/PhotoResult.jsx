import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/PhotoResult.css'; // Ensure you have this CSS file

const PhotoResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract photo AND the itemData
  const photo = location.state?.photo;
  const itemData = location.state?.itemData;

  if (!photo) {
    return (
      <div className="photo-result-container">
        <h3>No photo captured.</h3>
        <button onClick={() => navigate('/list')}>Go to List</button>
      </div>
    );
  }

  const handleRetake = () => {
    // Navigate back to details, passing the itemData back
    navigate('/details', { state: { item: itemData } });
  };

  return (
    <div className="photo-result-container">
      <h2>Captured Photo</h2>
      
      <div className="photo-card">
        <img src={photo} alt="Captured" className="captured-image" />
        
        <div className="photo-actions">
          {/* This button now correctly goes back to Details */}
          <button onClick={handleRetake} className="btn-primary">
            📸 Take Another
          </button>
          
          <button onClick={() => navigate('/list')} className="btn-secondary">
            ← Back to List
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoResult;