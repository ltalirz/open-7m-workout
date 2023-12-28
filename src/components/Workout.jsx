import { useState, useEffect } from 'react';
import Timer from './Timer';
import exercises from '../data/exercises.json'; // Import the JSON data

const Workout = () => {
  const nSets = 3;
  const nCategories = Object.keys(exercises).length;
  const nExercisesPerCategory = 3;
  const exerciseDuration = 30;
  const restDuration = 5;

  const [isRest, setIsRest] = useState(true); // Start with rest
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [workoutIndex, setWorkoutIndex] = useState(0);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [message, setMessage] = useState('');
  const [timerDuration, setTimerDuration] = useState(restDuration); // Start with a 5s rest

  const [wakeLock, setWakeLock] = useState(null);

  const startWorkout = () => {
    const plan = generateWorkoutPlan();
    setWorkoutPlan(plan);
    setMessage('Get ready!');
    setWorkoutStarted(true);
    setIsRest(true);

    requestWakeLock();
  };

    // Ensure the wake lock is released when the Workout component unmounts
    useEffect(() => {
      return () => {
        wakeLock?.release().then(() => {
          console.log('Wake Lock was released');
        });
      };
    }, [wakeLock]);

  useEffect(() => {
    if (workoutStarted) {
      speak(message);
    }
  }, [message, workoutStarted]); // This effect runs whenever 'message' changes


  const requestWakeLock = async () => {
    if ('wakeLock' in navigator) {
      try {
        const lock = await navigator.wakeLock.request('screen');
        setWakeLock(lock);
        console.log('Wake Lock is active');
      } catch (err) {
        console.error(`Wake Lock Error: ${err.name}, ${err.message}`);
      }
    } else {
      console.error('Wake Lock API not supported in this browser.');
    }
  };

  const generateWorkoutPlan = () => {
    const totalBody = [...exercises.TotalBody];
    const lowerBody = [...exercises.LowerBody];
    const upperBody = [...exercises.UpperBody];
    const core = [...exercises.Core];

    let picks = [
        pickRandom(totalBody, nExercisesPerCategory),
        pickRandom(lowerBody, nExercisesPerCategory),
        pickRandom(upperBody, nExercisesPerCategory),
        pickRandom(core, nExercisesPerCategory)
    ];
    
    let set = [];
    for (let i = 0; i < nExercisesPerCategory; i++) {
      for (let j = 0; j < nCategories; j++) {
        set.push(picks[j][i]);
      }
    }
    
    let plan = new Array(nSets*set.length).fill(set).flat();

    console.log(plan);
    return plan;
  };

  const pickRandom = (array, count) => {
    // Randomly pick 'count' elements from 'array', no repeats
    let result = [];
    while (result.length < count) {
      let index = Math.floor(Math.random() * array.length);
      result.push(array[index]);
      array.splice(index, 1); // Remove selected exercise
    }
    return result;
  };

  const handleTimerComplete = () => {
    const nextIndex = workoutIndex + 1;

    if (isRest) {
      // Moving to the next exercise
      const newExercise = workoutPlan[nextIndex];
      setTimerDuration(exerciseDuration);
      // Update message to the new exercise, which will be spoken and displayed
      setMessage(newExercise);
      setWorkoutIndex(nextIndex);
    } else {
      // Starting rest
      if (nextIndex < workoutPlan.length) {
        // Update message to "Next up" only if there's another exercise
        setMessage('Next up: ' + workoutPlan[nextIndex]);
        setTimerDuration(restDuration);
      } else {
        // Handle end of workout
        setMessage('Workout complete!');
        setTimerDuration(0);
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
      {!workoutStarted ? (
        <button onClick={startWorkout}>Start Workout</button>
      ) : (
        <div>
          <h2>{message}</h2>
          <Timer duration={timerDuration} onComplete={handleTimerComplete} />
        </div>
      )}
    </div>
  );
};

export default Workout;