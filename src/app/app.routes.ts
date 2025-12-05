import { Routes } from '@angular/router';
import { authGuard } from "./guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
    //canActivate: [authGuard],
    //loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'session-history',
    //canActivate: [authGuard],
    loadComponent: () => import('./session-history/session-history.page').then( m => m.SessionHistoryPage)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    //canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  }

];
