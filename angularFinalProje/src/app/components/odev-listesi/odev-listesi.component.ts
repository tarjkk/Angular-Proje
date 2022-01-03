import { Kayit } from './../../models/kayit';
import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/sonuc';
import { FbServisService } from './../../services/fbServis.service';
import { map } from 'rxjs/operators';
import { Ders } from 'src/app/models/ders';

@Component({
  selector: 'app-odev-listesi',
  templateUrl: './odev-listesi.component.html',
  styleUrls: ['./odev-listesi.component.css'],
})
export class OdevListesiComponent implements OnInit {
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
