import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { OdevSecmeComponent } from './components/odev-secme/odev-secme.component';
import { OdevListesiComponent } from './components/odev-listesi/odev-listesi.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OdevAdiComponent } from './components/odev-adi/odev-adi.component';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';

const redirectLogin = () => redirectUnauthorizedTo(['login']);
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLogin,
    },
  },
  { path: 'odev-listesi', component: OdevListesiComponent },
  { path: 'odev-secme', component: OdevSecmeComponent },
  { path: 'odev-adi', component: OdevAdiComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
