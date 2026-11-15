
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'etape-1',
    pathMatch: 'full',
  },
  {
    path: 'etape-1',
    loadComponent: () =>
      import('./features/territoire/territoire')
        .then(m => m.Territoire),
    title: 'Le territoire | Égypte antique',
  },
  {
    path: 'etape-2',
    loadComponent: () =>
      import('./features/villes/villes')
        .then(m => m.Villes),
    title: 'Les villes | Égypte antique',
  },
  {
    path: 'etape-3',
    loadComponent: () =>
      import('./features/dans-la-ville/dans-la-ville')
        .then(m => m.DansLaVille),
    title: 'Dans la ville | Égypte antique',
  },
  {
    path: 'etape-4',
    loadComponent: () =>
      import('./features/pouvoir/pouvoir')
        .then(m => m.Pouvoir),
    title: 'Le pouvoir | Égypte antique',
  },
  {
    path: 'etape-5',
    loadComponent: () =>
      import('./features/defi/defi')
        .then(m => m.Defi),
    title: 'Défi urbaniste | Égypte antique',
  },
  {
    path: '**',
    redirectTo: 'etape-1',
  },
];
