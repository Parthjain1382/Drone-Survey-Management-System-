import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { CreateMissionDialogComponent } from './create-mission-dialog/create-mission-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MissionService } from '../../services/mission.service';
import { DroneService } from '../../services/drone.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-missions',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
  ],
  templateUrl: './missions.component.html',
  styleUrl: './missions.component.scss'
})
export class MissionsComponent implements OnInit {

  completedMissions: any[] = [];
  activeMissions: any[] = [];
  scheduledMissions: any[] = [];
  abortedMissions: any[] = [];


  constructor(private dialog: MatDialog, private missionService: MissionService,
    private droneService: DroneService,
    private cdrf: ChangeDetectorRef
  ){}

  openCreateMissionDialog(){
    this.dialog.open(CreateMissionDialogComponent, {
      width: '36vw',
      maxHeight: '90vh',
      panelClass: 'white-dialog',
      backdropClass: 'white-backdrop',
    });
  }

  ngOnInit(): void {
    this.missionService.getMissions().subscribe((res:any)=>{
      this.completedMissions = res.filter((mission:any)=>mission.status === "Completed");
      this.activeMissions = res.filter((mission:any)=>mission.status === "In Progress");
      this.scheduledMissions = res.filter((mission:any)=>mission.status === "Scheduled");
      this.abortedMissions = res.filter((mission:any)=>mission.status === "Aborted");

      // Check scheduled missions for current time match and completion
      const currentTime = new Date();
      this.scheduledMissions.forEach(mission => {
        const scheduledTime = new Date(mission.scheduledTime);

        // Check if mission should start
        if (scheduledTime.getTime() <= currentTime.getTime()) {
          // Update mission status to In Progress via PUT request
          this.missionService.updateMission(mission._id, {
            ...mission,
            status: "In Progress"
          }).subscribe(() => {
            // Update drone status to inProgress
            this.droneService.updateDroneStatus(mission.droneId, "InMission").subscribe(() => {
              // Move mission from scheduled to active
              this.scheduledMissions = this.scheduledMissions.filter(m => m._id !== mission._id);
              this.activeMissions.push({...mission, status: "In Progress"});
              this.cdrf.detectChanges();
            });
          });
        }
      });


      // Check active missions for completion based on estimated time
      this.activeMissions.forEach(mission => {
        const scheduledTime = new Date(mission.scheduledTime);
        const estimatedEndTime = new Date(scheduledTime.getTime() + (mission.estimatedTime * 60 * 1000)); // Convert minutes to milliseconds

        if (currentTime.getTime() >= estimatedEndTime.getTime()) {
          // Update mission status to Completed
          this.missionService.updateMission(mission._id, {
            ...mission,
            status: "Completed"
          }).subscribe(() => {

            this.droneService.updateDroneStatus(mission.droneId, "Available").subscribe(() => {
              // Move mission from active to completed
              this.activeMissions = this.activeMissions.filter(m => m._id !== mission._id);
              this.completedMissions.push({...mission, status: "Completed"});
            })
          });
          this.cdrf.detectChanges();
        }
      });

      // Update drone status when mission becomes active
      this.activeMissions.forEach(mission => {
        this.droneService.updateDroneStatus(mission.droneId, "InMission").subscribe();
      });
    })
  }

  abortMission(missionId: string){
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to abort this mission?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        // Find the mission in active missions
        const mission = this.activeMissions.find(m => m._id === missionId);
        if (mission) {
          // Update mission status to Aborted
          this.missionService.updateMission(missionId, {
            status: "Aborted"
          }).subscribe(() => {
            // Update drone status to Available
            this.droneService.updateDroneStatus(mission.droneId, "Available").subscribe(() => {
              // Remove from active missions
              this.activeMissions = this.activeMissions.filter(m => m._id !== missionId);
              // Add to aborted missions
              this.abortedMissions.push({...mission, status: "Aborted"});
              Swal.fire({
                title: 'Mission aborted',
                icon: 'success',
              });
            });
          });
        }
      }
    });
  }
}
