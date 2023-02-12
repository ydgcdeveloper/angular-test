import { CommonService } from './../service/common/common.service';
import { AuthService } from './../service/auth/auth.service';
import { LoginInput } from './../interface/login-input';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private commonService: CommonService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    })
  }

  ngOnInit(): void {

  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {

      const loginInput: LoginInput = {
        username: this.email?.value,
        password: this.password?.value
      }

      try {
        this.authService.login(loginInput).then(((result) => {
          if (!result.message) {
            const token = result.data.token;
            if (token) {
              this.authService.saveToken(token);
              this.commonService.showNotification('noti-success', 'Successfully logged in!');
            }
          }
        }))
      } catch (error) {
        console.log(error);
      }
    }
  }
}
