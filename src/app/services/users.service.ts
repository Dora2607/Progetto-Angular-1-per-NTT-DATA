import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users, newUser } from '../models/users.model';

const USERS_URL = 'https://gorest.co.in/public/v2/users?page=1&per_page=30';
const USERS_URL_SHORT  = 'https://gorest.co.in/public/v2/users'

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<Array<Users>> {
    return this.httpClient.get<Array<Users>>(USERS_URL);
  }

  addUser(user:newUser){
    const token = localStorage.getItem('token');
    return this.httpClient.post(
      `${USERS_URL_SHORT}`,
      user,
      { headers: { Authorization: `Bearer ${token}` }},
    );
  }

  deleteUser(userId: number) {
    const token = localStorage.getItem('token');
    return this.httpClient.delete(
      `${USERS_URL_SHORT}/${userId}`,
      { headers: { Authorization: `Bearer ${token}` }},
    );
  }
}
