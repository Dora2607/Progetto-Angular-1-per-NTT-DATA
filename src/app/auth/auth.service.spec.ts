import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should be loggedIn', ()=>{
    localStorage.setItem('token','testToken')
    expect(service.isLoggedIn()).toBeTruthy();
    localStorage.removeItem('token')
  })
});
