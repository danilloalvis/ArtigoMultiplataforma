import { Component } from '@angular/core';
import * as moment from 'moment';
import { NavController, NavParams } from 'ionic-angular';
//import { EmailComposer } from '@ionic-native/email-composer';


@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class Details {
  task: any;
  //emailComposer: EmailComposer;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.task = this.navParams.get('item');
  }

  ngAfterViewInit(){
    console.log("TCC - Navegação de Paginas Fim : " + this.getDateNow());
  }

  geturl() {
    return this.task.img;
  }

  getDateNow() {
    return moment().format('DD-MM-YYYY HH:mm:ss.SSSS');
  }

  sendMail() {
    /*
        this.emailComposer.isAvailable().then((available: boolean) =>{
       if(available) {
           let email = {
           subject: 'Cordova Icons',
           body: this.task.json(),
           isHtml: false
         };
    
         // Send a text message using default options
         this.emailComposer.open(email);
         }
      });
    
    */
  }


}
