import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddDroneDialogComponent } from './add-drone-dialog/add-drone-dialog.component';
import { DronesService } from '../../services/drones.service';

interface Drone {
  name: string;
  status: 'Available' | 'InMission' | 'Maintenance';
  batteryLevel: number;
  lastActive: string;
}

@Component({
  selector: 'app-drones',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './drones.component.html',
  styleUrl: './drones.component.scss'
})
export class DronesComponent implements OnInit{
  drones: Drone[] =  [];

  constructor(private dialog: MatDialog, private droneService: DronesService) {}

  ngOnInit(): void {
    this.droneService.getDrones().subscribe((drones: any[]) => {
      this.drones = drones.map((drone: any) => ({
        name: drone.name,
        status: drone.status as 'Available' | 'InMission' | 'Maintenance',
        batteryLevel: drone.batteryLevel,
        lastActive: drone.lastActive ? new Date(drone.lastMission).toLocaleString() : 'Never'
      }));
    });
  }

  openAddDroneDialog() {
    const dialogRef = this.dialog.open(AddDroneDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Add the new drone to the list
        this.drones.push({
          ...result,
          lastActive: 'Just now'
        });
      }
    });
  }

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
