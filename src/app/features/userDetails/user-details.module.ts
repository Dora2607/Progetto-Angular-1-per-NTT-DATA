import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDetailsRoutingModule } from './user-details-routing.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserProfileComponent } from './user-details/detailsComponents/user-profile/user-profile.component';
import { PostListComponent } from './user-details/detailsComponents/post-list/post-list.component';

@NgModule({
  declarations: [UserDetailsComponent, UserProfileComponent, PostListComponent],
  imports: [CommonModule, UserDetailsRoutingModule],
  exports: [UserDetailsComponent, UserProfileComponent, PostListComponent],
})
export class UserDetailsModule {}
