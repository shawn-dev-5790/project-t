import GameMath from './GameMath'

interface ITarget<T> {
  x: number
  y: number
  v: T
}

/**
 * 2D 매트릭스를 나타내는 GameMatrix 클래스입니다.
 * @template T - 매트릭스의 요소 유형
 */
export default class GameMatrix<T> {
  public rows: number = 0
  public cols: number = 0
  public matrix: T[][] = []

  constructor(rows: number, cols: number, value: T) {
    this.rows = rows
    this.cols = cols
    this.matrix = Array.from({ length: cols }, () => new Array(rows).fill(value))
  }

  /**
   * 주어진 좌표가 매트릭스의 유효한 범위 내에 있는지 확인합니다.
   * @param x - X 좌표입니다.
   * @param y - Y 좌표입니다.
   * @returns 유효한 좌표인 경우 true, 그렇지 않으면 false를 반환합니다.
   */
  private isValidSize(x: number, y: number): boolean {
    return y > -1 && y < this.matrix.length && x > -1 && x < this.matrix[0].length
  }
  /**
   * 주어진 필터 함수에 따라 타겟 영역의 요소를 가져옵니다.
   * @param x - 중심의 X 좌표입니다.
   * @param y - 중심의 Y 좌표입니다.
   * @param w - 영역의 반 가로 길이입니다.
   * @param h - 영역의 반 세로 길이입니다.
   * @param onFilter - 필터 함수입니다.
   * @returns 타겟 영역에 속하는 요소들의 배열입니다.
   */
  private getTargetArea(x: number, y: number, w: number, h: number, onFilter: (tx: number, ty: number) => boolean): ITarget<T>[] {
    let targets = []
    for (let ty = y - h; ty <= y + h; ty++) {
      for (let tx = x - w; tx <= x + w; tx++) {
        if (onFilter(tx, ty)) targets.push({ x: tx, y: ty, v: this.get(tx, ty) })
      }
    }
    return targets
  }

  /**
   * 주어진 좌표에서 매트릭스의 요소를 가져옵니다.
   * @param x - X 좌표입니다.
   * @param y - Y 좌표입니다.
   * @returns 매트릭스의 요소입니다.
   */
  public get(x: number, y: number): T {
    return this.matrix[y][x]
  }

  /**
   * 주어진 좌표에 매트릭스의 요소를 설정합니다.
   * @param x - X 좌표입니다.
   * @param y - Y 좌표입니다.
   * @param value - 설정할 값입니다.
   */
  public set(x: number, y: number, value: T): void {
    if (!this.isValidSize(x, y)) return
    this.matrix[y][x] = value
  }
  /**
   * 주어진 좌표를 중심으로 하는 다이아몬드 영역의 요소를 가져옵니다.
   * @param x - 중심의 X 좌표입니다.
   * @param y - 중심의 Y 좌표입니다.
   * @param r - 다이아몬드의 반지름입니다.
   * @returns 다이아몬드 영역에 속하는 요소들의 배열입니다.
   */
  public getDiamondArea(x: number, y: number, r: number): ITarget<T>[] {
    return this.getTargetArea(x, y, r, r, (tx, ty) => [this.isValidSize(tx, ty), GameMath.isInDiamondArea(x, y, tx, ty, r)].every(Boolean))
  }

  /**
   * 주어진 좌표를 중심으로 하는 부채꼴 영역의 요소를 가져옵니다.
   * @param x - 중심의 X 좌표입니다.
   * @param y - 중심의 Y 좌표입니다.
   * @param r - 부채꼴의 반지름입니다.
   * @param sa - 부채꼴의 시작 각도 (도)입니다.
   * @param ea - 부채꼴의 끝 각도 (도)입니다.
   * @returns 부채꼴 영역에 속하는 요소들의 배열입니다.
   */
  public getFanArea(x: number, y: number, r: number, sa: number, ea: number): ITarget<T>[] {
    return this.getTargetArea(x, y, r, r, (tx, ty) => [this.isValidSize(tx, ty), GameMath.isInFanArea(x, y, tx, ty, r, sa, ea)].every(Boolean))
  }

  /**
   * 주어진 좌표를 중심으로 하는 원형 영역의 요소를 가져옵니다.
   * @param x - 중심의 X 좌표입니다.
   * @param y - 중심의 Y 좌표입니다.
   * @param r - 원형 영역의 반지름입니다.
   * @returns 원형 영역에 속하는 요소들의 배열입니다.
   */
  public getCircularArea(x: number, y: number, r: number): ITarget<T>[] {
    return this.getTargetArea(x, y, r, r, (tx, ty) => [this.isValidSize(tx, ty), GameMath.isInCircularArea(x, y, tx, ty, r)].every(Boolean))
  }

  /**
   * 주어진 좌표를 중심으로 하는 직사각형 또는 정사각형 영역의 요소를 가져옵니다.
   * @param x - 중심의 X 좌표입니다.
   * @param y - 중심의 Y 좌표입니다.
   * @param w - 영역의 가로 길이입니다.
   * @param h - 영역의 세로 길이입니다.
   * @returns 영역에 속하는 요소들의 배열입니다.
   */
  public getRectangleArea(x: number, y: number, w: number, h: number): ITarget<T>[] {
    return this.getTargetArea(x, y, w, h, (tx, ty) => [this.isValidSize(tx, ty), GameMath.isInRectangleArea(x, y, tx, ty, w, h)].every(Boolean))
  }
}
