import { useState, useEffect } from "react";
import Timer from "./Timer";
import SetIndicator from "./SetIndicator";
import generateWorkoutPlan from "./Plan";

const Workout = () => {
  const defaultRest = 5;
  const defaultDuration = 30;
  const defaultSets = 3;

  // State variables
  const [restDuration, setRestDuration] = useState(defaultRest);
  const [exerciseDuration, setExerciseDuration] = useState(defaultDuration);
  const [sets, setSets] = useState(defaultSets);

  const [isRest, setIsRest] = useState(true); // Start with rest
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [workoutIndex, setWorkoutIndex] = useState(-1);
  const [setIndex, setSetIndex] = useState(0);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [message, setMessage] = useState("");
  const [timerDuration, setTimerDuration] = useState(restDuration); // Start with a 5s rest
  const [timerBeeping, setTimerBeeping] = useState(false);

  const [wakeLock, setWakeLock] = useState(null);

  const startWorkout = () => {
    console.log("Starting workout");
    const plan = generateWorkoutPlan(sets);
    setWorkoutPlan(plan);
    setMessage("Get ready!");
    setWorkoutStarted(true);
    setIsRest(true);

    requestWakeLock();
  };

  // Ensure the wake lock is released when the Workout component unmounts
  useEffect(() => {
    return () => {
      wakeLock?.release().then(() => {
        console.log("Wake Lock was released");
      });
    };
  }, [wakeLock]);

  useEffect(() => {
    if (workoutStarted) {
      speak(message);
    }
  }, [message, workoutStarted]); // This effect runs whenever 'message' changes

  const requestWakeLock = async () => {
    if ("wakeLock" in navigator) {
      try {
        const lock = await navigator.wakeLock.request("screen");
        setWakeLock(lock);
        console.log("Wake Lock is active");
      } catch (err) {
        console.error(`Wake Lock Error: ${err.name}, ${err.message}`);
      }
    } else {
      console.error("Wake Lock API not supported in this browser.");
    }
  };

  // Read query parameters from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const restParam = queryParams.get("rest");
    const durationParam = queryParams.get("duration");
    const setsParam = queryParams.get("sets");

    if (restParam) setRestDuration(parseInt(restParam, 10));
    if (durationParam) setExerciseDuration(parseInt(durationParam, 10));
    if (setsParam) setSets(parseInt(setsParam, 10));
  }, []);

  const handleTimerComplete = () => {
    const nextIndex = workoutIndex + 1;


    if (isRest) {
      // Moving to the next exercise
      const newExercise = workoutPlan[nextIndex];
      setTimerDuration(exerciseDuration);
      setTimerBeeping(true);

      // Update message to the new exercise, which will be spoken and displayed
      setMessage(newExercise.name);
      setWorkoutIndex(nextIndex);
    } else {
      // Starting rest
      setTimerBeeping(false);
      if (nextIndex < workoutPlan.length) {
        // Update message to "Next up" only if there's another exercise
        setMessage("Next up: " + workoutPlan[nextIndex].name);
        
        // update set index
        setSetIndex(Math.floor((workoutIndex+1) / 12));
        setTimerDuration(restDuration);
      } else {
        // Handle end of workout
        setMessage("Workout complete!");
        setWorkoutStarted(false);
      }
    }
    setIsRest(!isRest);
  };

  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  return (
    <div>
      <div>
        <h2>{message}</h2>
        {!workoutStarted ? (
          <button onClick={startWorkout}>Start Workout</button>
        ) : (
          <div>
          <SetIndicator
            currentSet={setIndex}
            totalSets={sets}
          />
          <Timer
            duration={timerDuration}
            onComplete={handleTimerComplete}
            isBeeping={timerBeeping}
          />
          </div>
        )}
      </div>
    </div>
  );
};

export default Workout;
