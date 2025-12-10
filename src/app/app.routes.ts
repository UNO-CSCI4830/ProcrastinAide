import { Routes } from '@angular/router';
import { authGuard } from "./guards/auth.guard";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
    //canActivate: [authGuard],
    //loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'session-history',
    //canActivate: [authGuard],
    loadComponent: () => import('./pages/session-history/session-history.page').then( m => m.SessionHistoryPage)
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
  },
  {
    path: 'new-task',
    //canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/new-task/new-task.page').then(m => m.NewTaskPage)
  },
{
  path: 'new-task/:id',
  //canActivate: [authGuard],
  loadComponent: () =>
    import('./pages/new-task/new-task.page').then(m => m.NewTaskPage)
},
  {
    path: 'task-list',
    //canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/task-list/task-list.page').then(m => m.TaskListPage)
  },
  {
    path: 'pomodoro',
    //canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/pomodoro/pomodoro.page').then(m => m.PomodoroPage)
  },
  {
    path: 'calendar',
    //canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/calendar/calendar.page').then(m => m.CalendarPage)
  },
  {
    path: 'trivia-test',
    //canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/trivia-test/trivia-test.page').then(m => m.TriviaTestPage)
  }

];
