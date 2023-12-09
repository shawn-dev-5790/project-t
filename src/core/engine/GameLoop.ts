import { Mob } from '../object/Mob'
import { performanceChecker } from '../util/decorator/performanceChecker'
import GameObjectPool from './GameObjectPool'

const mobPool = new GameObjectPool<Mob>(Mob, 100)
mobPool.getPooledObject()

/**
 * 게임 루프 클래스
 */
export class GameLoop {
  private running: boolean = false
  private lastFrameTime: number = 0
  private fps: number = 1000 / 60

  /**
   * 게임 루프 시작
   */
  start(): void {
    if (this.running) return
    this.running = true
    this.lastFrameTime = performance.now()

    this.loop()
  }

  /**
   * 게임 루프 종료
   */
  stop(): void {
    this.running = false
  }

  /**
   * 게임 루프 메서드
   * @private
   */
  private loop(): void {
    if (!this.running) return

    const currentTime = performance.now()
    const elapsedTime = currentTime - this.lastFrameTime

    if (elapsedTime > this.fps) {
      // 여기서 게임 오브젝트들의 업데이트를 처리
      const deltaTime = elapsedTime / 1000 // 밀리초 단위로 환산
      this.updateGameObjects(deltaTime)
      this.lastFrameTime = currentTime
    }

    // 다음 프레임 요청
    requestAnimationFrame(() => this.loop())
  }

  /**
   * 게임 오브젝트들의 업데이트를 처리하는 메서드
   * @param {number} deltaTime - 경과된 시간 (초)
   * @private
   */
  @performanceChecker
  private updateGameObjects(deltaTime: number): void {
    this.updatePlayers(deltaTime)
    this.updateMobs(deltaTime)
  }

  private updateMobs(deltaTime: number): void {
    mobPool.allActivePooledObjects.forEach((mob) => {
      if (mob.x > 100) mobPool.returnPooledObject(mob)
      mob.update(deltaTime)
    })
  }
  private updatePlayers(deltaTime: number): void {}
}
