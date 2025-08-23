import {Routes} from '@angular/router';
import {Login} from './component/login/login';

export const routes: Routes = [
  {path: '', component: Login, title: "Spark"},
  {path: 'login', component: Login, title: "Login | Spark"},
];
