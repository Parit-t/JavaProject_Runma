import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})

export class RegisterUserComponent {

  user:User;
  constructor(private userservice: UserService){
    this.user = new User();
  }
  form = {
    email: '',
    password: '',
    confirmPassword: '',
    firstname: '',
    lastname: '',
    gender: '',
    phone: '',
    //acceptTerms: false,
  };
  
  onSubmit(): void {
    
    const isFormValid = Object.values(this.form).every(value => Boolean(value));
    
    if(!isFormValid) {
      console.log("please insert all blank");
      return
    };
    
    this.user.email = this.form.email;
    this.user.password = this.form.password;
    this.user.fname = this.form.firstname;
    this.user.lname = this.form.lastname;
    this.user.gender = this.form.gender;
    this.user.phone = parseInt(this.form.phone);
    
    //console.log(JSON.stringify(this.user));
    this.userservice.createUser(this.user).subscribe(
      (data)=> {console.log("success" , data);},
      (error) => {console.log(error);}
    );
  }
}

