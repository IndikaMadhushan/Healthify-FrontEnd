import { useEffect, useState } from 'react';
import './HealthifyPreloader.css';

const HealthifyPreloader = ({ durationMs = 2000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, durationMs);

    return () => clearTimeout(timer);
  }, [durationMs]);

  if (!isVisible) return null;

  return (
    <div className="healthify-preloader">
      <div className="healthify-preloader-content">
        {/* Logo Container */}
        <div className="healthify-logo-container">
          {/* Heart Icon */}
          <div className="healthify-heart">
            <svg viewBox="0 0 100 100" className="heart-svg">
              <path
                d="M50 85 C25 65, 10 50, 10 35 C10 20, 20 10, 32.5 10 C40 10, 45 15, 50 22.5 C55 15, 60 10, 67.5 10 C80 10, 90 20, 90 35 C90 50, 75 65, 50 85 Z"
                fill="#e53935"
                className="heart-path"
              />
            </svg>
          </div>

          {/* Leaf Icon */}
          <div className="healthify-leaf">
            <svg viewBox="0 0 100 100" className="leaf-svg">
              <path
                d="M20 80 Q20 20, 80 20 Q50 50, 20 80 Z"
                fill="#18AAB0"
                className="leaf-path"
              />
              <path
                d="M25 75 Q40 40, 70 25"
                stroke="#fff"
                strokeWidth="2"
                fill="none"
                className="leaf-vein"
              />
            </svg>
          </div>

          {/* Healthify Text */}
          <div className="healthify-text">
            <span className="healthify-letter health-part" style={{ animationDelay: '0.1s' }}>H</span>
            <span className="healthify-letter health-part" style={{ animationDelay: '0.15s' }}>e</span>
            <span className="healthify-letter health-part" style={{ animationDelay: '0.2s' }}>a</span>
            <span className="healthify-letter health-part" style={{ animationDelay: '0.25s' }}>l</span>
            <span className="healthify-letter health-part" style={{ animationDelay: '0.3s' }}>t</span>
            <span className="healthify-letter health-part" style={{ animationDelay: '0.35s' }}>h</span>
            <span className="healthify-letter ify-part" style={{ animationDelay: '0.4s' }}>i</span>
            <span className="healthify-letter ify-part" style={{ animationDelay: '0.45s' }}>f</span>
            <span className="healthify-letter ify-part" style={{ animationDelay: '0.5s' }}>y</span>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="loading-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>

        {/* Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar-fill"></div>
        </div>
      </div>
    </div>
  );
};

export default HealthifyPreloader;
