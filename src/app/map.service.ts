import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ICity, IDistrict, IRegion, IStreet, IVillage} from './interfaces';
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  getRegions(): Observable<IRegion[]> {
    return this.http.get<IRegion[]>(`${environment.firebaseConfig.databaseURL}/regions.json`);
  }

  getCities(): Observable<ICity[]> {
    return this.http.get<ICity[]>(`${environment.firebaseConfig.databaseURL}/cities.json`);
  }

  getVillages(): Observable<IVillage[]> {
    return this.http.get<IVillage[]>(`${environment.firebaseConfig.databaseURL}/villages.json`);
  }

  getDistricts(): Observable<IDistrict[]> {
    return this.http.get<IDistrict[]>(`${environment.firebaseConfig.databaseURL}/districts.json`);
  }
  getStreets(): Observable<IStreet[]> {
    return  this.http.get<IStreet[]>(`${environment.firebaseConfig.databaseURL}/streets.json`);
  }

  addStreet(street: IStreet): Observable<IStreet>  {
        return this.http.post<IStreet>(`${environment.firebaseConfig.databaseURL}/streets.json`, street);
  }

  addVillage(village: IVillage): Observable<IVillage> {
    return this.http.post<IStreet>(`${environment.firebaseConfig.databaseURL}/villages.json`, village);
  }
}
