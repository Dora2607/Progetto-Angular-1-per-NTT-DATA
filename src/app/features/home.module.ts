import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../shared/material/material.module';
import { ComponentsModule } from './components/components.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';





@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    HomeRoutingModule,
  ],
  
})
export class HomeModule { }
