import { CreateTaskComponent } from './create-task/create-task.component';
import { DetailsTaskComponent } from './details-task/details-task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const APP_ROUTES: Routes = [
    { path: '', component: TaskListComponent },
    { path: 'home', component: TaskListComponent },
    { path: 'detalhes', component: DetailsTaskComponent },
    { path: 'criar', component: CreateTaskComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);