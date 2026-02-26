import { useLocation, useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import '../styles/Details.css'; // Ensure your CSS path is correct

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
      // Request camera access
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user", width: 640, height: 480 } 
      });

      // Set state to render the video element
      setStream(mediaStream);
      setIsCameraOpen(true);

      // Wait for React to render the video element, then attach stream
      // We use a small timeout or requestAnimationFrame to ensure the DOM is ready
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          // Explicitly play to avoid autoplay blocking
          videoRef.current.play().catch(e => console.error("Autoplay error:", e));
        }
      }, 100);

    } catch (err) {
      console.error("Camera Access Error:", err);
      // Check for specific errors
      if (err.name === 'NotAllowedError') {
        setError("Permission denied. Please allow camera access in your browser settings.");
      } else if (err.name === 'NotFoundError') {
        setError("No camera found on this device.");
      } else {
        setError("Could not access camera. Ensure you are using HTTPS or Localhost.");
      }
      setIsCameraOpen(false);
    }
  };

  const handleCapturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video && canvas && video.videoWidth > 0) {
      const context = canvas.getContext('2d');
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw image
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Get Image Data
      const imageData = canvas.toDataURL('image/png');
      
      // Cleanup: Stop all tracks
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      
      setIsCameraOpen(false);
      setStream(null);

      // Navigate
      navigate('/photo-result', { state: { photo: imageData } });
    } else {
      alert("Video not ready. Please wait a moment and try again.");
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
              {/* Added playsInline and muted for mobile/autoplay compatibility */}
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted
                style={{ width: '100%', maxWidth: '500px', background: '#000', borderRadius: '8px' }}
              ></video>
              
              <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
              
              <div className="camera-controls">
                <button onClick={handleCapturePhoto} className="btn-primary capture-btn">
                  📸 Capture
                </button>
                <button onClick={handleCancelCamera} className="btn-secondary cancel-btn">
                  ❌ Cancel
                </button>
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