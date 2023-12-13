import { Injectable } from '@angular/core';
import { ICard } from '../models/card.model';

export interface IDeck {
  id: number;
  name: string;
  type: string;
  cards: ICard[];
}

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  constructor() {}

  get = () => {
    const data = localStorage.getItem('decks');

    const resp = (JSON.parse(data) as IDeck[]) ?? [];

    return resp;
  };

  getById = (id: number) => {
    return this.get().find((d) => d.id == id);
  };

  post = (deck: IDeck) => {
    const Decks = this.get() ?? [];

    const ids = Decks.flatMap((a) => a.id);

    deck.id = Decks.length > 0 ? Math.max(...ids) + 1 : 1;

    Decks.push(deck);
    localStorage.setItem('decks', JSON.stringify(Decks));

    return deck.id;
  };

  update = (deck: IDeck) => {
    const deckList = this.get();

    const deckBase = deckList.findIndex((d) => d.id == deck.id);

    deckList[deckBase] = deck;

    localStorage.setItem('decks', JSON.stringify(deckList));

    return deck.id;
  };

  delete = (deck: IDeck) => {
    const Decks = this.get() ?? [];

    const index = Decks.findIndex((f) => deck.id === f.id);

    Decks.splice(index, 1);

    localStorage.setItem('decks', JSON.stringify(Decks));
  };

  postCard = (card: ICard, deck: IDeck) => {
    deck.cards.push(card);
    return deck;
  };

  deleteCard = (index: number, deck: IDeck) => {
    deck.cards.splice(index, 1);
    return deck;
  };
}
