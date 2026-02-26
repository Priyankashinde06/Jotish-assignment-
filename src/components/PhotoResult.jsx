import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/PhotoResult.css';

const PhotoResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const photo = location.state?.photo;

  if (!photo) {
    return (
      <div className="photo-result-container">
        <h3>No photo captured.</h3>
        <button onClick={() => navigate('/list')}>Go to List</button>
      </div>
    );
  }

  return (
    <div className="photo-result-container fade-in">
      <h2>Captured Photo</h2>
      <div className="photo-frame">
        <img src={photo} alt="Captured" />
      </div>
      <div>
        <button onClick={() => navigate('/list')}>← Back to List</button>
        <button 
          onClick={() => window.location.reload()} 
          style={{ marginLeft: '10px', background: '#28a745' }}
        >
          📸 Take Another
        </button>
      </div>
    </div>
  );
};

export default PhotoResult;