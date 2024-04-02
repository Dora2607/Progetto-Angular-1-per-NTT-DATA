import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ComponentsRoutingModule } from './components-routing.module';
import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './logo/logo.component';


@NgModule({
  declarations: [
    HeaderComponent,
    LogoComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FontAwesomeModule, 
    ComponentsRoutingModule,
    
  ],
  exports: [HeaderComponent, LogoComponent]
})
export class ComponentsModule { }
