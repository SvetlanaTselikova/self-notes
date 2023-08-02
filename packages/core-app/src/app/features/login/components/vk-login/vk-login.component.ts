import { Component, OnInit } from '@angular/core';
import {
  SocialAuthService,
  SocialUser,
  VKLoginProvider,
} from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-vk-login',
  templateUrl: './vk-login.component.html',
  styleUrls: ['./vk-login.component.sass'],
})
export class VkLoginComponent {
  socialUser!: SocialUser;
  isLoggedin?: boolean;
  constructor(private socialAuthService: SocialAuthService) {}

  loginWithVk(): void {
    this.socialAuthService.signIn(VKLoginProvider.PROVIDER_ID);
  }
}
