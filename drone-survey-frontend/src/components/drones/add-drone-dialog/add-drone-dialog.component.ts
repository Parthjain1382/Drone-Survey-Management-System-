import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { DronesService } from '../../../services/drones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-drone-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './add-drone-dialog.component.html',
  styleUrls: ['./add-drone-dialog.component.scss']
})
export class AddDroneDialogComponent {
  deviceForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    model: ['', Validators.required],
    batteryLevel: ['', [
      Validators.required,
      Validators.min(0),
      Validators.max(100)
    ]],
    status: ['Available', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddDroneDialogComponent>,
    private droneService: DronesService
  ) {}

  onSubmit(): void {
    if (this.deviceForm.valid) {
      this.droneService.addDrone({...this.deviceForm.value,status: "Available"}).subscribe((res: any) => {
        this.dialogRef.close(this.deviceForm.value);
        console.log(res);
      })

    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}