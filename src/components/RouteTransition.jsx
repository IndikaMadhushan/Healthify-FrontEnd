import { useLocation } from 'react-router-dom';
import HealthifyPreloader from './HealthifyPreloader';

const LOADER_DURATION_MS = 900;

const RouteTransition = ({ children }) => {
  const location = useLocation();

  return (
    <>
      <HealthifyPreloader
        key={location.key || location.pathname}
        durationMs={LOADER_DURATION_MS}
      />
      {children}
    </>
  );
};

export default RouteTransition;
