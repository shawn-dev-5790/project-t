export class GameTime {
  public elapsed(start: number, end: number): number {
    return start - end
  }
  public delta(elapsed: number): number {
    return elapsed / 1000
  }
  public tick(fps: number): number {
    return 1000 / fps
  }
  public now() {
    return performance.now()
  }
}
