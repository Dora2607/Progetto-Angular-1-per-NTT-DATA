import { Injectable } from '@angular/core';
import { Users } from '../models/users.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  // Variable
  users: Array<Users> = [];
  displayedUsers: Array<Users> = [];


  // Observables
  usersChanged = new Subject<Array<Users>>();
  displayedUsersChanged = new Subject<Array<Users>>();
  deleteButtonClicked = new Subject<boolean>();
  addUserButtonClicked = new Subject<boolean>();

  constructor() {}

  // Setters

  setUsers(users: Array<Users>) {
    this.users = users;
    this.usersChanged.next(this.users.slice());
  }

  setDisplayedUsers(dispalyedUsers: Array<Users>) {
    this.displayedUsers = dispalyedUsers;
    this.displayedUsersChanged.next(this.displayedUsers.slice());
  }

  // Update

  updateStatus(newStatus: string) {
    if (newStatus === 'all') {
      this.setDisplayedUsers([...this.users]);
    } else {
      this.setDisplayedUsers(
        this.users.filter((user) => user.status === newStatus),
      );
    }
  }

  updateUsersCount(count: number) {
    this.setDisplayedUsers(this.users.slice(0, count));
  }

  deleteUser(id: number) {
    this.setUsers(this.users.filter((user) => user.id !== id));
    this.setDisplayedUsers(
      this.displayedUsers.filter((user) => user.id !== id),
    );
  }




}
