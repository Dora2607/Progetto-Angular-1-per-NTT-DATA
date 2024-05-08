import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersListComponent } from './users-list.component';

describe('UsersListComponent', () => {
  let component: UsersListComponent;
  let fixture: ComponentFixture<UsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should subscribe to usersChanged on ngOnInit', ()=>{
  //   spyOn(userDataService.usersChanged, 'subscribe');
  //   component.ngOnInit();
  //   expect(userDataService.usersChanged.subscribe).toHaveBeenCalled();
  // })

  // it('should subscribe to displayedUsersChanged on ngOnInit', ()=>{
  //   spyOn(userDataService.displayedUsersChanged, 'subscribe');
  //   component.ngOnInit();
  //   expect(userDataService.displayedUsersChanged.subscribe).toHaveBeenCalled();
  // })
});
