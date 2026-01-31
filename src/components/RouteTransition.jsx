import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HealthifyPreloader from './HealthifyPreloader';
// Alternative: import HealthifyImagePreloader from './HealthifyImagePreloader';

const RouteTransition = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show preloader on route change
    setIsLoading(true);

    // Hide preloader after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust duration as needed (1000ms = 1 second)

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {isLoading && <HealthifyPreloader />}
      {/* Alternative with custom logo path:
      {isLoading && <HealthifyImagePreloader logoPath="/path/to/healthify-logo.png" />}
      */}
      <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.3s ease-in-out' }}>
        {children}
      </div>
    </>
  );
};

export default RouteTransition;