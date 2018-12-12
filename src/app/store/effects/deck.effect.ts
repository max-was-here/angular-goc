import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Deck } from '../../models/deck.model';
import { NotificationService, NotificationType } from '../../modules/notification/notification.service';
import { DeckOfCardsService } from '../../services/deck-of-cards.service';
import { CardsResponse } from '../../services/dto/cards-response.dto';
import {
  DeckActionTypes,
  DrawCardsAction, DrawCardsErrorAction, DrawCardsSuccessAction,
  ShuffleDeckAction,
  ShuffleDeckErrorAction,
  ShuffleDeckSuccessAction
} from '../actions/deck.actions';
import { selectCurrentDeckId } from '../reducers/deck.reducer';


@Injectable()
export class DeckEffects {
  public constructor(
    private actions$: Actions,
    private store: Store<Deck>,
    private deckOfCardsService: DeckOfCardsService,
    private notificationService: NotificationService
  ) {}

  /* Actions Related Effects */
  @Effect()
  public shuffleDeck$: Observable<Action> = this.actions$.pipe(
    ofType(DeckActionTypes.SHUFFLE_DECK),
    withLatestFrom(this.store.pipe(select(selectCurrentDeckId))),
    switchMap(([action, deckId]: [ShuffleDeckAction, string]) =>
      this.deckOfCardsService.shuffleDeck(deckId, action.payload.count).pipe(
        map(deckResponse => {
          return {
            deckId: deckResponse.deck_id,
            shuffled: deckResponse.shuffled,
            remaining: deckResponse.remaining
          };
        }),
        map((deck: Deck) => new ShuffleDeckSuccessAction({deck})),
        catchError((httpError: HttpErrorResponse) => of(
          new ShuffleDeckErrorAction({message: 'Ooops, we dropped the cards while shuffling!', httpError}
          )
        ))
      )
    )
  );

  @Effect()
  public drawCards$: Observable<Action> = this.actions$.pipe(
    ofType(DeckActionTypes.DRAW_CARDS),
    withLatestFrom(this.store.pipe(select(selectCurrentDeckId))),
    switchMap(([action, deckId]: [DrawCardsAction, string]) => {
      if (deckId) {
        return this.deckOfCardsService.drawCards(deckId, action.payload.count).pipe(
          map((cardsResponse: CardsResponse) => new DrawCardsSuccessAction({cardsResponse})),
          catchError((httpError: HttpErrorResponse) => of(
            new DrawCardsErrorAction({message: 'Cards stuck, drawing failed.', httpError}
            )
          ))
        );
      } else {
        return of(new DrawCardsErrorAction({message: 'You must shuffle a deck before drawing a card!'}));
      }
    })
  );

  // /* Message Related Effects */
  @Effect({ dispatch: false })
  public manageErrors$: Observable<any> = this.actions$.pipe(
    ofType(DeckActionTypes.SHUFFLE_DECK_ERROR, DeckActionTypes.DRAW_CARDS_ERROR),
    tap(action => this.notificationService.showNotification(action.payload.message, NotificationType.error))
  );
}
