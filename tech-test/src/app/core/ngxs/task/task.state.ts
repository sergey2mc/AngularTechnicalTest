import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { createRequestAction, RequestState } from 'ngxs-requests-plugin';

import { patchEntities } from '../../../shared/utils/patch-entities';
import { Task } from '../../models/task.model';
import { ApiService } from '../../services/api.service';

import { GetTasks, GetTasksFail, GetTasksSuccess } from './task.actions';

@RequestState('getTasks')
@Injectable()
export class GetTasksRequestState {}

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
}
