import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { HomeComponent } from './routes/home/home.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/core/header/header.component';
import { FooterComponent } from './components/core/footer/footer.component';
import { PerformancesComponent } from './routes/performances/performances.component';
import { ContactComponent } from './routes/contact/contact.component';

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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
