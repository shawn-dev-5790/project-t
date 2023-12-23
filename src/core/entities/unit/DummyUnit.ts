import GameMatrix from '../../engine/GameMatrix'

export class DummyUnit {
  private positionX: number
  private positionY: number
  private matrix: GameMatrix<any> // 게임 행렬 클래스를 가정하고 있습니다.
  private speed: number // 유닛의 속도
  private actionRange: number // 유닛의 행동 범위

  constructor(matrix: GameMatrix<any>, initialX: number, initialY: number, speed: number, actionRange: number) {
    this.matrix = matrix
    this.positionX = initialX
    this.positionY = initialY
    this.speed = speed
    this.actionRange = actionRange

    this.matrix.set(this.positionX, this.positionY, this)
  }

  // 이동 가능 여부를 확인하는 메서드
  private canMove(x: number, y: number): boolean {
    const newX = this.positionX + x
    const newY = this.positionY + y

    // 행동 범위 안에 있는지 확인
    if (Math.abs(newX - this.positionX) <= this.actionRange && Math.abs(newY - this.positionY) <= this.actionRange) {
      // 행렬 범위를 벗어나지 않는지 확인
      // if (newX >= 0 && newX < this.matrix[0].length && newY >= 0 && newY < this.matrix.length) {
      // return true
      // }
    }

    return false
  }

  // 유닛 이동 메서드
  public move(x: number, y: number) {
    if (this.canMove(x, y)) {
      // 현재 위치를 행렬에서 제거
      this.matrix.set(this.positionX, this.positionY, null)

      // 새로운 위치로 이동
      this.positionX += x
      this.positionY += y

      // 새로운 위치에 오브젝트를 행렬에 추가
      this.matrix.set(this.positionX, this.positionY, this)
    }
  }
}
