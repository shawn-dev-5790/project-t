import { PooledObject } from '../engine/GameObjectPool'

export class Mob implements PooledObject {
  public isActive: boolean = false
  public x: number = 0
  public y: number = 0
  public speed: number = 0.02
  private timer: number = 0

  private canUpdate(deltaTime: number): boolean {
    this.timer = this.timer >= this.speed ? 0 : deltaTime

    return this.timer >= this.speed
  }

  public init(): void {
    this.x = 0
  }
  public update(deltaTime: number): void {
    if (this.canUpdate(deltaTime)) {
      this.x += this.speed * 1000
      console.log(this.x)
    }
  }
}
