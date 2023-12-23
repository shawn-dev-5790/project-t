import GameMatrix from '../../engine/GameMatrix'
import Random from '../../utils/Random'
import Tile, { ITile } from './Tile'
import TILES_JSON from './Tile.data.json'

export default class TileFactory {
  static createTileMatrix(rows: number, cols: number, tileMatrixData: ITile[][]): GameMatrix<Tile> {
    const tileMatrix = new GameMatrix<Tile>(rows, cols, Tile.init())
    for (let y = 0; y < cols; y++) {
      for (let x = 0; x < rows; x++) {
        tileMatrix.set(x, y, new Tile(tileMatrixData[x][y].id))
      }
    }
    return tileMatrix
  }
  static generateRandomTileMatrixData(rows: number, cols: number): ITile[][] {
    return Array.from({ length: cols }, () => new Array(rows).fill(Random.getRandomItemFormArray(TILES_JSON)))
  }
}
