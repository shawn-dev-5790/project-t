/**
 * 게임 렌더러 클래스입니다. 캔버스를 통해 게임 오브젝트들을 렌더링합니다.
 */
export default class GameRenderer {
  /**
   * GameRenderer 클래스 생성자입니다.
   * @param canvas - 게임 렌더링에 사용될 캔버스 요소입니다.
   */
  constructor(private canvas: HTMLCanvasElement) {}

  /**
   * 캔버스의 너비입니다.
   */
  public get w(): number {
    return this.canvas.width
  }

  /**
   * 캔버스의 높이입니다.
   */
  public get h(): number {
    return this.canvas.height
  }

  /**
   * 캔버스의 2D 렌더링 컨텍스트입니다.
   */
  public get ctx(): CanvasRenderingContext2D {
    return this.canvas.getContext('2d')!
  }

  /**
   * 타일을 렌더링하는 메서드입니다.
   * 여기에 타일을 그리는 렌더링 로직을 추가하세요.
   */
  public renderMatrix(matrix: any[][]): void {
    const cellSize = 20
    matrix.forEach((cols, y) =>
      cols.forEach((_, x) => {
        this.ctx.save() // 현재 캔버스 설정 저장
        this.ctx.globalAlpha = 1 // 투명도 조절
        this.ctx.fillStyle = (x + y) % 2 === 0 ? 'white' : 'gray'
        this.ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
        this.ctx.restore() // 이전 설정으로 복원
      })
    )
  }
  public renderCell(x: number, y: number) {
    const cellSize = 20
    this.ctx.beginPath()
    this.ctx.fillStyle = 'red'
    this.ctx.globalAlpha = 0.2 // 투명도 조절
    this.ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize)
    this.ctx.closePath()
  }

  /**
   * 캔버스를 지우고 초기화하는 메서드입니다.
   */
  public clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.w, this.h)
  }
}
