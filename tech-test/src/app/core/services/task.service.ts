import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { IRequest } from 'ngxs-requests-plugin';

import { Observable } from 'rxjs';

import { Task } from '../models/task.model';
import { GetTasksRequestState, TaskStateModel } from '../ngxs/task/task.state';
import { GetTasks } from '../ngxs/task/task.actions';
import { TaskGetterState } from '../ngxs/task/task-getter.state';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  @Select(TaskGetterState.getAllTasks)
  allTasks$: Observable<Task[]>;

  @Select(GetTasksRequestState)
  getTasksRequest$: Observable<IRequest>;

  constructor(
    private store: Store,
  ) {}

  getTasks(): Observable<TaskStateModel> {
    return this.store.dispatch(new GetTasks());
  }
}
