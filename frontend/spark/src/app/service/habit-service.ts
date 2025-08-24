import {Injectable} from '@angular/core';
import {environments} from '../../environments/environments';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {HabitEntity} from '../model/HabitEntity';
import {UserResponseEntity} from '../model/UserResponseEntity';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private readonly BACKEND_URL = environments.BACKEND_API_URL + "habits"

  constructor(private httpClient: HttpClient) {
  }

  public getHabits = (): Observable<HabitEntity[]> => {
    return this.httpClient.get<HabitEntity[]>(this.BACKEND_URL);
  }

  public getHabitById = (id: string): Observable<HabitEntity> => {
    return this.httpClient.get<HabitEntity>(`${this.BACKEND_URL}/${id}`)
  }

  public createHabit = (title: string, user: UserResponseEntity, icon: string): Observable<HabitEntity> => {
    return this.httpClient.post<HabitEntity>(`${this.BACKEND_URL}`, {
      title: title,
      userId: user.id,
      icon: icon,
      goalIds: []
    })
  }

  public updateHabit = (id: string, title?: string, user?: UserResponseEntity, icon?: string, goalIds?: string[]): Observable<HabitEntity> => {
    return this.httpClient.patch<HabitEntity>(`${this.BACKEND_URL}/${id}`, {
      title: title,
      userId: user?.id,
      icon: icon,
      goalIds: goalIds
    })
  }

  public removeHabit = (id: string) => {
    this.httpClient.delete(`${this.BACKEND_URL}/${id}`)
  }
}
