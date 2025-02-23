import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/portal/portal.routes').then(m => m.routes)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.routes)
  },
  {
    path: '**',
    loadComponent: () => import('./features/shared/views/no-found/no-found.component').then(m => m.NoFoundComponent)
  }
];
