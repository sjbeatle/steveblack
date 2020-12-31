import { Component, HostBinding, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alpha-list',
  templateUrl: './alpha-list.component.html',
  styleUrls: ['./alpha-list.component.scss']
})
export class AlphaListComponent {
  @Input() showTop = false;
  @Input() showLetters = [];
  alphabet = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];
  currentRoute = this.activatedRoute.url;

  constructor(private activatedRoute: ActivatedRoute) { }
}
