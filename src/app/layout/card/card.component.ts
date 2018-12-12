import { Component, Input } from '@angular/core';
import { Card } from '../../models/card.model';

@Component({
  selector: 'goc-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() public card: Card;
}
