import { useEffect } from 'react';
import { resetLogoutTimer } from '../utils/auth';

const UserActivity = () => {
  useEffect(() => {
    // List of events to listen for
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    
    // Function to reset the logout timer
    const resetTimer = () => resetLogoutTimer();
    
    // Add event listeners for each event
    events.forEach(event => document.addEventListener(event, resetTimer));
    
    // Clean up function to remove event listeners on component unmount
    return () => {
      events.forEach(event => document.removeEventListener(event, resetTimer));
    };
  }, []);

  // This component doesn't render anything
  return null;
};

export default UserActivity;