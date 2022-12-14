import { Task } from '../../models/task.model'
import { HttpErrorResponse } from '@angular/common/http';

const ActionTypes = {
  GET_TASKS: '[Task] Get tasks',
  GET_TASKS_SUCCESS: '[Task] Get tasks success',
  GET_TASKS_FAIL: '[Task] Get tasks fail',

  CREATE_TASK: '[Task] Create task',
  CREATE_TASK_SUCCESS: '[Task] Create task success',
  CREATE_TASK_FAIL: '[Task] Create task fail',

  UPDATE_TASK: '[Task] Update task',
  UPDATE_TASK_SUCCESS: '[Task] Update task success',
  UPDATE_TASK_FAIL: '[Task] Update task fail',
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




export class CreateTask {
  static type = ActionTypes.CREATE_TASK;

  constructor(public payload: Task) {
  }
}

export class CreateTaskSuccess {
  static type = ActionTypes.CREATE_TASK_SUCCESS;

  constructor(public payload: Task) {
  }
}

export class CreateTaskFail {
  static type = ActionTypes.CREATE_TASK_FAIL;

  constructor(public payload?: HttpErrorResponse) {
  }
}




export class UpdateTask {
  static type = ActionTypes.UPDATE_TASK;

  constructor(public payload: Task) {
  }
}

export class UpdateTaskSuccess {
  static type = ActionTypes.UPDATE_TASK_SUCCESS;

  constructor(public payload: Task) {
  }
}

export class UpdateTaskFail {
  static type = ActionTypes.UPDATE_TASK_FAIL;

  constructor(public payload?: HttpErrorResponse) {
  }
}
