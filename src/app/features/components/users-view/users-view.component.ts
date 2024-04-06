import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrl: './users-view.component.scss'
})
export class UsersViewComponent  {

  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() usersCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();  


  sort= 'All';
  usersShowCount = 6;
  
  

  onSortUpdate(newSort:string): void{
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }

  onUsersUpdated(count:number) :void{
    this.usersShowCount = count;
    this.usersCountChange.emit(count);
  }

  onColumnsUpdated(colsNum:number): void{
    this.columnsCountChange.emit(colsNum);
  }

}
