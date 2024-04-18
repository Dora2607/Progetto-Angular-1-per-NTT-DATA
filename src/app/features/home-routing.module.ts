import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from '../auth/auth.guard';

import { AddUserComponent } from './home/userManagement/add-user/add-user.component';
import { UsersListComponent } from './home/userManagement/users-list/users-list.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        
        children: [
          { path: 'usersList', component:UsersListComponent, canActivate: [AuthGuard]},
          { path: 'addUser', component: AddUserComponent, canActivate: [AuthGuard] },
          { path:'', redirectTo:'usersList', pathMatch:'full'}
        ],
      },
    ],
  },

  {
    path: 'components',
    loadChildren: () =>
      import('./components/components.module').then((m) => m.ComponentsModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
