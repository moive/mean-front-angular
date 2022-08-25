import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  myForm: FormGroup = this.fb.group({
    email: ['test@example.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {}

  saveLoginForm() {
    console.log(this.myForm.value);
    this.router.navigateByUrl('/task');
  }

  isDirty(val: string): boolean {
    return this.myForm.get(val)?.value.length > 0;
  }
}
