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
import { AuthModule } from './auth/auth.module';
import { authConfigFactory } from './core/facory/auth-config.factory';

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
    AuthModule.forRoot(authConfigFactory),
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
