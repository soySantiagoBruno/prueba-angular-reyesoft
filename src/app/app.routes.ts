import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SystemsComponent } from './systems/systems.component';

export const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "systems", component: SystemsComponent},
    
//    {path: '**', redirectTo: '', pathMatch: 'full'}
];
