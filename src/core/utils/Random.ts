export default class Random {
  static getRandomItemFormArray(array: any[]): any {
    const length = array.length
    const randomIndex = Math.floor(Math.random() * length)
    return array[randomIndex]
  }
}
