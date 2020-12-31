import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PerformancesListComponent } from './components/performances-list/performances-list.component';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/core/header/header.component';
import { FooterComponent } from './components/core/footer/footer.component';
import { PerformancesComponent } from './routes/performances/performances.component';
import { ContactComponent } from './routes/contact/contact.component';
import { HeroComponent } from './components/hero/hero.component';
import { AdminComponent } from './routes/admin/admin.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { TextComponent } from './components/inputs/text/text.component';
import { EllipsifyMeDirective } from './ellipsify-me.directive';
import { AlphaListComponent } from './components/alpha-list/alpha-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SpinnerComponent,
    CardComponent,
    HeaderComponent,
    FooterComponent,
    PerformancesComponent,
    ContactComponent,
    HeroComponent,
    PerformancesListComponent,
    AdminComponent,
    SongListComponent,
    TextComponent,
    EllipsifyMeDirective,
    AlphaListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
