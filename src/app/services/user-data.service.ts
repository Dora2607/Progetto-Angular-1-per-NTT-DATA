import { Injectable } from '@angular/core';
import { Users } from '../models/users.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  // Array of all users
  users: Array<Users> = [];
  // Array of users to be displayed
  displayedUsers: Array<Users> = [];

  // Observables

  // Observable for notifying changes in the users array
  usersChanged = new Subject<Array<Users>>();
  // Observable for notifying changes in the displayedUsers array
  displayedUsersChanged = new Subject<Array<Users>>();
  // Observable for notifying when the delete button is clicked
  deleteButtonClicked = new Subject<boolean>();
  // Observable for notifying when the add user button is clicked
  addUserButtonClicked = new Subject<boolean>();

  constructor() {}

  // Setters

  // Setter for the users array
  setUsers(users: Array<Users>) {
    this.users = users;
    this.usersChanged.next(this.users.slice());
  }

  // Setter for the displayedUsers array
  setDisplayedUsers(dispalyedUsers: Array<Users>) {
    this.displayedUsers = dispalyedUsers;
    this.displayedUsersChanged.next(this.displayedUsers.slice());
  }

  // Update

  // Updates the displayedUsers array based on the provided status
  updateStatus(newStatus: string) {
    if (newStatus === 'all') {
      this.setDisplayedUsers([...this.users]);
    } else {
      this.setDisplayedUsers(
        this.users.filter((user) => user.status === newStatus),
      );
    }
  }

  // Updates the displayedUsers array to contain the first count users from the users array
  updateUsersCount(count: number) {
    this.setDisplayedUsers(this.users.slice(0, count));
  }

  updateDisplayedUsers(): void {
    this.displayedUsers = this.getDisplayedUsers();
  }


  // Adds a new user to the users array and updates the displayedUsers array to contain all users
  addUser(user: Users) {
    this.users = [...this.users, user];
    this.usersChanged.next(this.users.slice());
    this.setDisplayedUsers(this.users);
  }

  // Returns a copy of the displayedUsers array
  getDisplayedUsers() {
    return this.displayedUsers.slice();
  }

  // Removes the user with the given id from both the users and displayedUsers arrays
  deleteUser(id: number) {
    this.setUsers(this.users.filter((user) => user.id !== id));
    this.setDisplayedUsers(
      this.displayedUsers.filter((user) => user.id !== id),
    );
  }
}
