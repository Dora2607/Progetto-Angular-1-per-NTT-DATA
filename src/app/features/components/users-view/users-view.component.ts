import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrl: './users-view.component.scss'
})
export class UsersViewComponent  {

  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() usersCountChange = new EventEmitter<number>();
  @Output() statusChange = new EventEmitter<string>();  


  status= 'All';
  usersShowCount = 6;
  
  

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

  onColumnsUpdated(colsNum:number): void{
    this.columnsCountChange.emit(colsNum);
  }

}
