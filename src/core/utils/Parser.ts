export default class Parser {
  static parseArrayToMap<T extends { id: string }>(array: T[]): Map<string, T> {
    const map = new Map<string, T>()
    for (const item of array) {
      map.set(item.id, item)
    }
    return map
  }
}
