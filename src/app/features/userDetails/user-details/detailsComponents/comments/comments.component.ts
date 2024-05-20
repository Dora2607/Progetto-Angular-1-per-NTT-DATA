import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Comments } from '../../../../../models/comments.model';
import { UsersService } from '../../../../../services/users.service';
import { CommentsService } from '../../../../../services/comments.service';
import { Observable, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() postId!: number;

  comments: { [postId: number]: Comments[] } = {};
  displayedComments: { [postId: number]: Comments[] } = {};
  commentsSubscription: Subscription | undefined;

  constructor(
    private usersService: UsersService,
    private commentsService: CommentsService,
  ) {}

  ngOnInit(): void {
    console.log('postid', this.postId)
    if (this.commentsService.firstVisitCommentComponent) {
      this.getAllComments().subscribe(()=>{
        this.displayedComments[this.postId] = this.commentsService.getDisplayedComments(this.postId);
      });
      this.commentsService.firstVisitCommentComponent = false;
    } else {
      this.displayedComments[this.postId] =
        this.commentsService.getDisplayedComments(this.postId);
    }

    this.commentsSubscription = this.commentsService.commentsChanged.subscribe(
      (comments) => {
        this.comments = comments;
      },
    );

    this.commentsSubscription.add(
      this.commentsService.displayedCommentsChanged.subscribe(
        (displayedComments) => {
          this.displayedComments = displayedComments;
        },
      ),
    );
  }

  // getAllComments() {
  //   this.usersService.getComments(this.postId).subscribe((comment) => {
  //     console.log(comment)
  //     this.commentsService.setComments(this.postId, comment);
  //     this.commentsService.setDisplayedComments(this.postId, [...comment]);
      
  //   });
  // }

  getAllComments(): Observable<Comments[]> {
    return this.usersService.getComments(this.postId).pipe(
      tap((comment) => {
        console.log(comment)
        this.commentsService.setComments(this.postId, comment);
        this.commentsService.setDisplayedComments(this.postId, [...comment]);
        console.log(comment, 'da display')
      })
    );
  }

  ngOnDestroy(): void {
    if (this.commentsSubscription) {
      this.commentsSubscription.unsubscribe();
    }
  }
}
