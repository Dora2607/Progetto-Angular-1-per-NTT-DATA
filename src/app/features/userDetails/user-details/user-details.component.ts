import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from '../../../services/user-data.service';
// import { Users } from '../../../models/users.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent implements OnInit {

  userId!: string;
  // user$!: Observable<Users>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userDataService: UserDataService,
  ) {}


  


  ngOnInit() {
    // this.user$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => this.userDataService.getUser(params.get('id')!))
    // );
    this.userId =  this.route.snapshot.params['id'];
    console.log(this.userId)
    if (!this.userId) {
      alert("Invalid action. Please select a valid user.");
      this.router.navigate(['/home/usersList', this.userId]);
    }
    // this.userId = this.route.snapshot.paramMap.get('id')!;
    
  }


  //  gotoUsers(user: Users) {
  //   const userId = user ? user.id : null;
  //   this.router.navigate(['/home/usersList', userId]);
  // }
  

}
