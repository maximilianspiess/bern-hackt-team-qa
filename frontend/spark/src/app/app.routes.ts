import {Routes} from '@angular/router';
import {Login} from './component/login/login';
import {Home} from './component/home/home';
import {Goals} from './component/goals/goals';
import {Benefits} from './component/benefits/benefits';
import {Group} from './group/group';

export const routes: Routes = [
  {path: 'login', component: Login, title: "Login | Spark"},
  {path: 'home', component: Home, title: "Spark"},
  {path: 'goals', component: Goals, title: "Goals | Spark"},
  {path: 'groups', component: Group, title: "Groups | Spark"},
  {path: 'benefits', component: Benefits, title: "Benefits | Spark"},
  {path: '**', redirectTo: '/login', pathMatch: 'full'},
];
