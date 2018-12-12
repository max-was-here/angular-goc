import { createFeatureSelector, createSelector } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { Card } from '../../models/card.model';
import { Deck } from '../../models/deck.model';
import { DeckActions, DeckActionTypes } from '../actions/deck.actions';

export interface DeckState {
  deck: Deck;
  // Drawn cards is a stack, which means last drawn will be on top (index 0)
  drawnCards: Card[];
}

export const initialDeckState: DeckState = {
  deck: null,
  drawnCards: []
};

export function deckReducer(state: DeckState = initialDeckState, action: DeckActions): DeckState {
  switch (action.type) {
    case DeckActionTypes.SHUFFLE_DECK_SUCCESS:
      // Flush drawn cards and set the new deck
      return {drawnCards: [], deck: action.payload.deck};
    case DeckActionTypes.DRAW_CARDS_SUCCESS:
      // Clone the current state since we can't... should not edit it
      const stateCopy = cloneDeep(state);
      // Prepend drawn cards
      action.payload.cardsResponse.cards.forEach((card) => stateCopy.drawnCards.unshift(card));
      return stateCopy;

    default:
      return state;
  }
}

export const selectDeckState = createFeatureSelector<DeckState>('deck');

// Current client selectors
export const selectCurrentDeck = createSelector(selectDeckState, (state: DeckState) => state.deck);
export const selectCurrentDeckId = createSelector(selectCurrentDeck, (deck: Deck) => deck ? deck.deckId : null);
