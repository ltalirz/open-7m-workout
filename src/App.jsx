import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Workout from './components/Workout'

function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
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
