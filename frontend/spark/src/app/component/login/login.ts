import {Component, HostBinding, inject, signal} from '@angular/core';
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
import {UserService} from '../../service/user-service';
import {UserResponseEntity} from '../../model/UserResponseEntity';

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

export class Login {
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
  private router: Router = inject(Router);
  private userService: UserService = inject(UserService);

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password: string = control.value.password;
      const confirmedPassword: string = control.value.confirmPassword;

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

  onSubmit(): void {
    if (this.loginForm.valid) {
      if (this.loginForm.value.registerChecked) {
        this.userService.createUser(this.loginForm.value.username!, this.loginForm.value.password!).subscribe({
          next: (data: UserResponseEntity): void => {
            this.userService.loginUser(data.username, this.loginForm.value.password!).subscribe({
              next: (data2: {accessToken: string}): void => {
                this.setInStorage(data2, {username: data.username});
                this.redirect("home");
              }
            });
          }
        });
      } else {this.userService.loginUser(this.loginForm.value.username!, this.loginForm.value.password!).subscribe({
          next: (data: {accessToken: string}): void => {
            this.setInStorage(data, {username: this.loginForm.value.username!});
            this.redirect("home");
          }
        });
      }
    }
  }

  redirect(url: string): void {
    this.router.navigateByUrl(`/${url}`).then();
  }

  setInStorage(...args: Record<string, string>[]): void {
    args.forEach((element: any): void => {
      const key: string = Object.keys(element)[0];
      sessionStorage.setItem(key, element[key]);
    });
  }
}

