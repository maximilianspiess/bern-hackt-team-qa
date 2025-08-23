import {UserResponseEntity} from '../model/UserResponseEntity';
import {environments} from '../../environments/environments';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly BACKEND_ENDPOINT_URL: string = environments.BACKEND_API_URL + "users"

  constructor(private httpClient: HttpClient) {}

  public getUsers = (): Observable<UserResponseEntity[]> => {
    return this.httpClient.get<UserResponseEntity[]>(this.BACKEND_ENDPOINT_URL);
  }

  public getUserById = (id: string): Observable<UserResponseEntity> => {
    return this.httpClient.get<UserResponseEntity>(`${this.BACKEND_ENDPOINT_URL}/${id}`);
  }

  public getUsersByToken = (token: string): Observable<UserResponseEntity> => {
    const httpHeaders: HttpHeaders = new HttpHeaders({'Content-Type':  'application/json', Authorization: 'Bearer ' + token});
    return this.httpClient.get<UserResponseEntity>(`${this.BACKEND_ENDPOINT_URL}/me`, {headers: httpHeaders});
  }

  public loginUser = (username: string, password: string): Observable<{access_token: string}> => {
    return this.httpClient.post<{access_token: string}>(`${this.BACKEND_ENDPOINT_URL}/login`, {username: username, password: password});
  }

  public createUser = (username: string, password: string): Observable<UserResponseEntity> => {
    return this.httpClient.post<UserResponseEntity>(`${this.BACKEND_ENDPOINT_URL}`, {username: username, password: password});
  }

  public deleteUser = (id: string): Observable<void> => {
    return this.httpClient.delete<void>(`${this.BACKEND_ENDPOINT_URL}${id}`);
  }
}
