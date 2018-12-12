import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Card } from '../../models/card.model';
import { Deck } from '../../models/deck.model';
import { DrawCardsAction, ShuffleDeckAction } from '../../store/actions/deck.actions';
import { selectCurrentDeck } from '../../store/reducers/deck.reducer';

@Component({
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.scss']
})
export class ReactiveComponent {
  public currentCard$: Observable<Card>;
  public currentDeck$: Observable<Deck>;

  constructor(private store: Store<Deck>) {
    this.currentDeck$ = this.store.pipe(select(selectCurrentDeck));
  }

  onShuffleClick() {
    this.store.dispatch(new ShuffleDeckAction());
  }

  onDrawClick() {
    this.store.dispatch(new DrawCardsAction());
  }
}
