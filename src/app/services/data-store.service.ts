import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  private baseUrl = "";

  constructor(private http: HttpClient) { }
  getFeatures() {
    this.http.get<any[]>(this.baseUrl + "/features")
  }
}
