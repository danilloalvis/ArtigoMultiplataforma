import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoadingController } from 'ionic-angular';
import {HttpProvider} from '../providers/http-provider';
import { Storage } from '@ionic/storage';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

declare var window: any;

@Component({
  templateUrl: 'app.html',
  providers:[HttpProvider]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Page1;
  currentPage: any;


  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen, 
    private httpProvider :HttpProvider, 
    private loadingController: LoadingController,
    private toast: ToastController,
    private storage: Storage){
    this.initializeApp();
this.statusBar.backgroundColorByHexString('#3F51B5');
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Tarefas', component: Page1 },
      { title: 'Nova Tarefa', component: Page2 },
      { title: 'Sincronizar', component: Page1 },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  showToast(message) {
  let toast = this.toast.create({
    message: message,
    duration: 3000,
    position: 'center'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title == "Tarefas"){
      this.nav.setRoot(Page1);
      this.currentPage = Page1;
    }else if(page.title == "Nova Tarefa"){
      this.nav.setRoot(Page2);
      this.currentPage = Page2;
    }else if(page.title == "Sincronizar"){
      this.updatedata();
    }
  }

  updatedata(){
    let loader = this.loadingController.create({
      content: "Aguarde..."
    });
    loader.present();

    this.httpProvider.getJsonData().subscribe(
      result => {
        var items = result;
        console.log("Success : "+ JSON.stringify(items));
        this.storage.ready().then(() => {
          this.storage.set('mytask', JSON.stringify(items));
          loader.dismiss()
          this.showToast("Tarefas Atualizado com Sucesso!");
        });
      },
      err =>{
        console.error("Error : "+err);
          loader.dismiss();
          this.showToast("Falha ao tentar atualizar tarefas!");
      } ,
      () => {
        console.log('getData completed');

      }
    );

  }

}
