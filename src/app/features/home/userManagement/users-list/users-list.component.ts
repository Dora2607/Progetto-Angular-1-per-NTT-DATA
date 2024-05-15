import { Component, OnDestroy, OnInit } from '@angular/core';
import { Users } from '../../../../models/users.model';
import { UsersService } from '../../../../services/users.service';
import { Subscription } from 'rxjs';
import { UserDataService } from '../../../../services/user-data.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit, OnDestroy {
  users: Array<Users> = [];
  usersSubscription: Subscription | undefined;
  displayedUsers: Array<Users> = [];
  deleteButton: boolean = false;
  loggedInUser!: Users;
  personalProfile: boolean = false;

  constructor(
    private usersService: UsersService,
    private userDataService: UserDataService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    if (this.userDataService.firstVisit) {
      this.getAllUser();
      this.userDataService.firstVisit = false;
    } else {
      this.displayedUsers = this.userDataService.getDisplayedUsers();
    }

    this.usersSubscription = this.userDataService.usersChanged.subscribe(
      (users: Array<Users>) => {
        this.users = users;
      },
    );

    this.usersSubscription.add(
      this.userDataService.displayedUsersChanged.subscribe(
        (displayedUsers: Array<Users>) => {
          this.displayedUsers = displayedUsers;
        },
      ),
    );

    this.userDataService.getLoggedInUser().subscribe((user) => {
      if (user) {
        this.loggedInUser = user;
      }
    });

    this.userDataService.deleteButtonClicked.subscribe(
      (deleteButton: boolean) => {
        this.deleteButton = deleteButton;
      },
    );
  }

  getAllUser(): void {
    this.usersService.getUsers().subscribe((users) => {
      this.userDataService.setUsers(users);
      if (
        this.loggedInUser &&
        !users.find((u) => u.id === this.loggedInUser.id)
      ) {
        this.userDataService.addUser(this.loggedInUser);
      }
      this.userDataService.setDisplayedUsers([...users]);
    });
  }

  activeDeleteUser(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete the user?');
    if (confirmDelete) {
      this.usersService.deleteUser(id).subscribe(() => {
        this.userDataService.deleteUser(id);
        alert('The user has been deleted');
      });
    } else {
      alert('The deletion was canceled');
    }
  }

  goToPreviousPage(): boolean {
    return (this.deleteButton = !this.deleteButton);
  }

  ngOnDestroy(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }
}
