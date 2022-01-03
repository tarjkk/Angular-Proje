import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { OdevAdiComponent } from './components/odev-adi/odev-adi.component';
import { HomeComponent } from './components/home/home.component';
import { OdevSecmeComponent } from './components/odev-secme/odev-secme.component';
import { OdevListesiComponent } from './components/odev-listesi/odev-listesi.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OdevListesiComponent,
    OdevSecmeComponent,
    OdevAdiComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
