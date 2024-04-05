import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrl: './users-view.component.scss'
})
export class UsersViewComponent  {

  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();  


  sort= 'All';
  itemsShowCount = 12;
  
  

  onSortUpdate(newSort:string): void{
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }

  onItemsUpdated(count:number) :void{
    this.itemsShowCount = count;
    this.itemsCountChange.emit(count);
  }

  onColumnsUpdated(colsNum:number): void{
    this.columnsCountChange.emit(colsNum);
  }

}
