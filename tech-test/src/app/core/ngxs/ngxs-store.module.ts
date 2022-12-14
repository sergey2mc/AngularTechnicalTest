import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxsRequestsPluginModule } from 'ngxs-requests-plugin';

import { environment } from '../../../environments/environment';

export const STATES = [];
export const REQUEST_STATES = [];

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
