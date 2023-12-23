/**
 * 게임 시간과 관련된 유틸리티 함수를 제공하는 GameTime 클래스입니다.
 */
export default class GameTime {
  /**
   * 시작 시간과 종료 시간 간의 경과 시간을 계산합니다.
   *
   * @param start - 시작 시간입니다.
   * @param end - 종료 시간입니다.
   * @returns 경과 시간 (밀리초)입니다.
   */
  static elapsed(start: number, end: number): number {
    return start - end
  }

  /**
   * 경과 시간을 초로 변환합니다.
   *
   * @param elapsed - 경과 시간 (밀리초)입니다.
   * @returns 초 단위의 경과 시간입니다.
   */
  static delta(elapsed: number): number {
    return elapsed / 1000
  }

  /**
   * 주어진 프레임 속도에 대한 프레임 간 시간 간격을 계산합니다.
   *
   * @param fps - 프레임 속도입니다 (프레임/초).
   * @returns 프레임 간 시간 간격 (밀리초)입니다.
   */
  static tick(fps: number): number {
    return 1000 / fps
  }

  /**
   * 현재 시간을 밀리초로 반환합니다.
   *
   * @returns 현재 시간 (밀리초)입니다.
   */
  static now(): number {
    return performance.now()
  }
}
