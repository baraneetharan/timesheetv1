import { Observable } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    `.angular-logo {
        margin: 0 4px 3px 0;
        height: 35px;
        vertical-align: middle;
    }
    .fill-remaining-space {
      flex: 1 1 auto;
    }
    `,
  ],
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  showSideNav = false;
  constructor(private authService: AuthService, private router: Router) {
    router.events.subscribe((event) => {
      // console.log(this.router.url);

      if (this.router.url === '/login' || this.router.url === '/logout') {
        this.showSideNav = false;
      } else {
        this.showSideNav = true;
      }
    });
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    // console.log(this.router.url);
  }

  onLogout() {
    this.authService.logout();
    // window.localStorage.removeItem("wsuser");
  }
}
