import { Injectable } from '@angular/core';
import { Users } from '../models/users.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { PostsService } from './posts.service';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  allUsers: Array<Users> = [];
  displayedUsers: Array<Users> = [];
  firstVisit: boolean = true;
  toggleComponent: boolean = true;

  allUsersChanged = new BehaviorSubject<Array<Users>>([]);
  displayedUsersChanged = new BehaviorSubject<Array<Users>>([]);
  deleteButtonClicked = new Subject<boolean>();
  addUserButtonClicked = new Subject<boolean>();
  toggleComponentSource = new BehaviorSubject<boolean>(this.toggleComponent);
  currentToggleComponent = this.toggleComponentSource.asObservable();

  constructor(
    private postsService: PostsService,
  ) {}

  setAllUsers(users: Array<Users>) {
    this.allUsers = users;
    this.allUsersChanged.next(this.allUsers.slice());
    this.setDisplayedUsers(users);
  }

  setDisplayedUsers(displayedUsers: Array<Users>) {
    this.displayedUsers = displayedUsers;
    this.displayedUsersChanged.next(this.displayedUsers.slice());
  }

  resetAllUsers(){
    return this.firstVisit = true 
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

  setToggleComponent(toggleComponent: boolean) {
    this.toggleComponent = !toggleComponent;
    this.toggleComponentSource.next(this.toggleComponent);
  }

  deleteUser(id: number) {
    this.allUsers = this.allUsers.filter((user) => user.id !== id);
    this.displayedUsersChanged.next(this.allUsers.slice());
    this.postsService.removePosts(id);
  }


  searchUsers(searchTerm: string): Array<Users> {
    searchTerm = searchTerm.toLowerCase();

    let initialMatchUsers = this.allUsers.filter(
      (user) =>
        user.name.toLowerCase().startsWith(searchTerm) ||
        user.email.toLowerCase().startsWith(searchTerm)
    );

    if (initialMatchUsers.length === 0) {
      initialMatchUsers = this.allUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm)
      );
    }
  
    return initialMatchUsers;
  }
}
