import { Component, Input, OnInit} from '@angular/core';
import { Comments } from '../../../../../models/comments.model';
import { UserIdentityService } from '../../../../../services/user-identity.service';
import { UsersService } from '../../../../../services/users.service';




@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {

  @Input() postId!:number;
  commentsArray: Comments[]=[];
  loaded:boolean=false;
  commentsCount =0;
 


  constructor(
    private usersService:UsersService,
    private userIdentity: UserIdentityService,
  ){}
  
  ngOnInit(): void {
    this.usersService.getComments(this.postId).subscribe(comment =>{
      this.commentsArray=comment;
      this.loaded=true;
      // this.userIdentity.emitUpdateCommentsCount(this.commentsArray.length)
    })

  }


  

}
