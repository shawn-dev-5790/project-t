/**
 * 객체 풀링을 지원하는 추상 클래스입니다.
 */
export abstract class PooledObject {
  /**
   * 현재 객체의 활성 여부를 나타냅니다.
   */
  public abstract isActive: boolean

  /**
   * 객체를 초기화하는 메서드입니다.
   */
  public abstract init(): void

  /**
   * 주기적인 업데이트를 수행하는 메서드입니다.
   * @param delta_time - 직전 업데이트 이후의 경과 시간 (초)입니다.
   */
  public abstract update(delta_time: number): void
}

/**
 * 제네릭 타입의 객체 풀 클래스입니다.
 * @template T - PooledObject를 구현한 클래스의 타입입니다.
 */
export default class GameObjectPool<T extends PooledObject> {
  private pool: T[] = []

  /**
   * GameObjectPool 클래스의 인스턴스를 생성합니다.
   * @param creator - 객체를 생성하는 생성자 함수입니다.
   * @param poolSize - 객체 풀의 크기입니다.
   */
  constructor(private creator: new () => T, private poolSize: number) {
    this.init()
  }

  // private methods

  /**
   * 객체 풀을 초기화합니다.
   * @private
   */
  private init(): void {
    this.pool = Array.from({ length: this.poolSize }, () => new this.creator())
  }

  // public methods

  /**
   * 현재 활성 상태인 모든 객체를 반환합니다.
   */
  public get allActivePooledObjects(): T[] {
    return this.pool.filter((obj) => obj.isActive)
  }

  /**
   * 비활성 상태인 객체를 가져옵니다. 만약 모든 객체가 활성 상태인 경우 null을 반환합니다.
   * 가져온 객체는 활성 상태로 변경됩니다.
   * @returns 활성화된 객체 또는 null입니다.
   */
  public getPooledObject(): T | null {
    const obj = this.pool.find((obj) => !obj.isActive)

    if (obj) {
      obj.isActive = true
      return obj
    }

    return null
  }

  /**
   * 객체를 풀에 반환합니다. 객체는 비활성 상태로 변경되고 초기화됩니다.
   * @param obj - 반환할 객체입니다. null인 경우 아무 작업도 수행하지 않습니다.
   */
  public returnPooledObject(obj: T | null): void {
    if (!obj) return

    obj.isActive = false
    obj.init()
  }

  /**
   * 여러 객체를 풀에 반환합니다.
   * @param objects - 반환할 객체들의 배열입니다.
   */
  public returnPooledObjects(objects: T[]): void {
    objects.forEach((obj) => this.returnPooledObject(obj))
  }
}
