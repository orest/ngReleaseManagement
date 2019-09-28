import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Release } from '../core/modules/Release';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { ReleasePlatform } from '../core/modules/ReleasePlatform';

@Injectable({
	providedIn: 'root'
})
export class ReleaseService {

	private baseUrl = "api/";
	constructor(private http: HttpClient) { }

	getReleases(): Observable<Release[]> {
		return this.http.get<Release[]>(`${this.baseUrl}Releases`).pipe(
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
					data.iosPlatfrom = this.getPlatform( "ios", id)
				}

				if (!data.androidPlatfrom) {
					data.androidPlatfrom = this.getPlatform( "android", id)
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

	assingFeatureToRelease(featureId) {

	}

	removeFeatureFromRelease(featureId) {

	}


	addWrokItemToRelease(workItem) {

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
