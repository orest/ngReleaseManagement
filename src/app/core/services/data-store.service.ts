import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Release } from "../modules/Release";
import { of, from, pipe, Observable, Observer, BehaviorSubject } from "rxjs";
import { tap, map, filter } from 'rxjs/operators';
import { Client } from '../modules/Client';

@Injectable({
	providedIn: "root"
})
export class DataStoreService {
	private baseUrl = "api/";
	constructor(private http: HttpClient) { }

	getFeatures() {
		this.http.get<any[]>(this.baseUrl + "/features");
	}

	getReleases(): Observable<Release[]> {
		return this.http.get<Release[]>("../assets/data/releases.json").pipe(
			tap(data => console.log(data)),
		);
	}

	getRelease(id): Observable<Release> {
		return this.http.get<Release[]>("../assets/data/releases.json").pipe(
			map(data => data.find(p => p.releaseId === id))
		);
	}

	// getClients(): Observable<Release[]> {
	//   return this.http.get<Release[]>("../assets/data/clients.json").pipe(
	//     tap(data => console.log(data)),
	//   );
	// }

	getClients(): Observable<Client[]> {
		return this.http.get<Client[]>(this.baseUrl + "Clients").pipe(
			tap(data => console.log(data)),
		);
	}

	createClient(client) {
		return this.http.post<Client>(this.baseUrl + "Clients", client).pipe(
			tap(data => console.log(data)),
		);
	}

	updateClient(client) {
		return this.http.put( `${this.baseUrl}Clients/${client.clientId}` , client).pipe(
			tap(data => console.log(data)),
		);
	}

	//lookups 
	getFeatureStatusCodes() {
		this.http.get<any[]>(this.baseUrl + "/lookup/feature-status-codes");
	}
	getFeatureTypeCodes() {
		this.http.get<any[]>(this.baseUrl + "/lookup/feature-type-codes");
	}

	getReleaseStatusCodes() {
		this.http.get<any[]>(this.baseUrl + "/lookup/release-status-codes");
	}

	getWorkItemTypes() {
		this.http.get<any[]>(this.baseUrl + "/lookup/work-item-types");
	}


}
