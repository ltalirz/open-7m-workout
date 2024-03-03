import exercises from "../data/exercises.json"; // Import the JSON data

const nCategories = Object.keys(exercises).length;
const nExercisesPerCategory = 3;

const generateWorkoutPlan = (nSets) => {
  const totalBody = exercises.TotalBody.filter(exercise => exercise.difficulty === "hard");
  console.log(totalBody);
  const lowerBody = exercises.LowerBody.filter(exercise => exercise.difficulty === "hard");
  const upperBody = exercises.UpperBody.filter(exercise => exercise.difficulty === "hard");
  const core = exercises.Core.filter(exercise => exercise.difficulty === "hard");

  let picks = [
    pickRandom(totalBody, nExercisesPerCategory),
    pickRandom(lowerBody, nExercisesPerCategory),
    pickRandom(upperBody, nExercisesPerCategory),
    pickRandom(core, nExercisesPerCategory),
  ];

  let set = [];
  for (let i = 0; i < nExercisesPerCategory; i++) {
    for (let j = 0; j < nCategories; j++) {
      set.push(picks[j][i]);
    }
  }

  let plan = [];
  for (let i = 0; i < nSets; i++) {
    plan = plan.concat(set);
  }
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

export default generateWorkoutPlan;
