import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthModule } from '../auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { login, logout } from '../../state/auth/auth.actions';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ FormsModule, ReactiveFormsModule,AuthModule,NoopAnimationsModule ],
      providers: [ provideMockStore() ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check the form is invalid', ()=>{
    expect(component.loginForm.invalid).toBeTruthy();
  })

  it('should check the form is valid', ()=>{
    expect(component.loginForm.valid).toBeFalsy();
  })

  it('should validate form',()=>{
    component.loginForm.controls['email'].setValue('john.c.calhoun@examplepetstore.com');
    component.loginForm.controls['password'].setValue('123456');
    expect(component.loginForm.valid).toBeTruthy();
  })

  it('should dispatch login action when login is called with valid form', () => {
    component.loginForm.controls['email'].setValue('test@test.com');
    component.loginForm.controls['password'].setValue('password');

    component.login();

    expect(dispatchSpy).toHaveBeenCalledWith(login());
  });

  it('should dispatch logout action when logout is called', () => {
    component.logout();

    expect(dispatchSpy).toHaveBeenCalledWith(logout());
  });
});

