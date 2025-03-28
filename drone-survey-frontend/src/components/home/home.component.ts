import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isSidebarCollapsed = false;
  menuItems = [
    { path: '/home/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/home/drones', icon: 'precision_manufacturing', label: 'Drones' },
    { path: '/home/missions', icon: 'flight', label: 'Missions' },
    { path: '/home/reports', icon: 'assessment', label: 'Reports' }
  ];

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
