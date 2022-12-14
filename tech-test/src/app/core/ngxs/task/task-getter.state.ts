import { Selector } from '@ngxs/store';

import { TaskState, TaskStateModel } from './task.state';

export class TaskGetterState {
  @Selector([TaskState])
  static getAllTasks(state: TaskStateModel) {
    return state.ids.map(id => state.entities[id]);
  }
}
