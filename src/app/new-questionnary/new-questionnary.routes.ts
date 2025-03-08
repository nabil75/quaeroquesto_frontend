import { Routes } from '@angular/router';


export const newQuestionnaryRoutes: Routes = [
    { path: 'new-questionnary', 
      loadComponent: () => import('./new-questionnary.component').then(module => module.NewQuestionnaryComponent) 
    },
    { path: 'new-questionnary/:id', 
      loadComponent: () => import('./new-questionnary.component').then(module => module.NewQuestionnaryComponent)
    }
  ];
