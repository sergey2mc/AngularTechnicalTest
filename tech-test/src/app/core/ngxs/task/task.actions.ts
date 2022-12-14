import { Task } from '../../models/task.model'
import { HttpErrorResponse } from '@angular/common/http';

const ActionTypes = {
  GET_TASKS: '[Task] Get tasks',
  GET_TASKS_SUCCESS: '[Task] Get tasks success',
  GET_TASKS_FAIL: '[Task] Get tasks fail',
};

export class GetTasks {
  static type = ActionTypes.GET_TASKS;
}

export class GetTasksSuccess {
  static type = ActionTypes.GET_TASKS_SUCCESS;

  constructor(public payload: Task[]) {
  }
}

export class GetTasksFail {
  static type = ActionTypes.GET_TASKS_FAIL;

  constructor(public payload?: HttpErrorResponse) {
  }
}
