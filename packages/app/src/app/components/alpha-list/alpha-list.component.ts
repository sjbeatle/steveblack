import { Component, HostBinding, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alpha-list',
  templateUrl: './alpha-list.component.html',
  styleUrls: ['./alpha-list.component.scss']
})
export class AlphaListComponent {
  @Input() showTop = false;
  @Input() parentSelector = '';
  @Input()
  showLetters = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];
  alphabet = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' ];
  currentRoute = this.activatedRoute.url;

  constructor(private activatedRoute: ActivatedRoute) { }

  scrollToSection(section: string) {
    const $parentEl = document.querySelector(this.parentSelector);
    const parentTop = $parentEl.getBoundingClientRect().top;
    const pad = this.parentSelector === 'html' ? 0 : parentTop;
    const childTop = document.querySelector('app-song-list [name=' + section + ']').getBoundingClientRect().top;
    $parentEl.scrollTo({top: $parentEl.scrollTop + childTop - pad, behavior: 'smooth'});
  }
}
