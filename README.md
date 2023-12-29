# Open 7 Minute Workout

Minimalist open-source 7 minute workout app built with React and Vite hosted at [ltalirz.github.io/open-7m-workout](https://ltalirz.github.io/open-7m-workout/).

The app randomly generates a workout plan according to the following rules:
- set: 12 exercises, 3 from each of four categories (total body, lower body, upper body, core)
- 30s per exercise
- 5s of rest between exercises
- 3 sets

Exercise duration, rest duration and number of sets can be configured via URL parameters, so you can bookmark the URL with the settings you prefer. For example: [ltalirz.github.io/open-7m-workout/?duration=30&rest=5&sets=3](https://ltalirz.github.io/open-7m-workout/?duration=10&rest=5&sets=3)

## Requirements
The app should run on most modern browsers on desktop or mobile (tested on Safari on iOS and Chrome on macOS).

Specifically, your web browser needs to support
- the [Web Speech API](https://caniuse.com/mdn-api_speechsynthesis) for reading out the exercises
- the [Screen Wake Lock API](https://caniuse.com/wake-lock) to prevent the screen from turning off during the workout
- the [URL Search Params](https://caniuse.com/urlsearchparams) to parse the URL parameters

## Development

This project used the React + Vite template to get React working in Vite with HMR and some ESLint rules.

Get started by cloning the repo and running the following commands:
```
$ npm install && npm run dev
```