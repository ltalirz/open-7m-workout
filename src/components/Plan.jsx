import exercises from '../data/exercises.json'; // Import the JSON data

const nSets = 3;
const nCategories = Object.keys(exercises).length;
const nExercisesPerCategory = 3;

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
