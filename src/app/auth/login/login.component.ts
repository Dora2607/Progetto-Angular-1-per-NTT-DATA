import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  public formValidate !: FormGroup;
  public isInValid !: boolean;
  constructor(private formBuilder : FormBuilder, private router: Router) {
    localStorage.clear()
  }

  // form = new FormGroup({
  //   email: new FormControl('', {validators: [Validators.required, Validators.email]}),
  //   password: new FormControl('', {validators: [Validators.required, Validators.minLength(8)]})
  // })
  ngOnInit(): void {
    this.formValidate = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required], 
    })
  }

  login(): void {
    let isChecked = true;
    if(!this.formValidate.valid){
      for(const i in this.formValidate.controls){
        this.formValidate.controls[i].markAsDirty();
        this.formValidate.controls[i].updateValueAndValidity();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        isChecked = false;
      }
    }
    if(this.formValidate.valid){
      alert('Logged is Successfully')
      localStorage.setItem('token', 'cb2af7f1b4485244e6ecb207339b556f519890da130d4203ea0c98d37aa90882')
      this.formValidate.reset();
      this.router.navigate(['home'])

    }

  }
}
