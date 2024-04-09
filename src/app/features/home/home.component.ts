import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/users.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {

  users: Users[] = [
    {
      id: 6823515,
      name: 'Indira Verma',
      email: 'indira_verma@champlin-bradtke.test',
      gender: 'male',
      status: 'active',
    },
    {
      id: 6823514,
      name: 'Avadhesh Ahluwalia',
      email: 'ahluwalia_avadhesh@nicolas.test',
      gender: 'male',
      status: 'active',
    },
    {
      id: 6823513,
      name: 'Sucheta Chattopadhyay',
      email: 'chattopadhyay_sucheta@corkery.test',
      gender: 'male',
      status: 'active',
    },
    {
      id: 6823512,
      name: 'Aadi Trivedi',
      email: 'trivedi_aadi@sanford.example',
      gender: 'male',
      status: 'inactive',
    },
  ];

  deleteButton:boolean = false;

  dispalyedUsers:Users[]=[] ;

    ngOnInit(): void {
      this.dispalyedUsers = this.users;
  }

  onStatusChange(newStatus:string){
    if(newStatus==='all'){
      this.dispalyedUsers = this.users;
    }else{
      this.dispalyedUsers = this.users.filter((user)=> user.status=== newStatus);
    }
  }

  onUsersCountChange(count:number) :void{
    this.dispalyedUsers = this.users.slice(0, count);
  }

  onUserDeleted(): boolean {
    return this.deleteButton = true;
  }

  goToPreviousPage():boolean{
    return this.deleteButton=false;
  }

}



