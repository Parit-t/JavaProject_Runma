import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Organizer } from 'src/app/model/organizer';
import { OrganizerService } from '../../services/organizer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-organizer',
  templateUrl: './register-organizer.component.html',
  styleUrls: ['./register-organizer.component.css'],
})
export class RegisterOrganizerComponent implements OnInit {
  registrationForm!: FormGroup;
  alertMessage?: string;
  checkRegister: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private organizerService: OrganizerService,
    private http: HttpClient,
    private router: Router
  ) {}

  createForm() {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      website: [''],
      facebook: [''],
    });
  }
  ngOnInit(): void {
    this.createForm();
  }
  showAlertMessage(alertMessage: string, checkRegister: boolean) {
    this.alertMessage = alertMessage;
    this.checkRegister = checkRegister;
    // Automatically close the alert box after 5 seconds
    setTimeout(() => {
      this.alertMessage = '';
      this.checkRegister = false;
    }, 5000);
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formData: Organizer = new Organizer();
      formData.name = this.registrationForm.value.name ;
      formData.email = this.registrationForm.value.email;
      formData.contact = this.registrationForm.value.contact;
      formData.website = this.registrationForm.value.website;
      formData.facebook = this.registrationForm.value.facebook;
      
      console.log(this.registrationForm.value);
      this.organizerService.newOrganizer(formData).subscribe(
        () => {
          // Registration successful, do something (e.g. redirect to login page)
          this.showAlertMessage('Registration successful! Redirecting...', true);
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        },
        (error) => {
          if (error.status === 409) {
            this.showAlertMessage('Email address already in use', false);
          } else {
            this.showAlertMessage(
              'Registration failed, please try again later',
              false
            );
          }
        }
      );
    }
  }
}
