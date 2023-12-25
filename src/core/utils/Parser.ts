/**
 * 유틸리티 클래스로 배열을 Map으로 변환하거나, 2중 배열을 1중 배열로 평탄화합니다.
 */
export default class Parser {
  /**
   * 배열을 Map으로 변환합니다.
   * @param array - 변환할 배열
   * @returns 변환된 Map
   */
  static parseArrayToMap<T extends { id: string }>(array: T[]): Map<string, T> {
    return array.reduce((map, item) => {
      map.set(item.id, item)
      return map
    }, new Map<string, T>())
  }

  /**
   * 2중 배열을 1중 배열로 평탄화합니다.
   * @param arr - 평탄화할 배열
   * @returns 평탄화된 배열
   */
  static parseArrayToFlatten(arr: any[]): any[] {
    return arr.reduce((acc, val) => (Array.isArray(val) ? acc.concat(this.parseArrayToFlatten(val)) : acc.concat(val)), [])
  }
}
