import { Component, OnInit } from '@angular/core';

import { Users } from '../../../../models/users.model';
import { UsersService } from '../../../../services/users.service';
import { Subscription } from 'rxjs';
import { UserDataService } from '../../../../services/user-data.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  users: Array<Users> = [];
  usersSubscription: Subscription | undefined;
  displayedUsers: Array<Users> = [];
  deleteButton: boolean = false;

  constructor(
    private usersService: UsersService,
    private userDataService: UserDataService,
  ) {}

  ngOnInit(): void {
    this.getAllUser();

    this.userDataService.usersChanged.subscribe((users: Array<Users>) => {
      this.users = users;
    });

    this.userDataService.displayedUsersChanged.subscribe(
      (displayedUsers: Array<Users>) => {
        this.displayedUsers = displayedUsers;
      },
    );

    this.userDataService.deleteButtonChanged.subscribe(
      (deleteButton: boolean) => {
        this.deleteButton = deleteButton;
      },
    );
  }

  getAllUser(): void {
    this.usersSubscription = this.usersService.getUsers().subscribe((users) => {
      this.userDataService.setUsers(users);
      this.userDataService.setDisplayedUsers([...users]);
    });
  }

  deleteUser(id: number): void {
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
    return (this.deleteButton = false);
  }
}
