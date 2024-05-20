import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { UserManagementModule } from './home/userManagement/user-management.module';
import { UserDetailsModule } from './userDetails/user-details.module';
import { PostOverviewModule } from './postOverview/post-overview.module';

import { HomeRoutingModule } from './home-routing.module';
import { PostOverviewRoutingModule } from './postOverview/post-overview-routing.module';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    UserManagementModule,
    HomeRoutingModule,
    UserDetailsModule,
    PostOverviewModule,
    PostOverviewRoutingModule
  ],
  
})
export class HomeModule { }
