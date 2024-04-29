import { Component, OnInit } from '@angular/core';

import { Users } from '../../../../models/users.model';
import { UsersService } from '../../../../services/users.service';
import { Observable, Subscription } from 'rxjs';
import { UserDataService } from '../../../../services/user-data.service';
import { ActivatedRoute } from '@angular/router';

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
  id: string | undefined;
  
  Users$!:Observable<Users[]>
  selectedId=0;

  constructor(
    private usersService: UsersService,
    private userDataService: UserDataService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    
    if (this.userDataService.firstVisit) {
      this.getAllUser();
      this.userDataService.firstVisit = false;
    }else{
      this.displayedUsers = this.userDataService.getDisplayedUsers()
    }

    
    this.userDataService.usersChanged.subscribe((users: Array<Users>) => {
      this.users = users;
    });

    this.userDataService.displayedUsersChanged.subscribe(
      (displayedUsers: Array<Users>) => {
        this.displayedUsers = displayedUsers;
      },
    );

    this.userDataService.deleteButtonClicked.subscribe(
      (deleteButton: boolean) => {
        this.deleteButton = deleteButton;
      },
    );

    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
    

    // this.Users$ = this.route.paramMap.pipe(
    //   // Extract the id from the route
    //   switchMap((params)=>{
    //     this.selectedId = parseInt(params.get('id')!,10);
    //     return this.userDataService.getUsers();
    //   })
    // )

  }

  getAllUser(): void {
    this.usersSubscription = this.usersService.getUsers().subscribe((users) => {
      this.userDataService.setUsers(users);
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
    return (this.deleteButton = false);
  }


 

}
