import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  public baseUrl: string = 'http://mdta-com-br.umbler.net/api';
  tasks: any = [];
  constructor(public http: Http, public router: Router) { }

  ngOnInit() {
    this.list().subscribe(res => {
      console.log("Object to json  Inicio : " + this.getDateNow());
      var save = JSON.stringify(res);
      console.log("Object to json  Fim : " + this.getDateNow());

      console.log("Armazenar Tarefas Inicio : " + this.getDateNow());
      localStorage.setItem('tasks', save);
      console.log("Armazenar Tarefas Inicio : " + this.getDateNow());

      this.tasks = res;
    }, err => {
      console.log("Ler Tarefas Inicio : " + this.getDateNow());
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
      console.log("Ler Tarefas Fim : " + this.getDateNow());
    })
  }

  list() {
    let body = new FormData();
    let header = new Headers({ 'Content-type': 'application/json' });
    return this.http.get(this.baseUrl, { headers: header }).map(res => {
      console.log("json to Object  Inicio : " + this.getDateNow());
      var a = res.json();
      console.log("json to Object  Fim : " + this.getDateNow());

      return a;
    }, err => err.json());
  }
  goToProductDetails(id) {
    console.log("Navegação de Paginas Inicio : " + this.getDateNow());
    this.router.navigate(['/detalhes']);
  }

  getDateNow() {
    return moment().format('DD-MM-YYYY HH:mm:ss.SSSS');
  }


}
