import { ValidateService } from './../../services/validate.service';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  password: String;
  email: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password,
    };

    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('All forms fields are required!', {
        cssClass: 'alert alert-secondary',
        timeout: 5000
      });
      return false;
    }

    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please fix your email!', {
        cssClass: 'alert alert-secondary',
        timeout: 5000
      });
      return false;
    }

    this.authService.registerUser(user).subscribe((data) => {
      if (data.success) {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert alert-success',
          timeout: 5000
        });
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show(data.msg, {
          cssClass: 'alert alert-danger',
          timeout: 5000
        });
      }
    });
  }

  ngOnInit() {
  }

}
