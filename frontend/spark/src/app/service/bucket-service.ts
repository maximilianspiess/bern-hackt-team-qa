import { Injectable } from '@angular/core';
import {environments} from '../../environments/environments';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FriendBucketEntity} from '../model/FriendBucketEntity';
import {HabitBucketEntity} from '../model/HabitBucketEntity';

@Injectable({
  providedIn: 'root'
})
export class BucketService {
  apiPath: string = environments.BACKEND_API_URL + "buckets";

  constructor(private http: HttpClient) {
  }

  public getAllFriendBucket(): Observable<FriendBucketEntity[]>{
    return this.http.get<FriendBucketEntity[]>(this.apiPath + '/friends/me');
  }

  public getAllHabitBucket(): Observable<HabitBucketEntity[]> {
    return this.http.get<HabitBucketEntity[]>(this.apiPath + '/habit/me');
  }

  public createNewFriendBucket(dto: { habitId: string }): Observable<FriendBucketEntity> {
    return this.http.post<FriendBucketEntity>(this.apiPath + '/friends', dto);
  }

  public addUserToFriendBucket(dto: {inviteCode: string}): Observable<FriendBucketEntity>{
    return this.http.post<FriendBucketEntity>(this.apiPath + '/friends/add', dto);
  }
}
