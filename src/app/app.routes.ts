import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SystemsComponent } from './components/systems/systems.component';

export const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "systems", component: SystemsComponent},

    // si ingreso a cualquier ruta que no esté definida, se redirige a /systems o  a /login, dependiendo del estado de autenticación. En este caso es indiferente /login de /systems ya que se redirijiran entre ellos dependiendo el estado de autenticación
    {path: '**', redirectTo: 'login', pathMatch: 'full'}
];
