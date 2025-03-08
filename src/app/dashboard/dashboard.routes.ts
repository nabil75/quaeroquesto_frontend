import { Routes } from '@angular/router';


export const dashboardRoutes: Routes = [
    { path: 'dashboard/:id', 
      loadComponent: () => import('./dashboard.component').then(module => module.DashboardComponent) 
    }
  ];