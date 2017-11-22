import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tarefas';
  @ViewChild('sidenav') sidenav: any;
  menuOpen: boolean = false;


  menuController() {
    this.menuOpen = !this.menuOpen;

    if (this.menuOpen) {
      this.sidenav.open();
    } else {
      this.sidenav.close();
    }
  }
}
