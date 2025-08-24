import {environments} from '../../environments/environments';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {GoalResponseEntity} from '../model/GoalResponseEntity';

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  private readonly BACKEND_ENDPOINT_URL: string = environments.BACKEND_API_URL + "goals";

  constructor(private httpClient: HttpClient) {
  }

  public getGoals = (): Observable<GoalResponseEntity[]> => {
    return this.httpClient.get<GoalResponseEntity[]>(this.BACKEND_ENDPOINT_URL);
  }

  public getGoalsById = (id: string): Observable<GoalResponseEntity[]> => {
    return this.httpClient.get<GoalResponseEntity[]>(`${this.BACKEND_ENDPOINT_URL}/${id}`);
  }

  public createGoal = (goal: GoalResponseEntity): Observable<GoalResponseEntity> => {
    return this.httpClient.post<GoalResponseEntity>(this.BACKEND_ENDPOINT_URL, {})
  }

  public updateGoal = (goal: GoalResponseEntity): Observable<GoalResponseEntity> => {
    return this.httpClient.patch<GoalResponseEntity>(this.BACKEND_ENDPOINT_URL, {})
  }

  public deletePost = (id: string): Observable<void> => {
    return this.httpClient.delete<void>(`${this.BACKEND_ENDPOINT_URL}${id}`);
  }
}
