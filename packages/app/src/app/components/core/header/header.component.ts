import { Component, HostBinding, OnInit } from '@angular/core';
import { faAdjust } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faYoutube, faPaypal } from '@fortawesome/free-brands-svg-icons';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @HostBinding('class.container-fluid') container = true;
  faAdjust = faAdjust;
  faFacebook = faFacebook;
  faYoutube = faYoutube;
  faPaypal = faPaypal;

  constructor(public themeService: ThemeService) { }

  get themeLabel() {
    return `Toggle theme (${this.themeService.theme} currently enabled)`;
  }

  ngOnInit() {
  }

}
