import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttepmt: boolean;
  msg: string = '';
  showErrorMessage = false;
  currentError;
  isLoader = false;
  userData: any;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    localStorage.removeItem('wsuser');
    localStorage.removeItem('wsuserRole');
    localStorage.removeItem('wserr');
    this.showErrorMessage = false;
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttepmt)
    );
  }
  getUrl() {
    return "url('http://chitrahandicraft.com/wp-content/uploads/2019/02/login-page-background-images-hd-10.jpg')";
  }
  onSubmit() {
    this.isLoader = true;
    if (this.form.valid) {
      this.isLoader = true;
      let useritem = {
        id: 0,
        name: this.form.value.userName,
        password: this.form.value.password,
        role: '',
        userid: '',
        email: '',
      };
      this.userService.validate(useritem).subscribe((data) => {
        this.userData = data;

        if (this.userData.length != 0) {
          localStorage.setItem('wsuser', this.userData[0].name);
          localStorage.setItem('wsuserRole', this.userData[0].role);
          this.loggedIn.next(true);
          this.router.navigate(['/dashboard']);
        } else {
          this.loggedIn.next(false);
          this.showErrorMessage = true;
          this.msg = 'Invalid username and password Please try again';
        }
        this.isLoader = false;
      });
    }
    this.formSubmitAttepmt = true;
  }
}
