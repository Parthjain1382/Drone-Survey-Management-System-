import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface SummaryCard {
  title: string;
  count: number;
  icon: string;
  color: string;
  route: string;
}

interface RecentActivity {
  id: number;
  type: 'drone' | 'mission' | 'report';
  title: string;
  status: string;
  timestamp: string;
  icon: string;
  color: string;
}

interface DroneStatus {
  id: string;
  name: string;
  status: 'Available' | 'InMission' | 'Maintenance';
  battery: number;
  lastActive: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  summaryCards: SummaryCard[] = [
    {
      title: 'Total Drones',
      count: 12,
      icon: 'precision_manufacturing',
      color: '#2196F3',
      route: '/home/drones'
    },
    {
      title: 'Total Missions',
      count: 5,
      icon: 'flight',
      color: '#4CAF50',
      route: '/home/missions'
    },
    {
      title: 'All Reports',
      count: 3,
      icon: 'assessment',
      color: '#FF9800',
      route: '/home/reports'
    }
  ];

  recentActivities: RecentActivity[] = [
    {
      id: 1,
      type: 'drone',
      title: 'Drone #1234 Maintenance Complete',
      status: 'Completed',
      timestamp: '2 hours ago',
      icon: 'precision_manufacturing',
      color: '#2196F3'
    },
    {
      id: 2,
      type: 'mission',
      title: 'New Survey Mission Created',
      status: 'In Progress',
      timestamp: '4 hours ago',
      icon: 'flight',
      color: '#4CAF50'
    },
    {
      id: 3,
      type: 'report',
      title: 'Monthly Performance Report',
      status: 'Pending Review',
      timestamp: '1 day ago',
      icon: 'assessment',
      color: '#FF9800'
    },
    {
      id: 4,
      type: 'report',
      title: 'Monthly Performance Report',
      status: 'Pending Review',
      timestamp: '1 day ago',
      icon: 'assessment',
      color: '#FF9800'
    }
  ];

  droneStatuses: DroneStatus[] = [
    {
      id: 'DRN001',
      name: 'Survey Drone Alpha',
      status: 'Available',
      battery: 85,
      lastActive: '5 minutes ago'
    },
    {
      id: 'DRN002',
      name: 'Survey Drone Beta',
      status: 'Maintenance',
      battery: 45,
      lastActive: '2 hours ago'
    },
    {
      id: 'DRN003',
      name: 'Survey Drone Gamma',
      status: 'InMission',
      battery: 75,
      lastActive: '1 day ago'
    }
  ];

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
