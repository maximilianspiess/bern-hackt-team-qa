import { Injectable } from '@angular/core';
import {environments} from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class BucketService {
  apiPath: string = environments.BACKEND_API_URL +
}
