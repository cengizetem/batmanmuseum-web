import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserGuard } from './guards/user.guard';
import { RegisterComponent } from './components/register/register.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent },
  {path: 'login', pathMatch: 'full', component: LoginComponent },
  {path: 'dashboard', pathMatch: 'full', component: DashboardComponent, canActivate: [UserGuard] },
  {path: 'register', pathMatch: 'full', component: RegisterComponent },
  {path: 'tickets', pathMatch: 'full', component: TicketsComponent, canActivate: [UserGuard] },
  {path: 'settings', pathMatch: 'full', component: SettingsComponent, canActivate: [UserGuard] },
  {path: 'admin', pathMatch: 'full', component: AdminComponent, canActivate: [AdminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
