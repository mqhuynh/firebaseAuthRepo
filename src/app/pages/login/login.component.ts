import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  // Validation Error
  errorMessage = '';

  // For firebase error handlings
  error: { name: string; message: string } = { name: '', message: '' };
  constructor(private authservice: AuthService, private router: Router) {}

  ngOnInit(): void {}

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { name: '', message: '' };
  }

  login() {
    this.clearErrorMessage();
    if (this.validateForm(this.email, this.password)) {
      this.authservice
        .loginWithEmail(this.email, this.password)
        .then(() => {
          this.router.navigate(['/userinfo']);
        })
        .catch((_error) => {
          this.error = _error;
          this.router.navigate(['/login']);
        });
    }
  }

  validateForm(email: string, password: string) {
    if (email.length === 0) {
      this.errorMessage = 'please enter email id';
      return false;
    }

    if (password.length === 0) {
      this.errorMessage = 'please enter password';
      return false;
    }

    if (password.length < 6) {
      this.errorMessage = 'password should be at least 6 char';
      return false;
    }

    this.errorMessage = '';
    return true;
  }
}
