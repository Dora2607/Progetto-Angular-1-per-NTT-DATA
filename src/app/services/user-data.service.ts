import { Injectable } from '@angular/core';
import { Users } from '../models/users.model';
import { Observable, Subject, filter } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectLoggedInUser } from '../state/auth/auth.reducer';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  users: Array<Users> = [];
  displayedUsers: Array<Users> = [];
  firstVisit: boolean = true;

  usersChanged = new Subject<Array<Users>>();
  displayedUsersChanged = new Subject<Array<Users>>();
  deleteButtonClicked = new Subject<boolean>();
  addUserButtonClicked = new Subject<boolean>();
  

  constructor(private store:Store){}

  setUsers(users: Array<Users>) {
    this.users = users;
    this.emitUsersChange();
  }

  setDisplayedUsers(displayedUsers: Array<Users>) {
    this.displayedUsers = displayedUsers;
    this.emitDisplayedUsersChange();
  }

  emitUsersChange() {
    this.usersChanged.next(this.users.slice());
  }

  emitDisplayedUsersChange() {
    this.displayedUsersChanged.next(this.displayedUsers.slice());
  }

  updateStatus(newStatus: string) {
    this.setDisplayedUsers(
      newStatus === 'all'
        ? [...this.users]
        : this.users.filter((user) => user.status === newStatus),
    );
  }

  updateUsersCount(count: number) {
    this.setDisplayedUsers(this.users.slice(0, count));
  }

  getLoggedInUser(): Observable<Users | null> {
    return this.store
      .select(selectLoggedInUser)
      .pipe(filter((user) => user !== null && user !== undefined))    
  }

  addUser(user: Users) {
    this.users.unshift(user);
    this.emitUsersChange();
    this.setDisplayedUsers(this.users);
    
  }

  getDisplayedUsers() {
    return this.displayedUsers.slice();
  }

  deleteUser(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
    this.emitUsersChange();
    this.setDisplayedUsers(this.users);
  }


}
