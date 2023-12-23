import { useState } from 'react'
import './App.css'

import { GameLoop } from './core/engine/GameLoop'
import CardFactory from './core/entities/card/Card.factory'
import Matrix from './core/engine/GameMatrix'

const gameLoop = new GameLoop(1, [{ update: (d) => console.log('update'), render: (d) => console.log('render') }])

console.log(CardFactory.cards.forEach((c) => console.log(c.data)))

function App() {
  const [w, h] = [20, 16]
  const m = new Matrix<string>(w, h, 'id') // 10x10 크기의 행렬 생성

  const [c, setCoord] = useState({ x: Math.ceil(w / 2), y: Math.ceil(h / 2) })

  // const aoe = m.getDiamondArea(c.x, c.y, r)
  // const aoe = m.getRectangleArea(c.x, c.y, 1, 3)
  // const aoe = m.getFanArea(c.x, c.y, 12, 360 - 45, 45)
  const aoe = m.getCircularArea(c.x, c.y, 3)

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
              {m.matrix.map((cells, y) => (
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
