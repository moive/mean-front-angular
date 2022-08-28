import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup = this.fb.group({
    username: ['test 7', [Validators.required, Validators.minLength(3)]],
    email: ['test7@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  saveRegisterForm() {
    const { password, confirmPassword } = this.myForm.value;
    if (password != confirmPassword) {
      Swal.fire({
        title: 'Error',
        icon: 'error',
        text: 'Thes passwords do not match. Please try again',
      });
      return;
    }

    this.authService.register(this.myForm.value).subscribe((res) => {
      console.log(res);
      if (res == true) {
        localStorage.setItem('user', JSON.stringify(this.authService.user));
        this.router.navigateByUrl('/task');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops! Something went wrong',
          text: res,
        });
      }
    });
  }

  isDirty(val: string): boolean {
    return this.myForm.get(val)?.value.length > 0;
  }
}
