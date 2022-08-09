import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../user/user.service';
import { Loginuser } from './loginuser';
import { User } from './user';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class AuthService {
  userData: any;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private router: Router, private userService: UserService) {}

  login(user: Loginuser) {
    // call userService here

    let uname = user.userName;
    let pass = user.password;

    var useritem = {
      id: 0,
      name: uname,
      password: pass,
      role: '',
      userid: '',
      email: '',
    };
    console.log(useritem);
    this.userService.getAllUsersService().subscribe((data: any[]) => {
      this.userData = data.filter(
        (x) => x.name === useritem.name && x.password === useritem.password
      );

      console.log('Auth service, this.userData ' + this.userData);
      if (this.userData.length != 0) {
        // console.log(this.userData[0].name);
        localStorage.setItem('wsuser', this.userData[0].name);
        localStorage.setItem('wsuserRole', this.userData[0].role);
        // this.getlocalstoarage();
        // this.loginShow = this.authService.isLoggedIn();
        // this.router.navigate(['dashboard']);
        this.loggedIn.next(true);
        this.router.navigate(['/']);
      } else {
        localStorage.setItem('wserr', 'InvalidUser');
        // localStorage.setItem('wsuser', 'InvalidUser');
        // localStorage.removeItem('wsuser');
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
      }
    });
    // if (user.userName !== '' && user.password !== '') {
    //   this.loggedIn.next(true);
    //   this.router.navigate(['/home']);
    // }
  }

  logout() {
    // localStorage.setItem('wsuser', 'NA');
    localStorage.removeItem('wsuser');
    localStorage.removeItem('wsuserRole');
    // localStorage.clear();

    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
