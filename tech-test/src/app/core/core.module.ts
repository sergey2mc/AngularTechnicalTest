import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgxsStoreModule } from './ngxs/ngxs-store.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxsStoreModule,
  ],
  providers: [HttpClient],
})
export class CoreModule { }
