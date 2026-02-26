import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/PhotoResult.css';

const PhotoResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const photo = location.state?.photo;
  const itemData = location.state?.itemData;

  if (!photo) {
    return (
      <div className="photo-result-container">
        <div className="error-state">
          <span className="error-icon">📷</span>
          <h3>No photo captured</h3>
          <p>Looks like you haven't taken any photos yet</p>
          <button onClick={() => navigate('/list')} className="btn-glow">
            Return to Gallery
          </button>
        </div>
      </div>
    );
  }

  const handleRetake = () => {
    navigate('/details', { state: { item: itemData } });
  };

  return (
    <div className="photo-result-container">
      <div className="photo-result-header">
        <h2>Photo Preview</h2>
        <p className="subtitle">Review your captured moment</p>
      </div>
      
      <div className="photo-showcase">
        <div className="photo-frame">
          <div className="photo-wrapper">
            <img src={photo} alt="Captured" className="captured-image" />
            <div className="photo-overlay">
              <span className="badge">✓ Captured</span>
            </div>
          </div>
        </div>
        
        <div className="photo-metadata">
          <div className="metadata-item">
            <span className="metadata-label">📅 Date</span>
            <span className="metadata-value">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="metadata-item">
            <span className="metadata-label">⏰ Time</span>
            <span className="metadata-value">{new Date().toLocaleTimeString()}</span>
          </div>
          <div className="metadata-item">
            <span className="metadata-label">📸 Quality</span>
            <span className="metadata-value">HD Ready</span>
          </div>
        </div>
        
        <div className="action-panel">
          <button onClick={handleRetake} className="btn-action btn-retake">
            <span className="btn-icon">🔄 </span>
            <span className="btn-text">Retake Photo</span>
            <span className="btn-hint">Try again</span>
          </button>
          
          <button onClick={() => navigate('/list')} className="btn-action btn-save">
            <span className="btn-icon">✓</span>
            <span className="btn-text">Use This Photo</span>
            <span className="btn-hint">Save to gallery</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoResult;