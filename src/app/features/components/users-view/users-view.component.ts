import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrl: './users-view.component.scss'
})
export class UsersViewComponent  {

  
  
  @Output() statusChange = new EventEmitter<string>();  
  @Output() usersCountChange = new EventEmitter<number>();
  @Output() DeleteButtonClicked = new EventEmitter<void>();

  status= 'All';
  usersShowCount = 5;
  
  

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

  DeleteButton(): void{
     this.DeleteButtonClicked.emit();
  }



}
