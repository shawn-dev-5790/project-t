import { performanceChecker } from '../utils/decorator/performanceChecker'
import GameTime from './GameTime'

/**
 * 게임 루프를 담당하는 클래스입니다.
 */
export class GameLoop {
  private running: boolean = false
  private timer: number = 0
  private fps: number
  private updates: {
    update: (delta: number) => void
    render: (delta: number) => void
  }[]

  /**
   * GameLoop 클래스의 인스턴스를 생성합니다.
   * @param fps - 초당 프레임 수입니다. 최소값은 1입니다.
   * @param updates - 주기적으로 호출되는 업데이트 함수 목록입니다.
   */
  constructor(fps: GameLoop['fps'] = 60, updates: GameLoop['updates'] = []) {
    this.fps = Math.max(fps, 1) // 최소값 보정: FPS는 1 이상이어야 함
    this.updates = updates
  }

  /**
   * 게임 루프를 시작합니다.
   */
  public start(): void {
    if (this.running) return

    this.running = true
    this.timer = GameTime.now()

    this.loop()
  }

  /**
   * 게임 루프를 정지합니다.
   */
  public stop(): void {
    if (!this.running) return

    this.running = false
  }

  /**
   * 주기적으로 호출되는 업데이트 함수를 실행합니다.
   * @param delta - 직전 업데이트 이후의 경과 시간 (초)입니다.
   * @private
   */
  @performanceChecker
  private update(delta: number): void {
    this.updates.forEach((obj) => obj.update(delta))
  }

  /**
   * 주기적으로 호출되는 렌더 함수를 실행합니다.
   * @param delta - 직전 업데이트 이후의 경과 시간 (초)입니다.
   * @private
   */
  private render(delta: number): void {
    this.updates.forEach((obj) => obj.render(delta))
  }

  /**
   * 게임 루프 메서드: requestAnimationFrame을 이용해 주기적으로 호출됩니다.
   * @private
   */
  private loop(): void {
    if (!this.running) return

    const current = GameTime.now()
    const elapsed = GameTime.elapsed(current, this.timer)
    const delta = GameTime.delta(elapsed)
    const tick = GameTime.tick(this.fps)

    // FPS 주기에 맞게 업데이트 실행, 게임 연산은 3배 빠르게.
    if (elapsed > tick) {
      this.update(delta)
      this.render(delta)
      this.timer = current
    }

    // 다음 프레임 요청
    requestAnimationFrame(() => this.loop())
  }
}
