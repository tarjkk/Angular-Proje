import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Sonuc } from 'src/app/models/sonuc';
import { Kayit } from './../../models/kayit';
import { Router } from '@angular/router';
import { FbServisService } from './../../services/fbServis.service';
import { Uye } from 'src/app/models/uye';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  adsoyad!: any;
  uid!: any;
  kayitlar: any;
  ara: string = '';
  sira: string = 'odevId';
  sayfa: number = 1;
  limit: number = 10;
  secKayit: Kayit = new Kayit();
  sonuc: Sonuc = new Sonuc();
  secUye: Uye = new Uye();
  ekleduzenle: boolean = false;

  constructor(public fbServis: FbServisService, public router: Router) {}

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('user') || '{}');
    this.uid = user.uid;
    this.adsoyad = user.displayName;
    this.KayitListele();
  }

  KayitDuzenle(kayit: Kayit) {
    Object.assign(this.secKayit, kayit);
  }

  KayitSil(kayit: Kayit) {
    this.fbServis.KayitSil(kayit.key).then(() => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = 'Kayıt Silindi';
    });
  }

  KayitListele() {
    this.fbServis
      .KayitListele()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.kayitlar = data;
      });
  }
  Kaydet() {
    var tarih = new Date();
    if (this.secKayit.key == null) {
      this.secKayit.islem = false;
      this.fbServis.KayitEkle(this.secKayit).then((d) => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = 'Kayıt Eklendi';
      });
    } else {
      this.secKayit.islem = false;
      this.fbServis.KayitDuzenle(this.secKayit).then((d) => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = 'Kayıt Güncellendi';
      });
    }
  }
  OturumuKapat() {
    this.fbServis.OturumKapat().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }
}
