import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  constructor(private auth: AuthService) {}
  authError: any;
  ngOnInit(): void {}

  createUser(frm) {
    this.auth.createUser(frm.value);
  }
}
