declare var google:any;
import { SocialAuthService, SocialLoginModule, SocialUser } from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,SocialLoginModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  user!: SocialUser;
  loggedIn!: boolean;

  constructor() { }

  authService=inject(SocialAuthService)
  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

}
