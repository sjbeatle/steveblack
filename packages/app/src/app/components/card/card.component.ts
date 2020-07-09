import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  static className = 'sb-card';
  @HostBinding(`class.invert-theme`) invertTheme = true;
  @HostBinding(`class.${CardComponent.className}`) sbCard = true;

  constructor() { }
}
