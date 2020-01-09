import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Release } from '../core/modules/Release';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { ReleasePlatform } from '../core/modules/ReleasePlatform';
import { environment } from '../../environments/environment';
import { ReleaseFeature } from '../core/modules/ReleaseFeature';
@Injectable({
  providedIn: 'root'
})
export class ReleaseService {

  private baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getReleases(): Observable<Release[]> {
    return this.http.get<Release[]>(`${this.baseUrl}Releases`).pipe(
      tap(data => console.log(data))

    );
  }

  getUpcomingReleases(): Observable<Release[]> {
    return this.http.get<Release[]>(`${this.baseUrl}Dashboard`).pipe(
      tap(data => console.log(data))

    );
  }
  getRelease(id): Observable<Release> {
    return this.http.get<Release>(`${this.baseUrl}Releases/${id}`).pipe(
      map(data => {
        data.iosPlatfrom = data.releasePlatforms && data.releasePlatforms.length && data.releasePlatforms.find(p => p.platformCode === "ios");
        data.androidPlatfrom = data.releasePlatforms && data.releasePlatforms.length && data.releasePlatforms.find(p => p.platformCode === "android");
        data.iOsRelease = !!(data.iosPlatfrom);
        data.androidRelease = !!(data.androidPlatfrom);
        if (!data.iOsRelease) {
          data.iosPlatfrom = this.getPlatform("ios", id)
        }

        if (!data.androidPlatfrom) {
          data.androidPlatfrom = this.getPlatform("android", id)
        }

        data.releasePlatforms = [];

        return data;
      })
    )
  }

  createRelease(release): Observable<Release> {
    release.releasePlatforms = [];
    if (release.iOsRelease) {
      release.releasePlatforms.push(release.iosPlatfrom)
    }
    if (release.androidRelease) {
      release.releasePlatforms.push(release.androidPlatfrom)
    }

    return this.http.post<Release>(`${this.baseUrl}Releases/`, release).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  updateRelease(release): Observable<Release> {
    release.releasePlatforms = [];
    if (release.iOsRelease) {
      release.releasePlatforms.push(release.iosPlatfrom)
    }
    if (release.androidRelease) {
      release.releasePlatforms.push(release.androidPlatfrom)
    }
    return this.http.put<Release>(`${this.baseUrl}Releases/${release.releaseId}`, release).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  assignFeatureToRelease(releaseId, feature) {
    const model = new ReleaseFeature();
    model.featureId = feature.featureId;
    model.releaseId = releaseId;
    model.statusCode = "new";

    const url = `${this.baseUrl}ReleaseFeatures/`;
    return this.http.post<ReleaseFeature>(url, model).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  removeFeatureFromRelease(featureId) {
    const url = `${this.baseUrl}ReleaseFeatures/${featureId}`;
    return this.http.delete(url).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }


  updateReleaseFeatures(releaseFeature) {
    const url = `${this.baseUrl}/ReleaseFeatures/${releaseFeature.releaseFeatureId}`;
    return this.http.put<ReleaseFeature>(url, releaseFeature).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  addWorkItemToRelease(workItem) {
    const url = `${this.baseUrl}/WorkItems`;
    return this.http.post<Release>(url, workItem).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }
  updateWorkItem(workItem) {
    const url = `${this.baseUrl}/WorkItems/${workItem.workItemId}`;
    return this.http.put<Release>(url, workItem).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }



  removeWorkItem(workItem) {
    var url = `${this.baseUrl}/WorkItems/${workItem.workItemId}`;
    return this.http.delete<boolean>(url).pipe(
      tap(data => console.log(data)),
      map(p => { return true }),
      catchError(this.handleError)
    );
  }


  getPlatform(platformCode, id) {
    let platfrom = new ReleasePlatform();
    platfrom.platformCode = platformCode
    platfrom.releaseId = id;
    return platfrom;
  }



  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
