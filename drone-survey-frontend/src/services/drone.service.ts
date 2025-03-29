import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DroneService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDrones(): Observable<any> {
    return this.http.get(this.apiUrl + '/api/drones');
  }

  updateDroneStatus(droneId: string, status: string): Observable<any> {4
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    return this.http.put(`${this.apiUrl}/api/drones/${droneId}`, { status }, { headers });
  }
}
