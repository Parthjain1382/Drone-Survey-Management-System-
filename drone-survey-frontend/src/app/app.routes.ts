import { Routes } from '@angular/router';
import { DashboardComponent } from '../components/components/dashboard/dashboard.component';
import { DronesComponent } from '../components/components/drones/drones.component';
import { MissionsComponent } from '../components/components/missions/missions.component';
import { ReportsComponent } from '../components/components/reports/reports.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { authGuard } from '../guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'drones', component: DronesComponent, canActivate: [authGuard] },
  { path: 'missions', component: MissionsComponent, canActivate: [authGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];
