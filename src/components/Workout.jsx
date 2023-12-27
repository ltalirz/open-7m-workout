import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import exercises from '../data/exercises.json';

const Workout = () => {

  const [currentExercise, setCurrentExercise] = useState(null);
  const [isRest, setIsRest] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const [workoutIndex, setWorkoutIndex] = useState(0);
    
  useEffect(() => {
    // Generate workout plan on component mount
    const plan = generateWorkoutPlan();
    setWorkoutPlan(plan);
  }, []);

  useEffect(() => {
    // Update current exercise
    if (workoutPlan.length > 0 && workoutIndex < workoutPlan.length) {
      setCurrentExercise(workoutPlan[workoutIndex]);
    }
  }, [workoutIndex, workoutPlan]);

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
      setWorkoutIndex(workoutIndex + 1);
    }
    setIsRest(!isRest);
  };

  return (
    <div>
      <h2>{isRest ? 'Rest' : currentExercise}</h2>
      <Timer duration={isRest ? 5 : 30} onComplete={handleTimerComplete} />
    </div>
  );
};

export default Workout;
