import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {

  showUsersList: boolean = true;
  subscription: Subscription | undefined;

  constructor(
    private userDataService: UserDataService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subscription = this.userDataService.addUserButtonClicked.subscribe(
      (showUsersList: boolean) => {
        this.showUsersList = !showUsersList;
        if (!this.showUsersList) {
          this.router.navigate(['/home/addUser']);
        }
      },
    );
  }


  ngOnDestroy(): void {
    if(this.subscription)
    this.subscription.unsubscribe();
  }
}
