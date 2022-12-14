import { NgModule } from '@angular/core';

import { TasksComponent } from './tasks.component';
import { TasksRoutingModule } from './tasks-routing.module';

@NgModule({
  imports: [TasksRoutingModule],
  declarations: [TasksComponent]
})
export class TasksModule { }
