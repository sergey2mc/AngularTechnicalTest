import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { createRequestAction, RequestState } from 'ngxs-requests-plugin';

import { patchEntities } from '../../../shared/utils/patch-entities';
import { Task } from '../../models/task.model';
import { ApiService } from '../../services/api.service';

import { CreateTask, CreateTaskFail, CreateTaskSuccess, GetTasks, GetTasksFail, GetTasksSuccess } from './task.actions';

@RequestState('getTasks')
@Injectable()
export class GetTasksRequestState {}

@RequestState('createTask')
@Injectable()
export class CreateTaskRequestState {}

export interface TaskStateModel {
  entities: { [key: number]: Task };
  ids: number[];
}

@State<TaskStateModel>({
  name: 'task',
  defaults: {
    entities: {},
    ids: [],
  },
})
@Injectable()
export class TaskState {
  constructor(
    private apiService: ApiService
  ) {}

  @Action(GetTasks)
  getTasks(
    { dispatch }: StateContext<TaskStateModel>,
  ) {
    const request = this.apiService.get('tasks');

    return dispatch(
      createRequestAction({
        state: GetTasksRequestState,
        request,
        successAction: GetTasksSuccess,
        failAction: GetTasksFail,
      }),
    );
  }

  @Action(GetTasksSuccess)
  getTasksSuccess(
    ctx: StateContext<TaskStateModel>,
    { payload }: GetTasksSuccess
  ) {
    return patchEntities<TaskStateModel, Task>(ctx, payload);
  }

  @Action(GetTasksFail)
  getTasksFail(
    ctx: StateContext<TaskStateModel>,
    { payload }: GetTasksFail
  ) {
    console.error(payload);
  }

  @Action(CreateTask)
  createTask(
    { dispatch }: StateContext<TaskStateModel>,
    { payload }: CreateTask
  ) {
    const request = this.apiService.post('tasks', payload);

    return dispatch(
      createRequestAction({
        state: CreateTaskRequestState,
        request,
        successAction: CreateTaskSuccess,
        failAction: CreateTaskFail,
      }),
    );
  }

  @Action(CreateTaskSuccess)
  createTaskSuccess(
    ctx: StateContext<TaskStateModel>,
    { payload }: CreateTaskSuccess
  ) {
    return patchEntities<TaskStateModel, Task>(ctx, [payload], false);
  }

  @Action(CreateTaskFail)
  createTaskFail(
    ctx: StateContext<TaskStateModel>,
    { payload }: CreateTaskFail
  ) {
    console.error(payload);
  }
}
