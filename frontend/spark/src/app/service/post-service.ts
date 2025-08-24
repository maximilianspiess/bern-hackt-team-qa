import { Injectable } from '@angular/core';
import {environments} from '../../environments/environments';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  apiPath: string = environments.BACKEND_API_URL;

  constructor(private http: HttpClient) {
  }
}
