import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ThemeService } from './services/theme.service';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  previousUrl = '';
  title = 'Steve Black';

  constructor(private themeService: ThemeService, private renderer: Renderer2, private router: Router) {
    this.router.events
      .subscribe((ev) => {
        if (ev instanceof NavigationStart) {
          const currentUrl = ev.url.slice(1).split('/')[0].split('?')[0].split('#')[0];
          if (this.previousUrl) {
            this.renderer.removeClass(document.body, this.previousUrl);
          }
          if (currentUrl) {
            this.renderer.addClass(document.body, currentUrl);
          }
          this.previousUrl = currentUrl;
        }
      });
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.themeService.fetchTheme();
  }
}
