import { Component, AfterViewInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-details-task',
  templateUrl: './details-task.component.html',
  styleUrls: ['./details-task.component.css']
})
export class DetailsTaskComponent implements AfterViewInit {
  public task = {
    description : "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl.",
    end_date : "13/1/2017",
    img : "http://dummyimage.com/118x198.jpg/ff4444/ffffff",
    start_date : "22/10/2016",
    title : "reintermediate best-of-breed metrics",
  }

  public baseUrl: string = 'http://mdta-com-br.umbler.net/task';
  id: string;
  constructor(
    public http: Http,
    public route: ActivatedRoute
  ) {

  }

  ngAfterViewInit() {
    console.log("Navegação de Paginas Fim : " + this.getDateNow());
    /* this.activatedRoute.params.subscribe((params: Params) => {
       let userId = params['id'];
       console.log(userId);
     });*/
  }
  //<a href='mailto:?subject=Task&body'>
  get() {
    let body = new FormData();
    let header = new Headers({ 'Content-type': 'application/json' });
    return this.http.get(this.baseUrl + "/" + this.id, { headers: header }).map(res => res.json(), err => err.json());
  }

  getDateNow() {
    return moment().format('DD-MM-YYYY HH:mm:ss.SSSS');
  }


}
