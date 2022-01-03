import { FbServisService } from './../../services/fbServis.service';
import { Sonuc } from './../../models/sonuc';
import { Kayit } from './../../models/kayit';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Ders } from './../../models/ders';
import { Odev } from 'src/app/models/odev';

@Component({
  selector: 'app-odev-secme',
  templateUrl: './odev-secme.component.html',
  styleUrls: ['./odev-secme.component.css'],
})
export class OdevSecmeComponent implements OnInit {
  odevler: any;
  kayitlar: any;
  dersler: any;
  secOdev: Odev = new Odev();
  secKayit: Kayit = new Kayit();
  sonuc: Sonuc = new Sonuc();
  secDers: Ders = new Ders();

  constructor(public fbServis: FbServisService) {}

  ngOnInit() {
    this.KayitListele();
    this.secKayit.key = null;
    this.DersListele();
    this.OdevListele();
  }

  OdevListele() {
    this.fbServis
      .OdevListele()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.odevler = data;
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
  DersListele() {
    this.fbServis
      .DersListele()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((data) => {
        this.dersler = data;
      });
  }
  Kaydet() {
    if (this.secKayit.key == null) {
      this.fbServis.KayitEkle(this.secKayit).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = 'Kayıt Eklendi';
      });
    } else {
      this.fbServis.KayitDuzenle(this.secKayit).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = 'Kayıt Düzenlendi';
      });
    }
  }
  DersKaydet() {
    if (this.secDers.key == null) {
      this.fbServis.DersEkle(this.secDers).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = 'Ders Eklendi';
      });
    } else {
      this.fbServis.KayitDuzenle(this.secKayit).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = 'Kayıt Düzenlendi';
      });
    }
  }
  OdevKaydet() {
    if (this.secOdev.key == null) {
      this.fbServis.OdevEkle(this.secOdev).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = 'Odev Eklendi';
      });
    } else {
      this.fbServis.KayitDuzenle(this.secKayit).then(() => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = 'Kayıt Düzenlendi';
      });
    }
  }
  Vazgec() {
    this.secKayit = new Kayit();
    this.secKayit.key = null;
    this.sonuc.islem = false;
    this.sonuc.mesaj = 'Temizlendi';
  }
}
