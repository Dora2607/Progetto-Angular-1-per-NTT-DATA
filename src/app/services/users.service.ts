import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Users, newUser } from '../models/users.model';
import { Posts } from '../models/posts.model';
import { Comments } from '../models/comments.model';
import { Todos } from '../models/todos.model';
import { TOKEN } from '../token';

const USERS_URL = 'https://gorest.co.in/public/v2/users?page=1&per_page=30';
const USERS_URL_SHORT  = 'https://gorest.co.in/public/v2/users'
const POSTS_URL_SHORT = 'https://gorest.co.in/public/v2/posts'


@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(
    private httpClient: HttpClient,
    
  ) {}

  getUsers(): Observable<Array<Users>> {
    return this.httpClient.get<Array<Users>>(USERS_URL);
  }

  addUser(user:newUser){
    const token = localStorage.getItem('token');
    return this.httpClient.post(
      `${USERS_URL_SHORT}`,
      user,
      { headers: { Authorization: `Bearer ${token}` }},
    )
  }

  registerUser(user:newUser){
    const token = TOKEN;
    return this.httpClient.post(
      `${USERS_URL_SHORT}`,
      user,
      { headers: { Authorization: `Bearer ${token}` }},
    )
  }

  deleteUser(userId: number) {
    const token = localStorage.getItem('token');
    return this.httpClient.delete(
      `${USERS_URL_SHORT}/${userId}`,
      { headers: { Authorization: `Bearer ${token}` }},
    )
  }

  getPosts(userId:number): Observable<Array<Posts>>{
    return this.httpClient.get<Array<Posts>>(`${USERS_URL_SHORT}/${userId}/posts`)
  }

  getComments(postId:number): Observable<Array<Comments>>{
    return this.httpClient.get<Array<Comments>>(`${POSTS_URL_SHORT}/${postId}/comments`)
  }

  getTodos(userId:number): Observable<Array<Todos>>{
    return this.httpClient.get<Array<Todos>>(`${USERS_URL_SHORT}/${userId}/todos`)
  }


}
