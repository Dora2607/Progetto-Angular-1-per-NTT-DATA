import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../../../services/user-data.service';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrl: './users-view.component.scss',
})
export class UsersViewComponent implements OnInit {
  status = 'All';
  usersShowCount = 35;
  toggle: boolean = true;
  delete: boolean = false;
  toggleComponent!: boolean;

  constructor(private userDataService: UserDataService) {}
  ngOnInit(): void {
    this.userDataService.currentToggleComponent.subscribe(
      (toggleComponent) => (this.toggleComponent = toggleComponent)
    )
  }

  onStatusUpdate(newStatus: string): void {
    this.status = newStatus;
    this.userDataService.updateStatus(newStatus);
    if (this.status === 'all') {
      this.status = 'All';
    } else if (this.status === 'active') {
      this.status = 'Online';
    } else {
      this.status = 'Offline';
    }
  }

  onUsersUpdated(count: number): void {
    this.usersShowCount = count;
    this.userDataService.updateUsersCount(count);
  }

  onaddUser(): void {
    this.toggle = true;
    this.userDataService.setToggleComponent(this.toggleComponent);
    this.userDataService.addUserButtonClicked.next(this.toggle);
  }

  deleteButton(): void {
    this.delete = !this.delete;
    this.userDataService.deleteButtonClicked.next(this.delete);
  }
}
