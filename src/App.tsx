import './App.css'

import { GameLoop } from './core/engine/GameLoop'
import CardFactory from './core/entities/card/Card.factory'

const gameLoop = new GameLoop(1, [{ update: (d) => console.log('update'), render: (d) => console.log('render') }])

console.log(CardFactory.cards.forEach((c) => console.log(c.data)))

function App() {
  return (
    <div className='App'>
      <button onClick={() => gameLoop.start()}>start</button>
      <button onClick={() => gameLoop.stop()}>stop</button>
    </div>
  )
}

export default App
