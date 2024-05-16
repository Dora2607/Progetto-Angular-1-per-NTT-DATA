import { Component, Input, OnInit } from '@angular/core';
import { Comments } from '../../../../../models/comments.model';
import { UsersService } from '../../../../../services/users.service';
import { CommentsService } from '../../../../../services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent implements OnInit {
  @Input() postId!: number;

  commentArray:Array<Comments>=[]
  // displayedComments:Array<Comments>=[]
  loaded: boolean = false;
  comments: { [postId: number]: Comments[] } = {};
  displayedComments: { [postId: number]: Comments[] } = {};

  constructor(
    private usersService: UsersService,
    private commentsService: CommentsService
  ) {}

  ngOnInit(): void {
    if(this.commentsService.firstVisitCommentComponent){
      this.getAllComments();
      this.commentsService.firstVisitCommentComponent=false;
    }else{
      this.commentArray = this.commentsService.getDisplayedComments(this.postId);
    }

    this.commentsService.commentsChanged.subscribe(
      (comments) => {
        this.comments = comments;
        
        }
    )

    this.commentsService.displayedCommentsChanged.subscribe(
      (displayedComments)=>{
        this.displayedComments = displayedComments;
      }
    )
    
  }

  getAllComments() {
     this.usersService.getComments(this.postId).subscribe((comment) => {
      this.commentsService.setComments(this.postId, comment)
      this.commentsService.setDisplayedComments(this.postId,[...comment])
       this.loaded = true;
    });
    
  }
  
}
