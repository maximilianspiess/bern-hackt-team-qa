import { Injectable } from '@angular/core';
import {environments} from '../../environments/environments';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SparkAccountEntity} from '../model/SparkAccountEntity';

@Injectable({
  providedIn: 'root'
})
export class SparkAccountService {
  apiPath: string = environments.BACKEND_API_URL + 'spark-accounts';

  constructor(private http: HttpClient) {
  }

  public getSparkAccountById(): Observable<SparkAccountEntity> {
    return this.http.get<SparkAccountEntity>(this.apiPath);
  }
}
