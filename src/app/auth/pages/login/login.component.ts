import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  myForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  saveLoginForm() {
    console.log(this.myForm.value);
    this.authService.login(this.myForm.value).subscribe((res) => {
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
