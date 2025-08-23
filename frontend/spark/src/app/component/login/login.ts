import {Component, HostBinding, inject, OnInit, signal} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule, ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})

export class Login implements OnInit {
  @HostBinding('class.login') class: boolean = true;
  hide = signal(true);
  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.minLength(3)]),
    password: new FormControl("", [Validators.required]),
    confirmPassword: new FormControl(""),
    registerChecked: new FormControl(false)
  }, {
    validators: this.passwordMatchValidator()
  });
  private router = inject(Router);

  ngOnInit(): void {
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value.password;
      const confirmedPassword = control.value.confirmPassword;

      if (password === undefined || confirmedPassword === undefined || !control.value.registerChecked) {
        return null;
      }
      return password === confirmedPassword ? null : { passwordMismatch: true };
    };
  }

  onClick(event: MouseEvent): void {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  // send pw cha3 hashed
  onSubmit(): void {
    if (this.loginForm.valid) {
      if (this.loginForm.value.registerChecked) {
        console.log("try register:", this.loginForm.value);
      } else {
        console.log("try login:", this.loginForm.value);
      }
      this.router.navigateByUrl("").then();
    }
  }
}

