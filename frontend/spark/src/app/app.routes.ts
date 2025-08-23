import {Routes} from '@angular/router';
import {Login} from './component/login/login';
import {Home} from './component/home/home';
import {Goals} from './component/goals/goals';

export const routes: Routes = [
  {path: 'login', component: Login, title: "Login | Spark"},
  {path: 'home', component: Home, title: "Spark"},
  {path: 'goals', component: Goals, title: "Goals | Spark"},
  {path: 'groups', component: Home, title: "Groups | Spark"},
  {path: 'benefits', component: Home, title: "Benefits | Spark"},
  {path: '**', redirectTo: '/login', pathMatch: 'full'},
];
