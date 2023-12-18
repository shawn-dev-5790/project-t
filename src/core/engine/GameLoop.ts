import { GameTime } from '../utils/GameTime'
import { performanceChecker } from '../utils/decorator/performanceChecker'

// 기본 FPS 및 업데이트 목록
const DEFAULT_FPS: GameLoop['fps'] = 60
const DEFAULT_UPDATES: GameLoop['updates'] = []

export class GameLoop {
  private time = new GameTime()
  private running: boolean = false
  private timer: number = 0
  private fps: number = DEFAULT_FPS
  private updates: {
    update: (delta: number) => void
    render: (delta: number) => void
  }[] = DEFAULT_UPDATES

  // 생성자: 초기 FPS 및 업데이트 목록 설정
  constructor(fps: GameLoop['fps'] = DEFAULT_FPS, updates: GameLoop['updates'] = DEFAULT_UPDATES) {
    this.fps = Math.max(fps, 1) // 최소값 보정: FPS는 1 이상이어야 함
    this.updates = updates
  }

  // 게임 루프 시작
  public start(): void {
    if (this.running) return

    this.running = true
    this.timer = this.time.now()

    this._loop()
  }

  // 게임 루프 정지
  public stop(): void {
    if (!this.running) return

    this.running = false
  }

  // 업데이트 메서드: 주기적으로 호출되는 업데이트 함수 실행
  @performanceChecker
  private _update(delta: number): void {
    this.updates.forEach((obj) => obj.update(delta))
  }
  private _render(delta: number): void {
    this.updates.forEach((obj) => obj.render(delta))
  }

  // 게임 루프 메서드: requestAnimationFrame을 이용해 주기적으로 호출
  private _loop(): void {
    if (!this.running) return

    const current = this.time.now()
    const elapsed = this.time.elapsed(current, this.timer)
    const delta = this.time.delta(elapsed)
    const tick = this.time.tick(this.fps)

    // FPS 주기에 맞게 업데이트 실행 게임 연산은 3배 빠르게.
    if (elapsed > tick) {
      this._update(delta)
      this._render(delta)
      this.timer = current
    }

    // 다음 프레임 요청
    requestAnimationFrame(() => this._loop())
  }
}
