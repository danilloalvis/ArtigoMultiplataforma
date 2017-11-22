import { routing } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdSidenavModule, MdToolbarModule, MdIconModule, MdCardModule, MdInputModule, MdSnackBarModule } from '@angular/material';
import { TaskListComponent } from './task-list/task-list.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TextMaskModule } from 'angular2-text-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsTaskComponent } from './details-task/details-task.component';
@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    TaskListComponent,
    CreateTaskComponent,
    DetailsTaskComponent,
  ],
  imports: [
    //BrowserModule
    BrowserAnimationsModule,
    MdButtonModule,
    MdSidenavModule,
    MdToolbarModule,
    MdCardModule,
    MdIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    TextMaskModule,
    MdSnackBarModule,
    MdInputModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
