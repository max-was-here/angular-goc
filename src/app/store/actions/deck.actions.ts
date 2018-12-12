import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Deck } from '../../models/deck.model';
import { CardsResponse } from '../../services/dto/cards-response.dto';

export enum DeckActionTypes {
  SHUFFLE_DECK = '[deck] shuffle',
  SHUFFLE_DECK_SUCCESS = '[deck] shuffle success',
  SHUFFLE_DECK_ERROR = '[deck] shuffle error',
  DRAW_CARDS = '[deck] draw cards',
  DRAW_CARDS_SUCCESS = '[deck] draw cards success',
  DRAW_CARDS_ERROR = '[deck] draw cards error'
}

export class ShuffleDeckAction implements Action {
  public readonly type = DeckActionTypes.SHUFFLE_DECK;
  public constructor(public payload: {count?: number} = {}) {}
}

export class ShuffleDeckSuccessAction implements Action {
  public readonly type = DeckActionTypes.SHUFFLE_DECK_SUCCESS;
  public constructor(public payload: {deck: Deck}) {}
}

export class ShuffleDeckErrorAction implements Action {
  public readonly type = DeckActionTypes.SHUFFLE_DECK_ERROR;
  public constructor(public payload: {message: string, httpError?: HttpErrorResponse}) {}
}

export class DrawCardsAction implements Action {
  public readonly type = DeckActionTypes.DRAW_CARDS;
  public constructor(public payload: {count?: number} = {}) {}
}

export class DrawCardsSuccessAction implements Action {
  public readonly type = DeckActionTypes.DRAW_CARDS_SUCCESS;
  public constructor(public payload: {cardsResponse: CardsResponse}) {}
}

export class DrawCardsErrorAction implements Action {
  public readonly type = DeckActionTypes.DRAW_CARDS_ERROR;
  public constructor(public payload: {message: string, httpError?: HttpErrorResponse}) {}
}

export type DeckActions = ShuffleDeckAction |
  ShuffleDeckSuccessAction |
  ShuffleDeckErrorAction |
  DrawCardsAction |
  DrawCardsSuccessAction |
  DrawCardsErrorAction;
