import { Injectable } from '@angular/core';
import { Comments } from '../models/comments.model';
import { Subject } from 'rxjs';
import { Posts } from '../models/posts.model';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  //nuovo metodo per vedere i commenti
  firstVisitCommentComponent: boolean = true;
  comments: { [postId: number]: Comments[] } = {};
  displayedComments: { [postId: number]: Comments[] } = {};

  commentsChanged = new Subject<{ [postId: number]: Comments[] }>();
  displayedCommentsChanged = new Subject<{ [postId: number]: Comments[] }>();


  getPostIds(posts:Posts[]):number[]{
    return posts.map((post) => post.id);
  }

  setComments(postId: number, comments: Comments[]) {
    this.comments[postId] = comments;
    this.emitsCommentsChange();
  }

  addComment(postId: number, comment: Comments) {
    if (!this.comments[postId]) {
      this.comments[postId] = [];
    }
    this.comments[postId].push(comment);
    this.emitsCommentsChange();
  }

  getComments(postId: number): Comments[] {
    return this.comments[postId] || [];
  }

  setDisplayedComments(postId: number, displayedComments: Comments[]) {
    this.displayedComments[postId] = displayedComments;
    this.emitsDisplayedCommentsChange();
  }

  getDisplayedComments(postId: number): Comments[] {
    return this.displayedComments[postId] || [];
  }

  private emitsCommentsChange() {
    this.commentsChanged.next(this.comments);
  }

  private emitsDisplayedCommentsChange() {
    this.displayedCommentsChanged.next(this.displayedComments);
  }
}

