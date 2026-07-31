import { Routes } from '@angular/router';
import { Login } from './Components/login/login';

export const routes: Routes = [
    { path: '', component: Login, pathMatch: "full" },
    { path: 'login', component: Login, pathMatch: "full" },
    //lazy load  para traer los hijos de layout module (configurados anteriormente)
    { path: 'pages', loadChildren: () => import("./Components/layout/layout-module").then(m => m.LayoutModule) },
    //en caso el usuario ponga cualquier otra ruta se redirige al login
    { path: '**', redirectTo: 'login', pathMatch: "full" }
];
