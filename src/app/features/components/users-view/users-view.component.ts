import { Component, EventEmitter, Output } from '@angular/core';
import { UserDataService } from '../../../services/user-data.service';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrl: './users-view.component.scss'
})
export class UsersViewComponent  {

  //EventEmitter
  @Output() statusChange = new EventEmitter<string>();
  @Output() usersCountChange = new EventEmitter<number>();

 
  status= 'All';
  usersShowCount = 35;
  toggle: boolean = false;
  delete: boolean = false;

  constructor(private userDataService:UserDataService){}

  onStatusUpdate(newStatus:string): void{
    this.status = newStatus;
    this.statusChange.emit(newStatus);
    if (this.status === "all"){
      this.status='All';
    }else if (this.status==="active"){
      this.status='Online';
    }else{
      this.status="Offline";
    }
  }

  onUsersUpdated(count:number) :void{
    this.usersShowCount = count;
    this.usersCountChange.emit(count);
  }

  onaddUser():void{
    this.toggle = true;
    this.userDataService.addUserButtonClicked.next(this.toggle);
  }


  deleteButton(): void{
    this.delete = true;
    this.userDataService.deleteButtonClicked.next(this.delete)
  }

}
