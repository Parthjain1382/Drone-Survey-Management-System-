import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  isSidebarCollapsed = false;
  menuItems = [
    { path: '/home/dashboard', icon: 'dashboard', label: 'Dashboard' },
    { path: '/home/drones', icon: 'precision_manufacturing', label: 'Drones' },
    { path: '/home/missions', icon: 'flight', label: 'Missions' },
    { path: '/home/reports', icon: 'assessment', label: 'Reports' }
  ];

  constructor(private authService: AuthService) {}

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  logout() {
    this.authService.logout();  
  }
}

