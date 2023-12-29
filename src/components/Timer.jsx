import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const Timer = ({ duration, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration); // Initialize to the duration prop

  useEffect(() => {
    setTimeLeft(duration); // Reset the timer whenever the duration prop changes
  }, [duration]);

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(-1); // Avoid re-triggering the effect
      onComplete();
      return;
    }

    // Timer logic
    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft, onComplete]);

  return (
    <div>
      <h1>{timeLeft}</h1>
    </div>
  );
};

// Define PropTypes for Timer
Timer.propTypes = {
  duration: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default Timer;
