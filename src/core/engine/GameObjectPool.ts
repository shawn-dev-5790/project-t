export abstract class PooledObject {
  public abstract isActive: boolean
  public abstract init(): void
  public abstract update(delta_time: number): void
}

export default class GameObjectPool<T extends PooledObject> {
  private pool: T[] = []

  constructor(private creator: new () => T, private poolSize: number) {
    this.init()
  }

  private init(): void {
    this.pool = Array.from({ length: this.poolSize }, () => new this.creator())
  }

  public get allActivePooledObjects(): T[] {
    return this.pool.filter((obj) => obj.isActive)
  }

  public getPooledObject(): T | null {
    const obj = this.pool.find((obj) => !obj.isActive)

    if (obj) {
      obj.isActive = true
      return obj
    }

    return null
  }

  public returnPooledObject(obj: T | null): void {
    if (!obj) return

    obj.isActive = false
    obj.init()
  }

  public retrunPooledObjects(objects: T[]) {
    objects.forEach((obj) => this.returnPooledObject(obj))
  }
}
