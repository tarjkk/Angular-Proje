import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Ders } from 'src/app/models/ders';
import { Kayit } from 'src/app/models/kayit';
import { Sonuc } from 'src/app/models/sonuc';
import { FbServisService } from './../../services/fbServis.service';

@Component({
  selector: 'app-odev-adi',
  templateUrl: './odev-adi.component.html',
  styleUrls: ['./odev-adi.component.css'],
})
export class OdevAdiComponent implements OnInit {
  odevler: any;
  kayitlar: any;
  dersler: any;
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
}
