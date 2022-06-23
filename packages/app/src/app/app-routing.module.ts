import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { PerformancesComponent } from './routes/performances/performances.component';
import { ContactComponent } from './routes/contact/contact.component';
import { AdminComponent } from './routes/admin/admin.component';
import { SongsComponent } from './routes/songs/songs.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'performances',
    component: PerformancesComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'obscure-admin',
    component: AdminComponent,
  },
  {
    path: 'songs',
    component: SongsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
