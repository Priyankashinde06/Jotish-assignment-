import { useLocation, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import '../styles/Details.css';

const Details = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item;
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);

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
      
      // Set canvas size to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // --- CHANGE 2: Mirror the captured image ---
      // We need to flip the context before drawing so the photo matches the preview
      context.translate(canvas.width, 0);
      context.scale(-1, 1);
      
      // Draw the image
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Reset transformation (good practice)
      context.setTransform(1, 0, 0, 1, 0, 0);
      // ------------------------------------------

      const imageData = canvas.toDataURL('image/png');
      
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setIsCameraOpen(false);
      setStream(null);

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
      <button onClick={() => navigate('/list')} className="btn-back-list">← Back to List</button>
      
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
                style={{ 
                  width: '100%', 
                  maxWidth: '500px', 
                  background: '#000', 
                  borderRadius: '8px',
                  // --- CHANGE 1: Mirror the video preview ---
                  transform: 'scaleX(-1)' 
                }}
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