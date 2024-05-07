import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/users.model';
import { UserDataService } from '../../services/user-data.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  users: Array<Users> = [];
  displayedUsers: Array<Users> = [];
  showUsersList: boolean = true;

  constructor(
    private userDataService: UserDataService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userDataService.usersChanged.subscribe((users: Array<Users>) => {
      this.users = users;
    });

    this.userDataService.displayedUsersChanged.subscribe(
      (displayedUsers: Array<Users>) => {
        this.displayedUsers = displayedUsers;
      },
    );
    this.userDataService.addUserButtonClicked.subscribe(
      (showUsersList: boolean) => {
        this.showUsersList = !showUsersList;
        if (!this.showUsersList) {
          this.router.navigate(['/home/addUser']);
        }
      },
    );
  }

  onStatusChange(newStatus: string) {
    this.userDataService.updateStatus(newStatus);
  }

  onUsersCountChange(count: number): void {
    this.userDataService.updateUsersCount(count);
  }
}
