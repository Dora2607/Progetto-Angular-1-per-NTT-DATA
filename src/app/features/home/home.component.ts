import { Component, OnInit} from '@angular/core';
import { Users } from '../../models/users.model';
import { UsersService } from '../../services/users.service';
import { UserDataService } from '../../services/user-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit  {
  users: Array<Users> = [];
  displayedUsers: Array<Users> = [];
  deleteButton: boolean = false;
  usersSubscription: Subscription | undefined;
  
  constructor(
    private usersService: UsersService, 
    private userDataService: UserDataService) {}
  
  
  ngOnInit(): void {
    
    this.userDataService.usersChanged.subscribe(
      (users: Array<Users>) => {
        this.users = users;
      }
    )

    this.userDataService.displayedUsersChanged.subscribe(
      (displayedUsers: Array<Users>) => {
        this.displayedUsers = displayedUsers;
      }
    )

    this.userDataService.deleteButtonChanged.subscribe(
      (deleteButton: boolean) => {
        this.deleteButton = deleteButton;
      }
    )

  }

  onStatusChange(newStatus: string) {
    this.userDataService.updateStatus(newStatus);
  }

  onUsersCountChange(count: number): void {
    this.userDataService.updateUsersCount(count);
  }

  // onUserDeleted(): void {
  //   this.userDataService.deleteUser();
  // }
  
  onUserDeleted(): void {
    this.userDataService.deleteUser(id);
  }

}
