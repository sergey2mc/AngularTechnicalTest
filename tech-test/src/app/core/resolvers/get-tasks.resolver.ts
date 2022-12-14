import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { RequestStatus } from 'ngxs-requests-plugin';

import { Observable } from 'rxjs';
import { filter, mapTo, take } from 'rxjs/operators';

import { TaskService } from '../services/task.service';

@Injectable({
  providedIn: 'root',
})
export class GetTasksResolver implements Resolve<Observable<boolean>>
{
  constructor(
    private taskService: TaskService,
  ) {}

  resolve(): Observable<boolean> {
    this.taskService.getTasks();
    return this.taskService.getTasksRequest$.pipe(
      filter(({ loaded, status }) => loaded && status === RequestStatus.Success),
      take(1),
      mapTo(true),
    );
  }
}
