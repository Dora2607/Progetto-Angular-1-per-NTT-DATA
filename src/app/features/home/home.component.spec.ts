import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { UsersViewComponent } from '../components/users-view/users-view.component';
import { ComponentsRoutingModule } from '../components/components-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UserDataService } from '../../services/user-data.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Users } from '../../models/users.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userDataService: UserDataService;

  beforeEach(async () => {
    const userDataServiceMock = {
      usersChanged: new Subject<Array<Users>>(),
      displayedUsersChanged: new Subject<Array<Users>>(),
      addUserButtonClicked: new Subject<boolean>(),
      updateStatus: jasmine.createSpy('updateStatus'),
      updateUsersCount: jasmine.createSpy('updateUsersCount'),
    };

    await TestBed.configureTestingModule({
      declarations: [HomeComponent, UsersViewComponent],
      imports: [ComponentsRoutingModule, SharedModule],
      providers: [{ provide: UserDataService, useValue: userDataServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    userDataService = TestBed.inject(UserDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to usersChanged on ngOnInit', ()=>{
    spyOn(userDataService.usersChanged, 'subscribe');
    component.ngOnInit();
    expect(userDataService.usersChanged.subscribe).toHaveBeenCalled();
  })

  it('should subscribe to displayedUsersChanged on ngOnInit', ()=>{
    spyOn(userDataService.displayedUsersChanged, 'subscribe');
    component.ngOnInit();
    expect(userDataService.displayedUsersChanged.subscribe).toHaveBeenCalled();
  })

  it('should call updateStatus when onStatusChange is called', () => {
    component.onStatusChange('test-status');
    expect(userDataService.updateStatus).toHaveBeenCalledWith('test-status');
  });
  
  it('should call updateUsersCount when onUsersCountChange is called', () => {
    component.onUsersCountChange(5);
    expect(userDataService.updateUsersCount).toHaveBeenCalledWith(5);
  });


  it('should toggle showUsersList and navigate when addUserButtonClicked emits', () => {
    
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');
    component.showUsersList = false;
    userDataService.addUserButtonClicked.next(true);
    expect(component.showUsersList).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/home/addUser']);
    
  });


});
  

