import { useState } from 'react'
import './App.css'

import { GameLoop } from './core/engine/GameLoop'
import CardFactory from './core/entities/card/Card.factory'
import Matrix from './core/utils/Matrix'

const gameLoop = new GameLoop(1, [{ update: (d) => console.log('update'), render: (d) => console.log('render') }])

console.log(CardFactory.cards.forEach((c) => console.log(c.data)))

function App() {
  const [w, h, r] = [20, 16, 6]
  const matrix = new Matrix<number>(w, h, 0) // 10x10 크기의 행렬 생성

  const [c, setCoord] = useState({ x: Math.ceil(w / 2), y: Math.ceil(h / 2) })

  const aoe = matrix.getFanArea(c.x, c.y, r, 360 -120, 360 -60 )
  // const aoe = matrix.getDiamondArea(c.x, c.y, r)

  return (
    <div className='App'>
      <section>
        <strong>loop</strong>
        <button onClick={() => gameLoop.start()}>start</button>
        <button onClick={() => gameLoop.stop()}>stop</button>
      </section>
      <section>
        <div style={{ position: 'relative' }}>
          <table style={{ borderCollapse: 'collapse' }}>
            <tbody>
              {matrix.data.map((cells, y) => (
                <tr key={y}>
                  {cells.map((_, x) => (
                    <td
                      key={x}
                      children={[x, y].join(',')}
                      onClick={() => setCoord({ x, y })}
                      style={{
                        overflow: 'hidden',
                        width: '50px',
                        height: '50px',
                        background: c.x === x && c.y === y ? 'gold' : '#ffffff',
                      }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {aoe.map(({ x, y }, i) => (
            <div
              key={'1' + i}
              onClick={() => setCoord({ x, y })}
              style={{
                position: 'absolute',
                left: 52 * x + 'px',
                top: 52 * y + 'px',
                width: '52px',
                height: '52px',
                background: 'rgba(0,0,0,0.2)',
              }}
            ></div>
          ))}
        </div>
        <pre>
          {aoe.map((o) => (
            <div>({[o.x, o.y].join(',')})</div>
          ))}
        </pre>
      </section>
    </div>
  )
}

export default App
