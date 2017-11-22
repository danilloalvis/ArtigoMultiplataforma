import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  public baseUrl: string = 'http://mdta-com-br.umbler.net/task';  

  public form: FormGroup;
  public base64: any = '';
  public imgPhoto: any = 'Anexar Imagem';

  public mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  constructor(public http: Http) {

  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      img: new FormControl('', Validators.required),
      start_date: new FormControl('', Validators.required),
      end_date: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  onSubmit(valid, value) {

    if (valid) {
      this.create(value).subscribe(res => {
        this.alerta('Item Salvo com sucesso');
        this.form.reset();
        this.base64 = "";
      }, err => {
        this.alerta('Falha ao Salvar Item');
      });
    }
  }

  create(body) {
    let header = new Headers({ 'Content-type': 'application/json' });

    console.log("Enviar Tarefa Inicio Inicio : " + this.getDateNow());
    return this.http.post(this.baseUrl, body, { headers: header }).map(
      (res) => {
        console.log("Enviar Tarefa Inicio Fim : " + this.getDateNow());
        res.json();
      }, (err) => {
        err.json();
      });
  }

  alerta(msn) {
    alert(msn);
  }

  ngAfterContentInit() {
    this.form.reset();
    this.base64 = "";
  }


  fileChange(event: any) {
    var files = event.target.files;
    var file = files[0];
    this.base64 = '';
    this.imgPhoto = file.name;
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handlePhotoLoaded.bind(this);
      reader.readAsBinaryString(file);
    } else {
      this.imgPhoto = 'Anexar Imagem';
    }
  }

  _handlePhotoLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64 = btoa(binaryString);
    this.encodeDecode(this.base64);

    this.form.controls.img.setValue(this.base64);
  }

  getDateNow() {
    return moment().format('DD-MM-YYYY HH:mm:ss.SSSS');
  }

  encodeDecode(b) {
    var base64 = b;
    console.log("Converter decode Base64 Inicio : " + this.getDateNow());
    var item = atob(base64);
    console.log("Converter decode Base64 Fim : " + this.getDateNow());

    console.log("Converter encode Base64 Inicio : " + this.getDateNow());
    btoa(item);
    console.log("Converter encode Base64 Fim : " + this.getDateNow());
  }


}
