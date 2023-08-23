import {
  APP_INITIALIZER,
  ErrorHandler,
  NgModule,
  isDevMode,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule, RemoteModule } from './features';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { GOOGLE_CLIENT_ID, GOOGLE_SCOPES } from '@self-notes/utils';
import {
  fetchUserProfile,
  authConfigFactory,
  subcribeCommands,
  subcribeQueries,
} from './core/factory';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AuthModule } from './auth/auth.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent, PageNotFoundComponent } from './layout';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MessageBus } from '@self-notes/clients-message-bus';
import {
  NotificationCommandHandler,
  RouterCommandHandler,
} from './core/command-handlers';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GlobalErrorHandlerService, UserProfileService } from './core/services';
import {
  ProfileQueryHandler,
  RefreshTokenHandler,
} from './core/query-handlers';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SocialLoginModule } from '@abacritt/angularx-social-login';


@NgModule({
  declarations: [AppComponent, HeaderComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule.forRoot(authConfigFactory),
    RemoteModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatSnackBarModule,
    SocialLoginModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    RouterCommandHandler,
    NotificationCommandHandler,
    ProfileQueryHandler,
    RefreshTokenHandler,
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    {
      provide: MessageBus,
      useFactory: (
        routerCommandHandler,
        notificationCommandHandler,
        profileQueryHandler,
        refreshTokenHandler
      ) =>
        new MessageBus(
          [routerCommandHandler, notificationCommandHandler],
          [profileQueryHandler, refreshTokenHandler]
        ),
      deps: [
        RouterCommandHandler,
        NotificationCommandHandler,
        ProfileQueryHandler,
        RefreshTokenHandler,
      ],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: fetchUserProfile,
      multi: true,
      deps: [UserProfileService],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: subcribeCommands,
      multi: true,
      deps: [MessageBus],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: subcribeQueries,
      multi: true,
      deps: [MessageBus],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(GOOGLE_CLIENT_ID, {
              scopes: GOOGLE_SCOPES,
              oneTapEnabled: false
            }),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
