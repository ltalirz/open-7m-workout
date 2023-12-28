# Open 7 Minute Workout

Open-source 7 minute workout app built with React and Vite hosted at [ltalirz.github.io/open-7-minute-workout](https://ltalirz.github.io/open-7-minute-workout/).

The app requires the user to do 12 exercises for 30 seconds each with 5 seconds of rest in between. 

## Requirements
You need a browser with support for 
- the [Web Speech API](https://caniuse.com/mdn-api_speechsynthesis) (for reading out the exercises)
- the [Screen Wake Lock API](https://caniuse.com/wake-lock) (to prevent the screen from turning off during the workout)

## Todo
- [ ] add pause button
- [ ] add sound effect leading up to end of exercise
- [ ] add indicator for number of set  / exercise in set
- [ ] make number of sets configurable
- [ ] make exercise difficulty configurable


## Development

This project used the React + Vite template to get React working in Vite with HMR and some ESLint rules.

Get started by cloning the repo and running the following commands:
```
$ npm install && npm run dev
```