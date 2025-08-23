import {Routes} from '@angular/router';
import {Login} from './component/login/login';
import {Home} from './component/home/home';
import {Benefits} from './component/benefits/benefits';

export const routes: Routes = [
  {path: 'login', component: Login, title: "Login | Spark"},
  {path: 'home', component: Home, title: "Spark"},
  {path: 'goals', component: Home, title: "Goals | Spark"},
  {path: 'groups', component: Home, title: "Groups | Spark"},
  {path: 'benefits', component: Benefits, title: "Benefits | Spark"},
  {path: '**', redirectTo: '/login', pathMatch: 'full'},
];
