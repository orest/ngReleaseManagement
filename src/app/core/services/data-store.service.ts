import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Release } from "../modules/Release";
import { of, from, pipe, Observable, Observer, BehaviorSubject } from "rxjs";
import { tap, map, filter } from 'rxjs/operators';
import { Client } from '../modules/Client';
import { Feature } from '../modules/Feature';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: "root"
})
export class DataStoreService {
  //private baseUrl = "api/";
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getFeatures() {
    return this.http.get<Feature[]>(this.baseUrl + "features");
  }
  getFeature(id) {
    return this.http.get<Feature>(this.baseUrl + "features/" + id);
  }

  createFeature(feature) {
    return this.http.post<Feature>(this.baseUrl + "features", feature).pipe(
      tap(data => console.log(data)),
    );
  }

  updateFeature(feature, id) {
    feature.featureId = id;
    return this.http.put<Feature>(`${this.baseUrl}features/${id}`, feature).pipe(
      tap(data => console.log(data)),
    );
  }

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
    return this.http.put(`${this.baseUrl}Clients/${client.clientId}`, client).pipe(
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
