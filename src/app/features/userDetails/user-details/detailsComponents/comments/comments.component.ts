import { Component, Input, OnInit } from '@angular/core';
import { Comments } from '../../../../../models/comments.model';
import { UserIdentityService } from '../../../../../services/user-identity.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss'
})
export class CommentsComponent implements OnInit {

  @Input() postId!:number;
  commentsList:{ [id:number]: Array<Comments>}={};  

  constructor(
    private userIdentity: UserIdentityService,
  ){}
  
  ngOnInit(): void {
    this.userIdentity.currentComments.subscribe(comments =>{
      this.commentsList = comments
    })
  }
}
