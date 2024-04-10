import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/users.model';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  users: Array<Users> = [];
  usersSubscription: Subscription | undefined;
  dispalyedUsers: Array<Users> = [];
  deleteButton: boolean = false;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser(): void {
    this.usersSubscription = this.usersService.getUsers().subscribe((users) => {
      this.users = users;
      this.dispalyedUsers = [...this.users];
    });
  }

  onStatusChange(newStatus: string) {
    if (newStatus === 'all') {
      this.dispalyedUsers = [...this.users];
    } else {
      this.dispalyedUsers = this.users.filter(
        (user) => user.status === newStatus,
      );
    }
  }

  onUsersCountChange(count: number): void {
    this.dispalyedUsers = this.users.slice(0, count);
  }

  onUserDeleted(): boolean {
    return (this.deleteButton = true);
  }

  deleteUser(id: number): void {
    const confirmDelete = confirm('Are you sure you want to delete the user?');
    if (confirmDelete) {
      this.usersService.deleteUser(id).subscribe(() => {
        this.dispalyedUsers = this.dispalyedUsers.filter(
          (user) => user.id !== id,
        );
        alert('The user has been deleted');
      });
    } else {
      alert('The deletion was canceled');
    }
  }

  goToPreviousPage(): boolean {
    return (this.deleteButton = false);
  }
}
