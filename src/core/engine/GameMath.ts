/**
 * 게임 수학과 관련된 유틸리티 함수를 제공하는 GameMath 클래스입니다.
 */
export default class GameMath {
  /**
   * 마름모 영역의 중심점 (tx, ty)과 대각선 길이 (r)으로 정의된 마름모 영역 내에 점 (x, y)이 있는지 여부를 결정합니다.
   *
   * @param x - 체크할 점의 X 좌표입니다.
   * @param y - 체크할 점의 Y 좌표입니다.
   * @param tx - 마름모 영역의 중심의 X 좌표입니다.
   * @param ty - 마름모 영역의 중심의 Y 좌표입니다.
   * @param r - 마름모 영역의 대각선 길이입니다.
   * @returns 마름모 영역 내에 점이 있는 경우 true이고, 그렇지 않으면 false입니다.
   */
  static isInDiamondArea = (x: number, y: number, tx: number, ty: number, r: number): boolean => {
    // 점과 중심 간의 수평 및 수직 거리를 계산합니다.
    const dx = Math.abs(x - tx)
    const dy = Math.abs(y - ty)

    // 수평 및 수직 거리의 합이 대각선 길이의 절반보다 작거나 같은지 확인합니다.
    return dx + dy <= r / 2
  }

  /**
   * 부채꼴 영역의 중심점 (tx, ty), 반지름 (r), 시작 각도 (sa), 및 끝 각도 (ea)로 정의된 부채꼴 영역 내에 점 (x, y)이 있는지 여부를 결정합니다.
   *
   * @param x - 체크할 점의 X 좌표입니다.
   * @param y - 체크할 점의 Y 좌표입니다.
   * @param tx - 부채꼴 영역의 중심의 X 좌표입니다.
   * @param ty - 부채꼴 영역의 중심의 Y 좌표입니다.
   * @param r - 부채꼴 영역의 반지름입니다.
   * @param sa - 부채꼴 영역의 시작 각도 (도)입니다.
   * @param ea - 부채꼴 영역의 끝 각도 (도)입니다.
   * @returns 부채꼴 영역 내에 점이 있는 경우 true이고, 그렇지 않으면 false입니다.
   */
  static isInFanArea = (x: number, y: number, tx: number, ty: number, r: number, sa: number, ea: number): boolean => {
    // 점과 중심 간의 수평 및 수직 거리를 계산합니다.
    const dx = tx - x
    const dy = ty - y

    // 중심에서 점까지의 벡터의 각도를 도 단위로 계산합니다.
    const angle = Math.atan2(dy, dx)
    const angleDegrees = ((angle >= 0 ? angle : 2 * Math.PI + angle) * 180) / Math.PI

    // 시작 및 끝 각도를 [0, 360) 범위 내로 조정합니다.
    const adjustedStartAngle = (sa >= 0 ? sa : 360 + sa) % 360
    const adjustedEndAngle = (ea >= 0 ? ea : 360 + ea) % 360

    // 각도가 지정된 각도 범위 내에 있는지 확인합니다.
    const isInAngleRange =
      adjustedEndAngle > adjustedStartAngle
        ? angleDegrees >= adjustedStartAngle && angleDegrees <= adjustedEndAngle
        : angleDegrees >= adjustedStartAngle || angleDegrees <= adjustedEndAngle

    // 중심에서 점까지의 거리를 계산합니다.
    const distance = Math.sqrt(dx ** 2 + dy ** 2)

    // 거리가 지정된 반지름 내에 있는지 확인합니다.
    const distanceInRange = distance <= r

    // 점이 각도 범위와 거리 범위 내에 있는 경우 true를 반환하고, 그렇지 않으면 false를 반환합니다.
    return isInAngleRange && distanceInRange
  }

  /**
   * 원형 영역의 중심점 (tx, ty)과 반지름 (r)으로 정의된 원형 영역 내에 점 (x, y)이 있는지 여부를 결정합니다.
   *
   * @param x - 체크할 점의 X 좌표입니다.
   * @param y - 체크할 점의 Y 좌표입니다.
   * @param tx - 원형 영역의 중심의 X 좌표입니다.
   * @param ty - 원형 영역의 중심의 Y 좌표입니다.
   * @param r - 원형 영역의 반지름입니다.
   * @returns 원형 영역 내에 점이 있는 경우 true이고, 그렇지 않으면 false입니다.
   */
  static isInCircularArea = (x: number, y: number, tx: number, ty: number, r: number): boolean => {
    // 점과 중심 간의 수평 및 수직 거리를 계산합니다.
    const dx = Math.abs(x - tx)
    const dy = Math.abs(y - ty)

    // 수평 및 수직 거리의 합이 반지름보다 작거나 같은지 확인합니다.
    return dx ** 2 + dy ** 2 <= r ** 2
  }

  /**
   * 직사각형 또는 정사각형 영역의 중심점 (tx, ty)과 가로 길이 (width), 세로 길이 (height)으로 정의된 영역 내에 점 (x, y)이 있는지 여부를 결정합니다.
   *
   * @param x - 체크할 점의 X 좌표입니다.
   * @param y - 체크할 점의 Y 좌표입니다.
   * @param tx - 영역의 중심의 X 좌표입니다.
   * @param ty - 영역의 중심의 Y 좌표입니다.
   * @param w - 영역의 가로 길이입니다.
   * @param h - 영역의 세로 길이입니다.
   * @returns 영역 내에 점이 있는 경우 true이고, 그렇지 않으면 false입니다.
   */
  static isInRectangleArea = (x: number, y: number, tx: number, ty: number, w: number, h: number): boolean => {
    // 점과 중심 간의 수평 및 수직 거리를 계산합니다.
    const dx = Math.abs(x - tx)
    const dy = Math.abs(y - ty)

    // 수평 및 수직 거리가 영역의 반 너비 및 반 높이보다 작거나 같은지 확인합니다.
    return dx <= w && dy <= h
  }
}
