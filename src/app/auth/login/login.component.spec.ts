import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthModule } from '../auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { login, register} from '../../state/auth/auth.actions';
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
    const email = 'test@test.com';
    const password = 'password';
  
    component.loginForm.controls['email'].setValue(email);
    component.loginForm.controls['password'].setValue(password);
  
    component.login();
  
    expect(dispatchSpy).toHaveBeenCalledWith(
      login({
        email: email,
        password: password,
      })
    );
  });

  it('should validate signup form', () => {
    component.signupForm.controls['name'].setValue('John Doe');
    component.signupForm.controls['gender'].setValue('Male');
    component.signupForm.controls['email'].setValue('john.doe@example.com');
    component.signupForm.controls['password'].setValue('password');
  
    expect(component.signupForm.valid).toBeTruthy();
  });
  
  it('should dispatch register action when signup is called with valid form', () => {
    const name = 'John Doe';
    const gender = 'Male';
    const email = 'john.doe@example.com';
    const password = 'password';
  
    component.signupForm.controls['name'].setValue(name);
    component.signupForm.controls['gender'].setValue(gender);
    component.signupForm.controls['email'].setValue(email);
    component.signupForm.controls['password'].setValue(password);
  
    component.signup();
  
    expect(dispatchSpy).toHaveBeenCalledWith(
      register({
        name: name,
        gender: gender,
        email: email,
        password: password,
      })
    );
  });


});

