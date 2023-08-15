import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule, RemoteModule } from './features';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
import { CoreModule } from './core/core.module';
import { UserProfileService } from './core/services/user.profile';
import { fetchUserProfile } from './core/facory/init-user.factory';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AuthModule } from './auth/auth.module';
import { authConfigFactory } from './core/facory/auth-config.factory';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './layout/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SocialLoginModule,
    CoreModule,
    AuthModule.forRoot(authConfigFactory),
    RemoteModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
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
