import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
  ) {}

  get<R>(url: string): Observable<R> {
    return this.http.get<R>(`${environment.apiUrl}/${url}`).pipe(
      catchError(this.handleError)
    );
  }

  post<B, R>(url: string, body: B): Observable<R> {
    return this.http.post<R>(`${environment.apiUrl}/${url}`, body).pipe(
      catchError(this.handleError)
    );
  }

  patch<B, R>(url: string, body: B): Observable<R> {
    return this.http.patch<R>(`${environment.apiUrl}/${url}`, body).pipe(
      catchError(this.handleError)
    );
  }

  delete<R>(url: string): Observable<R> {
    return this.http.delete<R>(`${environment.apiUrl}/${url}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: Error) {
    console.error(error);
    return throwError(error);
  }
}
