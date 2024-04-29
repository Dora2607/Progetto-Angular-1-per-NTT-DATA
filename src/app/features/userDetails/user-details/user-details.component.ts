import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {

  constructor(private route:ActivatedRoute){
    this.route.params.subscribe((params) =>{
      console.log("User Details Params", params);
      const userID = params['id'];
      if(!userID || isNaN(+userID)){
        alert('Invalid User ID');
      }else{
        // Fetch the user details using the provided user id and display it on UI
        this.displayUserDetails(+userID);
      }
    });
  }

}
