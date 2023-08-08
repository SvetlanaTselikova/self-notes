import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './features';
import { HeaderComponent } from './layouts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { RemoteComponent } from './remote-component';
import { CoreModule } from './core/core.module';
import { UserProfileService } from './core/services/user.profile';
import { fetchUserProfile } from './core/facory/init-user.factory';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

const google_client_id =
  '468339183665-90enpnkr09043fvb1te8i6d36k1nml59.apps.googleusercontent.com';

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
  providers: [
    UserProfileService,
    {
      provide: APP_INITIALIZER,
      useFactory: fetchUserProfile,
      multi: true,
      deps: [UserProfileService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
