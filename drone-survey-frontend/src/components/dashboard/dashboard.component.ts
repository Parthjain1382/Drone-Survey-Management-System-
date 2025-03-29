import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DronesService } from '../../services/drones.service';
import { MissionService } from '../../services/mission.service';

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
  name: string;
  status: 'Available' | 'InMission' | 'Maintenance';
  batteryLevel: number;
  lastActive: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  droneStatuses: DroneStatus[] = [
  ];

  summaryCards: SummaryCard[] = [
    {
      title: 'Total Drones',
      count: 0,
      icon: 'precision_manufacturing',
      color: '#2196F3',
      route: '/home/drones'
    },
    {
      title: 'Total Missions',
      count: 0,
      icon: 'flight',
      color: '#4CAF50',
      route: '/home/missions'
    },
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


  constructor(private droneService: DronesService,private missionService: MissionService) {}

  ngOnInit(): void {
    this.droneService.getDrones().subscribe((drones: any[]) => {
      this.summaryCards[0].count = drones.length;
      this.droneStatuses = drones.map((drone: any) => ({
        name: drone.name,
        status: drone.status as 'Available' | 'InMission' | 'Maintenance',
        batteryLevel: drone.batteryLevel,
        lastActive: drone.lastActive ? new Date(drone.lastMission).toLocaleString() : 'Never'
      }));
    })

    this.missionService.getMissions().subscribe((missions: any) => {
        this.summaryCards[1].count = missions.length;

        this.recentActivities = missions.map((mission: any) => ({
          id: mission._id,
          type: 'mission',
          title: `Mission #${mission._id} ${mission.status}`,
          status: mission.status,
          timestamp: new Date(mission.createdAt).toLocaleString(),
          icon: 'flight',
          color: this.getStatusColor(mission.status)
        }));
    })
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Available': return '#4CAF50';
      case 'Maintenance': return '#FF9800';
      case 'InMission': return '#2196F3';
      default: return '#9E9E9E';
    }
  }

  getBatteryColor(batteryLevel: number): string {
    if (batteryLevel >= 80) return '#4CAF50';
    if (batteryLevel >= 40) return '#FF9800';
    return '#F44336';
  }
}
