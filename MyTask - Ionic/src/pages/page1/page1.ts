import { HttpProvider } from './../../providers/http-provider';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Details } from '../details/details';
import { LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';


@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  providers: [HttpProvider]
})
export class Page1 {
  items: any;

  constructor(public navCtrl: NavController, private loadingController: LoadingController, private storage: Storage, public http: Http) {
    this.getdata();
  }

  getdata() {
    let loader = this.loadingController.create({
      content: "Aguarde..."
    });
    loader.present();
    this.http.get('http://mdta-com-br.umbler.net/api').subscribe(res => {
      loader.dismiss();
      console.log("TCC - Json to object Inicio: " + this.getDateNow());
      this.items = res.json();
      console.log("TCC - Json to object Fim: " + this.getDateNow());

      console.log("TCC - Object to json Inicio: " + this.getDateNow());
      var save = JSON.stringify(this.items);
      console.log("TCC - Object to json Fim: " + this.getDateNow());

      console.log("TCC - Armazenar Tarefas Inicio : " + this.getDateNow());
      this.storage.set('mytask', save).then(() => {
        console.log("TCC - Armazenar Tarefas Fim : " + this.getDateNow());
      }, err => {
        console.error(err);
        loader.dismiss();
      });

    });
  }

  getDateNow() {
    return moment().format('DD-MM-YYYY HH:mm:ss.SSSS');
  }

  itemTapped(event, item) {
    console.log("TCC - Navegação de Paginas Inicio : " + this.getDateNow());
    this.navCtrl.push(Details, {
      item: item
    });
  }
}
