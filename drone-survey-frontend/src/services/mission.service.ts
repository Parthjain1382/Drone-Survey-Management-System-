import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }


  createMission(missionData: any) {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    return this.http.post(`${this.apiUrl}/api/missions/create`, missionData, {headers});

  }

  getMissions() {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    return this.http.get(`${this.apiUrl}/api/missions`, {headers});
  }

  updateMission(missionId: string, missionData: any) {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    }
    return this.http.put(`${this.apiUrl}/api/missions/${missionId}`, missionData, {headers});
  }
}

