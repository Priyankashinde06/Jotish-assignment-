import { useLocation, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import '../styles/Details.css'; // Make sure path matches your folder structure

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // We receive the item here
  const item = location.state?.item;
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);

  // If no item, redirect to list
  if (!item) {
    return (
      <div className="details-container" style={{ textAlign: 'center', padding: '50px' }}>
        <h3>No data found.</h3>
        <button onClick={() => navigate('/list')}>Go Back to List</button>
      </div>
    );
  }

  const handleOpenCamera = async () => {
    setError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user", width: 640, height: 480 } 
      });
      setStream(mediaStream);
      setIsCameraOpen(true);
      
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play().catch(e => console.error("Play error:", e));
        }
      }, 100);
    } catch (err) {
      console.error("Camera Access Error:", err);
      setError("Could not access camera. Ensure HTTPS or Localhost.");
      setIsCameraOpen(false);
    }
  };

  const handleCapturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video && canvas && video.videoWidth > 0) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageData = canvas.toDataURL('image/png');
      
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setIsCameraOpen(false);
      setStream(null);

      // CRITICAL: Pass the 'item' back to PhotoResult so we don't lose it
      navigate('/photo-result', { state: { photo: imageData, itemData: item } });
    } else {
      alert("Video not ready.");
    }
  };

  const handleCancelCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setIsCameraOpen(false);
    setStream(null);
  };

  const headers = Object.keys(item);

  return (
    <div className="details-container fade-in">
      <h2>Details Page</h2>
      <button onClick={() => navigate('/list')} className="btn-secondary">← Back to List</button>
      
      <div className="details-card">
        <div className="details-info">
          {headers.map(key => (
            <div className="detail-item" key={key}>
              <span className="detail-label">{key}:</span> 
              <span className="detail-value">{String(item[key])}</span>
            </div>
          ))}
        </div>

        <div className="camera-section">
          {!isCameraOpen ? (
            <button onClick={handleOpenCamera} className="btn-primary camera-btn">
              📸 Open Camera
            </button>
          ) : (
            <div className="camera-view">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted
                style={{ width: '100%', maxWidth: '500px', background: '#000', borderRadius: '8px' }}
              ></video>
              <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
              <div className="camera-controls">
                <button onClick={handleCapturePhoto} className="btn-primary">📸 Capture</button>
                <button onClick={handleCancelCamera} className="btn-secondary">❌ Cancel</button>
              </div>
            </div>
          )}
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Details;