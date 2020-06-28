import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  static className = 'sb-card';
  @HostBinding(`class.invert-theme`) invertedTheme = true;
  @HostBinding(`class.${CardComponent.className}`) sbCard = true;

  constructor() { }
}
