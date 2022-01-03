import { Ders } from './../models/ders';
import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { Kayit } from '../models/kayit';
import { Odev } from '../models/odev';
import { Uye } from '../models/uye';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class FbServisService {
  private dbKayit = '/Kayitlar';
  private dbDers = '/Dersler';
  private dbOdev = '/OdevAdlari';
  private dbUye = '/Uyeler';

  kayitRef: AngularFireList<Kayit>;
  dersRef: AngularFireList<Ders>;
  odevRef: AngularFireList<Odev>;
  uyeRef: AngularFireList<Uye>;

  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth) {
    this.kayitRef = db.list(this.dbKayit);
    this.dersRef = db.list(this.dbDers);
    this.odevRef = db.list(this.dbOdev);
    this.uyeRef = db.list(this.dbUye);
  }

  OdevListele() {
    return this.odevRef;
  }
  OdevEkle(odev: Odev) {
    return this.odevRef.push(odev);
  }

  DersListele() {
    return this.dersRef;
  }

  DersEkle(ders: Ders) {
    return this.dersRef.push(ders);
  }

  OturumAc(mail: string, parola: string) {
    return this.afAuth.signInWithEmailAndPassword(mail, parola);
  }

  OturumKapat() {
    return this.afAuth.signOut();
  }
  OturumKontrol() {
    if (localStorage.getItem('user')) {
      return true;
    } else {
      return false;
    }
  }

  UyeOl(uye: Uye) {
    return this.afAuth.createUserWithEmailAndPassword(uye.mail, uye.parola);
  }

  UyeEkle(uye: Uye) {
    return this.uyeRef.push(uye);
  }

  KayitListele() {
    return this.kayitRef;
  }
  KayitEkle(kayit: Kayit) {
    return this.kayitRef.push(kayit);
  }
  KayitDuzenle(kayit: Kayit) {
    return this.kayitRef.update(kayit.key, kayit);
  }
  KayitSil(key: string) {
    return this.kayitRef.remove(key);
  }
}
