import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { SharedModule } from '../../shared/shared.module';

import { TasksListComponent } from './tasks-list.component';
import { TasksListRoutingModule } from './tasks-list-routing.module';

@NgModule({
  imports: [
    SharedModule,
    MatTableModule,
    TasksListRoutingModule,
  ],
  declarations: [TasksListComponent]
})
export class TasksListModule { }
