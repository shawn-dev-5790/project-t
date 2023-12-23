import Parser from '../../utils/Parser'
import TILES_JSON from './Tile.data.json'

const TILES_MAP = Parser.parseArrayToMap(TILES_JSON)

export interface ITile {
  id: string
  name: string
  isMovable: boolean
  isPlacable: boolean
  events: string[]
}

export default class Tile {
  constructor(private id: ITile['id']) {}

  static init() {
    return new Tile('empty')
  }

  private get tile() {
    return TILES_MAP.get(this.id)
  }

  public get name() {
    return this.tile?.name || ''
  }
  public get isMovable() {
    return this.tile?.isMovable || false
  }
  public get isPlacable() {
    return this.tile?.isPlacable || false
  }
  public get events(): string[] {
    return this.tile?.events || []
  }
}
