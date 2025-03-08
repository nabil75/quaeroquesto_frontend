import { Routes } from '@angular/router';

export const editQuestionnaryRoutes: Routes = [
    { 
      path: 'edit-questionnary/:id', 
      loadComponent: () => import('./edit-questionnary.component').then(module => module.EditQuestionnaryComponent)
    },
]