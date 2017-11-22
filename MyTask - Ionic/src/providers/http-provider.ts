import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import moment from 'moment';
import * as moment from 'moment';
/*
  Generated class for the HttpProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HttpProvider {

  constructor(public http: Http) {
    console.log('Hello HttpProvider Provider');
  }

  getJsonData() {

    var resp = this.http.get('http://mdta-com-br.umbler.net/task');

    console.log("Conectar  Inicio : " + this.getDateNow());
    var json = resp.map(res => {
      console.log("Conectar  Fim : " + this.getDateNow());
      console.log("Json to object  Inicio : " + this.getDateNow());
      res.json()
      console.log("Json to object  Fim : " + this.getDateNow());
    });

    return json;
  }

  getDateNow() {
    return moment().format('DD-MM-YYYY HH:mm:ss SSS');
  }

}
