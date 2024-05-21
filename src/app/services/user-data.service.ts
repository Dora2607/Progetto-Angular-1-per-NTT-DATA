import { Injectable } from '@angular/core';
import { Users } from '../models/users.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { Store } from '@ngrx/store';


@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  allUsers: Array<Users> = [];
  displayedUsers: Array<Users> = [];
  firstVisit: boolean = true;

  allUsersChanged =  new BehaviorSubject<Array<Users>>([]);
  displayedUsersChanged = new BehaviorSubject<Array<Users>>([]);
  deleteButtonClicked = new Subject<boolean>();
  addUserButtonClicked = new Subject<boolean>();

  constructor(private store: Store) {}

  setAllUsers(users: Array<Users>) {
    this.allUsers = users;
    this.allUsersChanged.next(this.allUsers.slice());
    this.setDisplayedUsers(users);
  }

  setDisplayedUsers(displayedUsers: Array<Users>) {
    this.displayedUsers = displayedUsers;
    this.displayedUsersChanged.next(this.displayedUsers.slice());
  }

  updateStatus(newStatus: string) {
    this.setDisplayedUsers(
      newStatus === 'all'
        ? [...this.allUsers]
        : this.allUsers.filter((user) => user.status === newStatus),
    );
  }

  updateUsersCount(count: number) {
    this.setDisplayedUsers(this.allUsers.slice(0, count));
  }


  addUser(user: Users) {
    this.allUsers.unshift(user);
    this.displayedUsersChanged.next(this.allUsers.slice());
  }

  getDisplayedUsers() {
    return this.allUsers.slice();
  }

  deleteUser(id: number) {
    this.allUsers = this.displayedUsers.filter((user) => user.id !== id);
    this.displayedUsersChanged.next(this.allUsers.slice());
  }
}
