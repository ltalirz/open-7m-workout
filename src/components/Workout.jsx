import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import exercises from '../data/exercises.json'; // Import the JSON data

const Workout = () => {
  const [currentExercise, setCurrentExercise] = useState('');
  const [nextExercise, setNextExercise] = useState('');
  const [isRest, setIsRest] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [workoutIndex, setWorkoutIndex] = useState(0);

  useEffect(() => {
    // Generate workout plan on component mount
    const plan = generateWorkoutPlan();
    setWorkoutPlan(plan);
    setCurrentExercise(plan[0]);
    setNextExercise(plan[1] || '');
  }, []);

  const generateWorkoutPlan = () => {
    let plan = [];
    for (let i = 0; i < 3; i++) {
      plan = plan.concat(
        pickRandom(exercises.TotalBody, 3),
        pickRandom(exercises.LowerBody, 3),
        pickRandom(exercises.UpperBody, 3),
        pickRandom(exercises.Core, 3)
      );
    }
    plan[plan.length - 1] = pickRandom(exercises.Core, 1)[0];
    return plan;
  };

  const pickRandom = (array, count) => {
    let result = [];
    let _array = [...array];
    while (result.length < count) {
      let index = Math.floor(Math.random() * _array.length);
      result.push(_array[index]);
      _array.splice(index, 1);
    }
    return result;
  };

  const handleTimerComplete = () => {
    if (isRest) {
      // Move to next exercise
      setWorkoutIndex(workoutIndex + 1);
      setCurrentExercise(workoutPlan[workoutIndex + 1]);
      setNextExercise(workoutPlan[workoutIndex + 2] || '');
    }
    setIsRest(!isRest);
  };

  return (
    <div>
      {isRest ? (
        <div>
          <h2>Rest</h2>
          <p>Next up: {nextExercise}</p>
          <Timer duration={5} onComplete={handleTimerComplete} />
        </div>
      ) : (
        <div>
          <h2>{currentExercise}</h2>
          <Timer duration={30} onComplete={handleTimerComplete} />
        </div>
      )}
    </div>
  );
};

export default Workout;