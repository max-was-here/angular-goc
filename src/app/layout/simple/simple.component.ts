import { Component } from '@angular/core';
import { Card } from '../../models/card.model';
import { Deck } from '../../models/deck.model';
import { NotificationService, NotificationType } from '../../modules/notification/notification.service';
import { DeckOfCardsService } from '../../services/deck-of-cards.service';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './simple.component.html',
  styleUrls: ['./simple.component.scss']
})
export class SimpleComponent {
  public currentCard: Card = null;
  public currentDeck: Deck = null;

  constructor(
    private deckOfCardsService: DeckOfCardsService,
    private notificationService: NotificationService
  ) {}

  onShuffleClick() {
    this.deckOfCardsService.shuffleDeck().pipe(
      map(deckResponse => {
        return {
          deckId: deckResponse.deck_id,
          shuffled: deckResponse.shuffled,
          remaining: deckResponse.remaining
        };
      })
    ).subscribe(
      (deck: Deck) => this.currentDeck = deck,
        () => this.notificationService.showNotification('Ooops, we dropped the cards while shuffling!', NotificationType.error)
      );
  }

  onDrawClick() {
    if (this.currentDeck === null) {
      this.notificationService.showNotification('You must shuffle a deck before drawing a card!', NotificationType.error);
    } else {
      this.deckOfCardsService.drawCards(this.currentDeck.deckId)
        .subscribe(cardResponse => {
          this.currentCard = cardResponse.cards[0];
          this.currentDeck.remaining = cardResponse.remaining;
        },
          () => this.notificationService.showNotification('Cards stuck, drawing failed.', NotificationType.error)
        );
    }
  }
}
