import { Component, OnInit} from '@angular/core';
import { Users } from '../../models/users.model';
import { UsersService } from '../../services/users.service';
import { UserDataService } from '../../services/user-data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit  {

  users: Array<Users> = [];
  displayedUsers: Array<Users> = [];
  usersSubscription: Subscription | undefined;
  showUsersList: boolean = true;

  
  constructor(
    private usersService: UsersService, 
    private userDataService: UserDataService,
    private router: Router,
    
  ) {}
  
  
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
  }

  onStatusChange(newStatus: string) {
    this.userDataService.updateStatus(newStatus);
  }

  onUsersCountChange(count: number): void {
    this.userDataService.updateUsersCount(count);
  }

  toggleVisibility(): void {
    this.showUsersList = !this.showUsersList;
    if(!this.showUsersList){
      this.router.navigate(['/home/addUser']);
    }
  }

}
