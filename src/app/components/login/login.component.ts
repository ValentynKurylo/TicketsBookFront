import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private tokenService: TokenService) {}

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authService.login(loginData).subscribe(value => {
        console.log(value)
        localStorage.setItem("token", value.token)
        localStorage.setItem("access", '1')
        localStorage.setItem('user', value.user.role)
        alert(`Hello ${value.user.fullName}!`)
      })
    } else {
       alert("Wrong email or password")
    }
  }
}
