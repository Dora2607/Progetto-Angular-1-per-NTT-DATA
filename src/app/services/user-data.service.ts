import { Injectable } from '@angular/core';
import { Users } from '../models/users.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  users: Array<Users> = [];
  displayedUsers: Array<Users> = [];
  deleteButton: boolean = false;

  usersChanged = new Subject<Array<Users>>();
  displayedUsersChanged = new Subject<Array<Users>>();
  deleteButtonChanged = new Subject<boolean>();

  constructor() {}

  setUsers(users: Array<Users>) {
    this.users = users;
    this.usersChanged.next(this.users.slice());
  }

  setDisplayedUsers(dispalyedUsers: Array<Users>) {
    this.displayedUsers = dispalyedUsers;
    this.displayedUsersChanged.next(this.displayedUsers.slice());
  }

  setDeleteButton(deleteButton: boolean) {
    this.deleteButton = deleteButton;
    this.deleteButtonChanged.next(this.deleteButton);
  }

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
    const confirmDelete = confirm('Are you sure you want to delete the user?');
    if (confirmDelete) {
      this.setUsers(this.users.filter((user) => user.id !== id));
      this.setDisplayedUsers(
        this.displayedUsers.filter((user) => user.id !== id),
      );
    }
  }
}
