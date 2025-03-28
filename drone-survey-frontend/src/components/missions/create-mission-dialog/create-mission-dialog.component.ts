import { Component } from '@angular/core';
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
export class CreateMissionDialogComponent {

//   const missionSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     flightPath: { type: String, required: true },
//     location: [{ lat: Number, lng: Number }], // Waypoints for the mission
//     altitude: { type: Number, required: true }, // Altitude in meters
//     frequency: { type: String, required: true }, // Data collection frequency
//     sensors: [{ type: String }], // List of sensors used
//     status: {
//         type: String,
//         enum: ["Scheduled", "In Progress", "Completed", "Aborted"],
//         default: "Scheduled"
//     },
//     scheduledTime: { type: Date, required: true },
//     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
// }, { timestamps: true });


  // missionForm: FormGroup;

  // constructor(private fb: FormBuilder){
  //   this.missionForm = this.fb.group({
  //     name: ['', Validators.required],
  //     flightPath: ['', Validators.required],
  //     location: this.fb.group({
  //       lat: ['', Validators.required],
  //       lng: ['', Validators.required]
  //     }),
  //     altitude: [0, Validators.required],
  //     frequency: ['', Validators.required],
  //     sensors: ['', Validators.required],
  //     status: ['', Validators.required],
  //     scheduledTime: ['', Validators.required],
  //     createdBy: ['', Validators.required],

  //   })
  // }
  // onSubmit(){

  // }

  missionForm: FormGroup;
  map: any;
  waypoints: any[] = [];

  constructor(private fb: FormBuilder) {
    this.missionForm = this.fb.group({
      name: ['', Validators.required],
      flightPath: ['', Validators.required],
      location: this.fb.array([]),
      altitude: ['', [Validators.required, Validators.min(1)]],
      frequency: ['', Validators.required],
      sensors: this.fb.array([]),
      status: ['Scheduled', Validators.required],
      scheduledTime: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
    // this.map = L.map('map').setView([51.505, -0.09], 13);
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution: '© OpenStreetMap contributors'
    // }).addTo(this.map);

    // this.map.on('click', (event: any) => {
    //   const { lat, lng } = event.latlng;
    //   this.addWaypoint(lat, lng);
    // });
  }

  addWaypoint(lat: number, lng: number) {
    this.waypoints.push({ lat, lng });
    (this.missionForm.get('location') as FormArray).push(this.fb.group({ lat, lng }));
    L.marker([lat, lng]).addTo(this.map);
  }

  addSensor(sensor: string) {
    (this.missionForm.get('sensors') as FormArray).push(this.fb.control(sensor));
  }

  removeSensor(index: number) {
    (this.missionForm.get('sensors') as FormArray).removeAt(index);
  }

  submitForm() {
    if (this.missionForm.valid) {
      console.log(this.missionForm.value);
    }
  }
}
