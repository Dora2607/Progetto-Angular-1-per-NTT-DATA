import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsComponent } from './comments.component';
import { UsersService } from '../../../../../services/users.service';
import { CommentsService } from '../../../../../services/comments.service';
import { Subject } from 'rxjs';
import { Comments } from '../../../../../models/comments.model';
import { UserDetailsRoutingModule } from '../../../user-details-routing.module';
import { DetailsModule } from '../details.module';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let usersService: UsersService;
  let commentsService: CommentsService;

  beforeEach(async () => {

    const usersServiceMock ={
      getComments: jasmine.createSpy('getComments')
    }

    const commentsServiceMock = {
      commentsChanged: new Subject<{ [postId: number]: Comments[] }>(),
      displayedCommentsChanged: new Subject<{ [postId: number]: Comments[] }>(),
      setComments: jasmine.createSpy('setComments'),
      setDisplayedComments:jasmine.createSpy('setDisplayedComments'),
      getComments: jasmine.createSpy('setComments'),
      getDisplayedComments:jasmine.createSpy('setDisplayedComments')
    }


    await TestBed.configureTestingModule({
      declarations: [CommentsComponent],
      imports: [UserDetailsRoutingModule, DetailsModule],
      providers: [
        { provide: UsersService, useValue: usersServiceMock },
        { provide: CommentsService, useValue: commentsServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    usersService = TestBed.inject(UsersService);
    commentsService = TestBed.inject(CommentsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should update comments when commentsChanged emits', () => {
    const comments = { [component.postId]: [{ id: 1, post_id: 1, name: 'Test', email: 'test@test.com', body: 'Test comment' }] };
    commentsService.commentsChanged.next(comments);
    expect(component.comments).toEqual(comments);
  });
  
  it('should update displayedComments when displayedCommentsChanged emits', () => {
    const displayedComments = { [component.postId]: [{ id: 1, post_id: 1, name: 'Test', email: 'test@test.com', body: 'Test comment' }] };
    commentsService.displayedCommentsChanged.next(displayedComments);
    expect(component.displayedComments).toEqual(displayedComments);
  });
  
  it('should unsubscribe from commentsSubscription when ngOnDestroy is called', () => {
    if (component.commentsSubscription) {
      const unsubscribeSpy = spyOn(component.commentsSubscription, 'unsubscribe');
      component.ngOnDestroy();
      expect(unsubscribeSpy).toHaveBeenCalled();
    }
  });
  
});