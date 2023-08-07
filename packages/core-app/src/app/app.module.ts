import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './features';
import { HeaderComponent } from './layouts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
  VKLoginProvider,
} from '@abacritt/angularx-social-login';
import { RemoteComponent } from './remote-component';
import { CoreModule } from './core/core.module';

const google_client_id =
  '468339183665-90enpnkr09043fvb1te8i6d36k1nml59.apps.googleusercontent.com';

const vk_client_id = '51706699';
@NgModule({
  declarations: [AppComponent, HeaderComponent, RemoteComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SocialLoginModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
