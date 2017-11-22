import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, LoadingController, Platform } from 'ionic-angular';
import { Camera, DatePicker } from 'ionic-native';
import * as moment from 'moment';
declare var window: any;


@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  public base64Image: string;
  public datainicio: string;
  public datafim: string;
  public inicio: string;
  public fim: string;

  constructor(public navCtrl: NavController, private http: Http, private loadingController: LoadingController, private platform: Platform) {

  }

  showToast(message) {
    this.platform.ready().then(() => {
      window.plugins.toast.show(message, "short", "center");
    });
  }

  onSubmit(formData) {
    if (formData.valid) {

      let loader = this.loadingController.create({
        content: "Aguarde..."
      });
      loader.present();

      var link = 'http://mdta-com-br.umbler.net/task';

      let body = {
        'title': formData.value.title,
        'description': formData.value.descrition,
        'start_date': this.inicio,
        'end_date': this.fim,
        'img': this.mySplit(this.base64Image, 1)
      }
      console.log("TCC - Enviar Tarefa Inicio Inicio : " + this.getDateNow());
      this.http.post(link, body)
        .subscribe(data => {
          console.log("TCC - Enviar Tarefa Inicio Fim : " + this.getDateNow());
          loader.dismiss()
          this.showToast("Tarefa salva com sucesso!");
        }, error => {
          console.log("TCC - Enviar Tarefa Inicio Fim : " + this.getDateNow());
          console.log("Erro " + error);
          loader.dismiss()
          this.showToast("Falha ao tentar salvar a terefa");
        });
    }
  }

  mySplit(string, nb) {
    var array = string.split(',');
    return array[nb];
  }

  toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  dateFim(): void {
    DatePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: DatePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => {
        this.datafim = date.toLocaleDateString("pt-BR")
        this.fim = date.toLocaleDateString("pt-BR")
      },
      err => { console.log('Error occurred while getting date: ', err) }
      );
  }

  dateInicio(): void {
    DatePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: DatePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      date => {
        this.datainicio = date.toLocaleDateString("pt-BR");
        this.inicio = date.toLocaleDateString("pt-BR");
      },
      err => { console.log('Error occurred while getting date: ', err) }
      );
  }

  takePicture() {
    Camera.getPicture({
      destinationType: Camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true
    }).then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      this.encodeDecode(imageData);
    }, (err) => {
      console.log(err);
    });
  }

  openGallery(): void {
    let cameraOptions = {
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.DATA_URL,
      quality: 100,
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true
    }

    Camera.getPicture(cameraOptions)
      .then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.encodeDecode(imageData);
      },
      err => console.log(err));
  }


  encodeDecode(b) {
    var base64 = b;
    console.log("TCC - Converter decode Base64 Inicio : " + this.getDateNow());
    var item = atob(base64);
    console.log("TCC - Converter decode Base64 Fim : " + this.getDateNow());

    console.log("TCC - Converter encode Base64 Inicio : " + this.getDateNow());
    btoa(item)
    console.log("TCC - Converter encode Base64 Fim : " + this.getDateNow());
  }

  getDateNow() {
    return moment().format('DD-MM-YYYY HH:mm:ss.SSSS');
  }

}
