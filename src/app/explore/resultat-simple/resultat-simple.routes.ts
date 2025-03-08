import { Routes } from '@angular/router';


export const resultatSimpleRoutes: Routes = [
    { path: 'resultat-simple', 
      loadComponent: () => import('./resultat-simple.component').then(module => module.ResultatSimpleComponent) 
    },
    { path: 'resultat-simple/:id', 
    loadComponent: () => import('./resultat-simple.component').then(module => module.ResultatSimpleComponent) 
    },
    { path: 'plot', 
    loadComponent: () => import('./resultat-simple.component').then(module => module.ResultatSimpleComponent) 
    }
  ];
