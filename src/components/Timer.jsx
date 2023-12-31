import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import beep from "./Beep";

const Timer = ({ duration, onComplete, isBeeping }) => {
  const [timeLeft, setTimeLeft] = useState(duration); // Initialize to the duration prop
  const [audioContext, setAudioContext] = useState(null);

  useEffect(() => {
    if (!audioContext) setAudioContext(new AudioContext());
    setTimeLeft(duration); // Reset the timer whenever the duration prop changes
  }, [duration, audioContext]);

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(-1); // Avoid re-triggering the effect
      onComplete();
      return;
    }

    if (timeLeft <= 3 && timeLeft > 0 && isBeeping) {
      beep(audioContext, 150, 440);
    }

    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [timeLeft, onComplete, audioContext, isBeeping]);

  const timerStyle = isBeeping && timeLeft <= 3 ? { color: "red" } : {}; // Change color to red for last 3 seconds

  return (
    <div>
      <h1 style={timerStyle}>{timeLeft}</h1>
    </div>
  );
};

// Define PropTypes for Timer
Timer.propTypes = {
  duration: PropTypes.number.isRequired,
  onComplete: PropTypes.func.isRequired,
  isBeeping: PropTypes.bool.isRequired,
};

export default Timer;
