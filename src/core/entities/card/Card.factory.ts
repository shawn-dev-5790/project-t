import Card, { ICard } from './Card'
import CARD_DATA from './Card.data.json'

export default class CardFactory {
  public static cards: Map<ICard['id'], Card> = new Map(CARD_DATA.map((card) => [card.id, new Card(card as ICard)]))
  public static createById(id: ICard['id']): Card | null {
    return this.cards.get(id) || null
  }
}
