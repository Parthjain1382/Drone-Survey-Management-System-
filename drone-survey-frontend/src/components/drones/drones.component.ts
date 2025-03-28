import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Drone {
  name: string;
  status: 'Available' | 'InMission' | 'Maintenance';
  battery: number;
  lastActive: string;
}

@Component({
  selector: 'app-drones',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './drones.component.html',
  styleUrl: './drones.component.scss'
})
export class DronesComponent {
  drones: Drone[] = [
    {
      name: 'Survey Drone Alpha',
      status: 'Available',
      battery: 85,
      lastActive: '5 minutes ago'
    },
    {
      name: 'Survey Drone Alpha',
      status: 'Available',
      battery: 85,
      lastActive: '5 minutes ago'
    },
    {
      name: 'Survey Drone Beta',
      status: 'Maintenance',
      battery: 45,
      lastActive: '2 hours ago'
    },
    {
      name: 'Survey Drone Gamma',
      status: 'InMission',
      battery: 75,
      lastActive: '1 day ago'
    }
  ];

  getStatusIcon(status: string): string {
    switch (status) {
      case 'Available': return '✅';
      case 'InMission': return '🚀';
      case 'Maintenance': return '🔧';
      default: return '❓';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Available': return '#4CAF50';
      case 'Maintenance': return '#FF9800';
      case 'InMission': return '#2196F3';
      default: return '#9E9E9E';
    }
  }

  getBatteryColor(battery: number): string {
    if (battery >= 80) return '#4CAF50';
    if (battery >= 40) return '#FF9800';
    return '#F44336';
  }
}
