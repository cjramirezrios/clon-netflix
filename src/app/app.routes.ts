import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'browser',
        loadComponent:()=>import('./pages/browse/browse.component').then(c=>c.BrowseComponent)
    },
    // {
    //     path:'',
    //     loadComponent:()=>import('./pages/login/login.component').then(c=>c.LoginComponent)
    // },
    {
        path:'**',
        redirectTo:'browser'
    }

];
