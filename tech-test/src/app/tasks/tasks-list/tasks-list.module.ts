import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { SharedModule } from '../../shared/shared.module';

import { TasksListComponent } from './tasks-list.component';
import { TasksListRoutingModule } from './tasks-list-routing.module';

@NgModule({
  imports: [
    SharedModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    TasksListRoutingModule,
  ],
  declarations: [TasksListComponent]
})
export class TasksListModule { }
