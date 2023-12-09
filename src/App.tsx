import './App.css'

import { GameLoop } from './core/engine/GameLoop'

const gameLoop = new GameLoop()

function App() {
  return (
    <div className='App'>
      <button onClick={() => gameLoop.start()}>start</button>
      <button onClick={() => gameLoop.stop()}>stop</button>
    </div>
  )
}

export default App
