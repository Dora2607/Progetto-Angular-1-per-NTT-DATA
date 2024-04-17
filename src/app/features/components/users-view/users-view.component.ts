import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrl: './users-view.component.scss'
})
export class UsersViewComponent  {

  //EventEmitter
  @Output() statusChange = new EventEmitter<string>();
  @Output() usersCountChange = new EventEmitter<number>();
  @Output() addUser = new EventEmitter<boolean>();
  @Output() DeleteButtonClicked = new EventEmitter<void>();

  status= 'All';
  usersShowCount = 30;
  toggle: boolean = false;

  

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
    this.addUser.emit(this.toggle);
  }


  DeleteButton(): void{
     this.DeleteButtonClicked.emit();
  }

}
