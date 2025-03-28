import { Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { DronesComponent } from '../components/drones/drones.component';
import { MissionsComponent } from '../components/missions/missions.component';
import { ReportsComponent } from '../components/reports/reports.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'drones', component: DronesComponent },
      { path: 'missions', component: MissionsComponent },
      { path: 'reports', component: ReportsComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];
