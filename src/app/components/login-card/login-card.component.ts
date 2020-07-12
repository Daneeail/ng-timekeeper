import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent implements OnInit {
  userEmail: string;
  userPassword: string;

  @ViewChild('f', {static: false}) form: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.router.navigateByUrl('time-card');
    }
  }

}
