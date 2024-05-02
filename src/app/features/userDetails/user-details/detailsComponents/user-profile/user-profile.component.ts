import { Component, Input, OnInit } from '@angular/core';
import { UserIdentityService } from '../../../../../services/user-identity.service';
import { Users } from '../../../../../models/users.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  @Input() userId!: string;
  userProfile!: Users;
  randomDescription: string = '';

  constructor(private userIdentity: UserIdentityService) {}

  ngOnInit(): void {
    this.userIdentity.getUser(this.userId).subscribe(
      (data) => {
        this.userProfile = data;
      }
    );
    this.randomDescription = this.userIdentity.getUserDescription();
  }

}
