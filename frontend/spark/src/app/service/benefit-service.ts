import { Injectable } from '@angular/core';
import {environments} from '../../environments/environments';
import {HttpClient, HttpStatusCode} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BenefitEntity} from '../model/BenefitEntity';

@Injectable({
  providedIn: 'root'
})
export class BenefitService {
  apiPath: string = environments.BACKEND_API_URL + 'benefits';

  constructor(private http: HttpClient) {
  }

  public getAllBenefits(): Observable<BenefitEntity[]> {
    return this.http.get<BenefitEntity[]>(this.apiPath);
  }

  public redeemBenefit(benefitId: string): Observable<void>{
    return this.http.get<void>(environments.BACKEND_API_URL + '/spark-accounts/redeem/' + benefitId);
  }
}
