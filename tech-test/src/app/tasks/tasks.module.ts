import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { TasksComponent } from './tasks.component';
import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  imports: [
    SharedModule,
    TasksRoutingModule,
  ],
  declarations: [TasksComponent]
})
export class TasksModule { }
