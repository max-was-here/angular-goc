import { Card } from '../../models/card.model';

export interface CardsResponse {
  success: boolean;
  cards: Card[];
  deck_id: string;
  remaining: number;
}

