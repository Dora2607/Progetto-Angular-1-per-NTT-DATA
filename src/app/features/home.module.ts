import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from './components/components.module';
import { UserManagementModule } from './home/userManagement/user-management.module';
import { UserDetailsModule } from './userDetails/user-details.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';







@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    UserManagementModule,
    HomeRoutingModule,
    UserDetailsModule,
  ],
  
})
export class HomeModule { }
