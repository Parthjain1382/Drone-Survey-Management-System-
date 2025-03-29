import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MissionService} from '../../../services/mission.service';
import {DronesService} from '../../../services/drones.service';

import * as L from 'leaflet';

@Component({
  selector: 'app-create-mission-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-mission-dialog.component.html',
  styleUrls: ['./create-mission-dialog.component.scss']
})
export class CreateMissionDialogComponent implements OnInit {

  missionForm: FormGroup;
  map: any;
  waypoints: any[] = [];
  allDrones:any[] = [];

  constructor(private fb: FormBuilder,private missionService: MissionService,private droneService: DronesService,
    private dialogRef: MatDialogRef<CreateMissionDialogComponent>
  ) {
    this.missionForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(15)]],
      flightPath: ['', Validators.required],
      location: this.fb.array([]),
      altitude: ['', [Validators.required, Validators.min(1)]],
      frequency: ['', Validators.required],
      droneId: ['', Validators.required],
      scheduledTime: ['', Validators.required],
      status: ['Scheduled']
    });
  }



  ngOnInit(): void {
    this.droneService.getDrones().subscribe((res:any)=>{
      this.allDrones = res.filter((drone: any) => drone.status === "Available")
    })
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.map = L.map('map').setView([21.158604, 79.149388], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      this.map.invalidateSize();

      this.map.on('click', (event: any) => {
        const { lat, lng } = event.latlng;
        this.addWaypoint(lat, lng);
      });
    }, 100);
  }

  addWaypoint(lat: number, lng: number) {
    const locationsArray = this.missionForm.get('location') as FormArray;

    locationsArray.push(this.fb.group({ lat, lng }));
    this.waypoints.push({ lat, lng });
    // Clear existing markers before adding new ones
    this.map.eachLayer((layer: L.Layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    // Add markers for Start, Waypoints, and End
    this.waypoints.forEach((point, index) => {
      let marker;
      if (index === 0) {
        // First point: Start marker (Green)
        marker = L.marker([point.lat, point.lng], { icon: this.getCustomIcon('start') }).addTo(this.map);
      } else if (index === this.waypoints.length - 1) {
        // Last point: End marker (Red)
        marker = L.marker([point.lat, point.lng], { icon: this.getCustomIcon('end') }).addTo(this.map);
      } else {
        // Middle points: Waypoints (Blue)
        marker = L.marker([point.lat, point.lng], { icon: this.getCustomIcon('waypoint') }).addTo(this.map);
      }
    });
  }

  getCustomIcon(type: string) {
    let iconUrl;
    if (type === 'start') {
      iconUrl = 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'; // Start: Green
    } else if (type === 'end') {
      iconUrl = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'; // End: Red
    } else {
      iconUrl = 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'; // Waypoints: Blue
    }

    return L.icon({
      iconUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34]
    });
  }


  // addWaypoint(lat: number, lng: number) {
  //   debugger;
  //   this.waypoints.push({ lat, lng });
  //   (this.missionForm.get('location') as FormArray).push(this.fb.group({ lat, lng }));
  //   L.marker([lat, lng]).addTo(this.map);
  // }

  addSensor(sensor: string) {
    (this.missionForm.get('sensors') as FormArray).push(this.fb.control(sensor));
  }

  removeSensor(index: number) {
    (this.missionForm.get('sensors') as FormArray).removeAt(index);
  }

  submitForm() {
    if (this.missionForm.valid) {
      this.missionService.createMission({...this.missionForm.value, estimatedTime: this.calculateEstimatedTime()}).subscribe((res:any)=>{
        console.log(res);
        this.dialogRef.close();
      },(err:any)=>{
        console.log(err);
      })
    }
  }

  calculateEstimatedTime() {
    // Get values from form
    const altitude = this.missionForm.get('altitude')?.value || 0;
    const flightPath = this.missionForm.get('flightPath')?.value;
    const waypoints = this.waypoints;

    // Base drone speed in meters/second (assuming average speed of 10 m/s)
    const droneSpeed = 10;

    // Calculate total distance between waypoints
    let totalDistance = 0;
    for (let i = 0; i < waypoints.length - 1; i++) {
      const point1 = waypoints[i];
      const point2 = waypoints[i + 1];

      // Calculate distance using Haversine formula
      const R = 6371000; // Earth's radius in meters
      const lat1 = point1.lat * Math.PI / 180;
      const lat2 = point2.lat * Math.PI / 180;
      const dLat = (point2.lat - point1.lat) * Math.PI / 180;
      const dLon = (point2.lng - point1.lng) * Math.PI / 180;

      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1) * Math.cos(lat2) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c;

      totalDistance += distance;
    }

    // Add extra distance based on flight path pattern
    let pathMultiplier = 1;
    if (flightPath === 'Crosshatch') {
      // Crosshatch pattern covers area multiple times
      pathMultiplier = 2.5;
    } else if (flightPath === 'Perimeter') {
      // Perimeter follows the boundary
      pathMultiplier = 1.2;
    }

    totalDistance *= pathMultiplier;

    // Factor in altitude for vertical distance
    const verticalDistance = altitude * 2; // Up and down
    totalDistance += verticalDistance;

    // Calculate time in seconds
    const estimatedTimeSeconds = totalDistance / droneSpeed;

    // Convert to minutes and round up
    const estimatedTimeMinutes = Math.ceil(estimatedTimeSeconds / 60);

    // Update the form
    this.missionForm.patchValue({
      estimatedTime: estimatedTimeMinutes
    });

    return estimatedTimeMinutes;
  }
}
