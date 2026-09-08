import { Component } from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

import { CommonModule } from '@angular/common';

import { AuthService }
  from '../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {

  loading = false;

  errorMessage = '';

  loginForm;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.loginForm =
      this.fb.group({

        email: [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],

        password: [
          '',
          Validators.required
        ]

      });

  }


  async onSubmit() {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;

    }

    this.loading = true;

    this.errorMessage = '';

    try {

      const {
        email,
        password
      } = this.loginForm.value;

      await this.authService.login(
        email!,
        password!
      );

      await this.router.navigate([
        '/landing'
      ]);

    }

    catch (error: any) {

      console.error(error);

      this.errorMessage =
        this.getErrorMessage(error.code);

    }

    finally {

      this.loading = false;

    }

  }


  getErrorMessage(code: string) {

    switch (code) {

      case 'auth/invalid-credential':

        return 'Invalid email or password.';

      case 'auth/user-not-found':

        return 'No account found with this email.';

      case 'auth/wrong-password':

        return 'Incorrect password.';

      case 'auth/invalid-email':

        return 'Invalid email address.';

      default:

        return 'Login failed. Please try again.';

    }

  }

}