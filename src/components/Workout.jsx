import React, { useState, useEffect } from 'react';
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

  const startWorkout = () => {
    const plan = generateWorkoutPlan();
    setWorkoutPlan(plan);
    setMessage('Get ready!');
    setWorkoutStarted(true);
    setIsRest(true);
  };

  useEffect(() => {
    if (workoutStarted) {
      speak(message);
    }
  }, [message, workoutStarted]); // This effect runs whenever 'message' changes

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
    for (let i = 0; i < nCategories; i++) {
      for (let j = 0; j < nExercisesPerCategory; j++) {
        set.push(picks[j][i]);
      }
    }
    
    let plan = new Array(nSets*set.length).fill(set).flat();
    return plan;
  };

  const pickRandom = (array, count) => {
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