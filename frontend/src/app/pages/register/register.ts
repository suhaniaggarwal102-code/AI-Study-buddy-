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
  selector: 'app-register',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {

  loading = false;

  errorMessage = '';

  registerForm;


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.registerForm =
      this.fb.group({

        name: [
          '',
          Validators.required
        ],

        email: [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],

        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6)
          ]
        ],

        course: ['']

      });

  }


  async onSubmit() {

    if (this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();

      return;

    }

    this.loading = true;

    this.errorMessage = '';

    try {

      const {
        name,
        email,
        password,
        course
      } = this.registerForm.value;

      await this.authService.register(
        name!,
        email!,
        password!,
        course || ''
      );

      this.router.navigate([
        '/dashboard'
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

      case 'auth/email-already-in-use':

        return 'This email is already registered.';

      case 'auth/invalid-email':

        return 'Invalid email address.';

      case 'auth/weak-password':

        return 'Password must be at least 6 characters.';

      default:

        return 'Registration failed. Please try again.';

    }

  }

}