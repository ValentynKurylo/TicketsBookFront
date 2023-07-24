import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{
  registrationForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    this.registrationForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      let user = {
        "fullName": this.registrationForm.value.fullName,
        "email": this.registrationForm.value.email,
        "password": this.registrationForm.value.password
      }
      this.authService.registration(user).subscribe(value => {
        alert(`${value.fullName}, you was successfully registred`)
      })
    } else {
      alert("Wrong date")
    }
  }
}
