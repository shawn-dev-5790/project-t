export interface ICard {
  id: string
  type: 'UNIT' | 'ACTION' | 'CONSTRUCTION'
  race: 'HUMAN' | 'BEAST' | 'SPIRIT'
  category: 'PHYSICAL' | 'MAGICAL' | 'RESEARCH' | 'BUILDING'
  rarity: 'COMMON' | 'MAGIC' | 'RARE' | 'LEGENDARY' | 'MYTHIC'
  name: string
  desc: string
  img: string
}

export default class Card {
  constructor(private _data: ICard) {}

  public get data() {
    return this._data
  }
}
