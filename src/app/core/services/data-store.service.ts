import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Release } from "../modules/Release";
import { of, from, pipe, Observable, Observer, BehaviorSubject } from "rxjs";
import { tap, map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class DataStoreService {
  private baseUrl = "";
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

  getClients(): Observable<Release[]> {
    return this.http.get<Release[]>("../assets/data/clients.json").pipe(
      tap(data => console.log(data)),
    );
  }
}
