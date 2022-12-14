import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxsRequestsPluginModule } from 'ngxs-requests-plugin';

import { environment } from '../../../environments/environment';

import { CreateTaskRequestState, GetTasksRequestState, TaskState } from './task/task.state';

export const STATES = [
  TaskState,
];

export const REQUEST_STATES = [
  GetTasksRequestState,
  CreateTaskRequestState,
];

@NgModule({
  imports: [
    NgxsModule.forRoot(
      STATES,
      {
        developmentMode: !environment.production,
      },
    ),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production,
    }),
    NgxsRouterPluginModule.forRoot(),
    NgxsRequestsPluginModule.forRoot(REQUEST_STATES),
  ],
})
export class NgxsStoreModule {}
