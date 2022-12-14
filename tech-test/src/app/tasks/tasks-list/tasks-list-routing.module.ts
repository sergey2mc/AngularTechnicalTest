import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetTasksResolver } from '../../core/resolvers/get-tasks.resolver';

import { TasksListComponent } from './tasks-list.component';

const routes: Routes = [
  {
    path: '',
    component: TasksListComponent,
    resolve: [GetTasksResolver],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksListRoutingModule { }
