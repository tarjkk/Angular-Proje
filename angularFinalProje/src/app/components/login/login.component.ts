import { FbServisService } from './../../services/fbServis.service';
import { Sonuc } from './../../models/sonuc';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  sonuc: Sonuc = new Sonuc();
  constructor(public fbServis: FbServisService, public router: Router) {}

  ngOnInit() {}

  GirisYap(mail: string, parola: string) {
    this.fbServis.OturumAc(mail, parola).then(
      (d: any) => {
        localStorage.setItem('user', JSON.stringify(d.user));
        this.router.navigate(['/']);
      },
      (err) => {
        this.sonuc.islem = false;
        this.sonuc.mesaj = 'E-Posta Adresi veya Parola Geçersizdir.';
      }
    );
  }
}
