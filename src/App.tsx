import { useLayoutEffect, useState } from 'react'
import './App.css'

import { GameLoop } from './core/engine/GameLoop'
import GameRenderer from './core/engine/GameRenderer'
import TileFactory from './core/entities/tile/Tile.factory'

export default function App() {
  const [game, setGame] = useState<{
    cw: number
    ch: number
    loop: GameLoop
  } | null>(null)

  useLayoutEffect(() => {
    const config = {
      width: 80,
      height: 40,
      size: 20,
      fps: 30,
      canvas: document.getElementById('gameCanvas') as HTMLCanvasElement,
    }
    const state = {
      x: 0,
      y: 0,
    }

    const tiles = TileFactory.createTileMatrix(config.width, config.height, TileFactory.generateRandomTileMatrixData(config.width, config.height))
    const render = new GameRenderer(config.canvas)
    const loop = new GameLoop(config.fps, [
      {
        update: (delta) => {},
        render: (delta) => {
          render.clearCanvas()
          render.renderMatrix(tiles.matrix)
          render.renderCell(state.x, state.y)
        },
      },
    ])
    config.canvas.addEventListener('click', (e) => {
      const rect = config.canvas.getBoundingClientRect()
      const x = Math.floor((e.clientX - rect.left) / config.size)
      const y = Math.floor((e.clientY - rect.top) / config.size)
      state.x = x
      state.y = y
    })

    setGame({
      cw: config.width * config.size,
      ch: config.height * config.size,
      loop,
    })
  }, [])

  return (
    <div className='App'>
      <section>
        <button onClick={() => game?.loop.start()}>start</button>
        <canvas id='gameCanvas' width={game?.cw} height={game?.ch}></canvas>
      </section>
    </div>
  )
}
