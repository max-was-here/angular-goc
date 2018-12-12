import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Card } from '../../models/card.model';
import { Deck } from '../../models/deck.model';
import { NotificationService, NotificationType } from '../../modules/notification/notification.service';
import { DeckOfCardsService } from '../../services/deck-of-cards.service';

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
    this.notificationService.showNotification('Not implemented yet!', NotificationType.error);
    // Shuffle the deck
    // this.deckOfCardsService.shuffleDeck().pipe(
    //   // Transform response into Deck model
    //   map(deckResponse => {
    //     return {
    //       deckId: deckResponse.deck_id,
    //       shuffled: deckResponse.shuffled,
    //       remaining: deckResponse.remaining
    //     };
    //   })
    // ).subscribe(
    //   // On success, updated our currentDeck object, on failure display error notification
    //   (deck: Deck) => this.currentDeck = deck,
    //   () => this.notificationService.showNotification('Ooops, we dropped the cards while shuffling!', NotificationType.error)
    // );
  }

  onDrawClick() {
    if (this.currentDeck === null) {
      // We can't draw cards from the void... Deck must be shuffled first !
      this.notificationService.showNotification('You must shuffle a deck before drawing a card!', NotificationType.error);
    } else {
      this.deckOfCardsService.drawCards(this.currentDeck.deckId)
        .subscribe(cardResponse => {
            // Update our topmost card and remaining cards
            this.currentCard = cardResponse.cards[0];
            this.currentDeck.remaining = cardResponse.remaining;
          },
          () => this.notificationService.showNotification('Cards stuck, drawing failed.', NotificationType.error)
        );
    }
  }
}
