import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DronesService {

  constructor(private http: HttpClient) { }
  apiurl= environment.apiUrl;

  getDrones() {
    return this.http.get<any[]>('http://localhost:3000/api/drones/');
  }

  addDrone(data: any) {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };
    return this.http.post<any>('http://localhost:3000/api/drones/', data, { headers });
  }
}
