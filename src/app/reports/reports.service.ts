import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Release } from '../core/modules/Release';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { ReleasePlatform } from '../core/modules/ReleasePlatform';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ReportsService {
    private baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) { }

    getReleases(): Observable<Release[]> {
        return this.http.get<Release[]>(`${this.baseUrl}Reports`).pipe(
          tap(data => console.log(data))
    
        );
      }

    getReleaseFeatures(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}ReleaseFeatures`).pipe(
          tap(data => console.log(data))
    
        );
    }
}
