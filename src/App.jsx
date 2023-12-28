import reactLogo from './assets/react.svg'
import './App.css'
import Workout from './components/Workout'

function App() {
  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="card">
        <Workout />
      </div>
    </>
  )
}

export default App
