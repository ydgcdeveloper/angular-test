import { CommonService } from './../service/common/common.service';
import { RegisterInput } from './../interface/register-input';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private commonService: CommonService
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    })
  }

  ngOnInit(): void {

  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {

    return this.registerForm.get('lastName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const registerInput: RegisterInput = {
        form: {
          firstName: this.firstName?.value,
          lastName: this.lastName?.value,
          email: this.email?.value,
          plainPassword: this.password?.value,
        },
        extra: {
          isThirdPartyUser: false,
          thirdPartyProvider: null
        },
      }

      try {
        this.authService.register(registerInput).then(((result) => {
          if (result.status == 'success') {
            this.commonService.showNotification('noti-success', result.message);
          }
        }))
      } catch (error) {
        console.log(error);
      }
    }
  }
}
