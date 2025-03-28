import { Component, OnInit } from '@angular/core';
import { CreateMissionDialogComponent } from './create-mission-dialog/create-mission-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-missions',
  standalone: true,
  imports: [],
  templateUrl: './missions.component.html',
  styleUrl: './missions.component.scss'
})
export class MissionsComponent implements OnInit {

  constructor(private dialog: MatDialog){}

  openCreateMissionDialog(){
    this.dialog.open(CreateMissionDialogComponent, {
      width: '36vw',
      maxHeight: '90vh',
      panelClass: 'white-dialog',
      backdropClass: 'white-backdrop',
    });
  }

  ngOnInit(): void {

  }
}
