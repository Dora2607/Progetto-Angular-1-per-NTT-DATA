import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AuthGuard } from '../../auth/auth.guard';
// import { UserProfileComponent } from './user-details/detailsComponents/user-profile/user-profile.component';
// import { AuthGuard } from '../../auth/auth.guard';
// import { PostListComponent } from './user-details/detailsComponents/post-list/post-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserDetailsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDetailsRoutingModule {}
