interface IArea<T> {
  x: number
  y: number
  v: T
}
export default class Matrix<T> {
  private matrix: T[][] = []

  constructor(x: number, y: number, value: T) {
    this.matrix = Array.from({ length: y }, () => new Array(x).fill(value))
  }

  public get data(): T[][] {
    return this.matrix
  }

  public get(x: number, y: number): T {
    return this.matrix[y][x]
  }
  public set(x: number, y: number, value: T): void {
    if (!this.isValidSize(x, y)) return
    this.matrix[y][x] = value
  }
  public getDiamondArea(x: number, y: number, r: number): IArea<T>[] {
    const isInDiamondArea = (tx: number, ty: number) => Math.abs(x - tx) + Math.abs(y - ty) <= r

    let area = []
    for (let ty = y - r; ty <= y + r; ty++) {
      for (let tx = x - r; tx <= x + r; tx++) {
        if ([this.isValidSize(tx, ty), isInDiamondArea(tx, ty)].every(Boolean)) {
          area.push({ x: tx, y: ty, v: this.get(tx, ty) })
        }
      }
    }

    return area
  }
  public getFanArea(x: number, y: number, r: number, sa: number, ea: number): IArea<T>[] {
    const isInFanArea = (tx: number, ty: number, r: number, sa: number, ea: number) => {
      const dx = tx - x
      const dy = ty - y
      const angle = Math.atan2(dy, dx)
      const angleDegrees = ((angle >= 0 ? angle : 2 * Math.PI + angle) * 180) / Math.PI

      const adjustedStartAngle = (sa >= 0 ? sa : 360 + sa) % 360
      const adjustedEndAngle = (ea >= 0 ? ea : 360 + ea) % 360

      const isInAngleRange =
        adjustedEndAngle > adjustedStartAngle ? angleDegrees >= adjustedStartAngle && angleDegrees <= adjustedEndAngle : angleDegrees >= adjustedStartAngle || angleDegrees <= adjustedEndAngle

      const distance = Math.sqrt(dx ** 2 + dy ** 2)
      const distanceInRange = distance <= r

      return isInAngleRange && distanceInRange
    }

    let area = []
    for (let ty = y - r; ty <= y + r; ty++) {
      for (let tx = x - r; tx <= x + r; tx++) {
        if ([this.isValidSize(tx, ty), isInFanArea(tx, ty, r, sa, ea)].every(Boolean)) {
          area.push({ x: tx, y: ty, v: this.get(tx, ty) })
        }
      }
    }

    return area
  }

  // privates
  private isValidSize(x: number, y: number): boolean {
    return y > -1 && y < this.matrix.length && x > -1 && x < this.matrix[0].length
  }
}
