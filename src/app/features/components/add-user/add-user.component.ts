import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent implements OnInit {
 
  public addUserForm!: FormGroup;

  

  errorMessage = '';

  constructor() {}

  ngOnInit(): void {
    this.addUserForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  }

  addUser(){}

  goBack(event:Event){
    event.preventDefault();
    history.back();
  }
 

}
