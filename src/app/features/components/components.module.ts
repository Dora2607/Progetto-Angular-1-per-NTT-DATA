import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/material/material.module';
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
    ComponentsRoutingModule,
    
  ],
  exports: [HeaderComponent]
})
export class ComponentsModule { }
