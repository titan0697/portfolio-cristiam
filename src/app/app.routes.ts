import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home').then(m => m.Home)
    },
    {
        path: 'proyectos',
        loadComponent: () => import('./pages/projects/projects').then(m => m.Projects)
    },
    {
        path: 'skills',
        loadComponent: () => import('./pages/skill/skill').then(m => m.Skill)
    },
    {
        path: 'about',
        loadComponent: () => import('./pages/about/about').then(m => m.About)
    },
  {
        path: 'contacto',
        loadComponent: () => import('./pages/contact/contact').then(m => m.Contact)
    }
];
