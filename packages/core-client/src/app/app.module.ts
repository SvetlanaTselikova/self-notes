import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule, RemoteModule } from './features';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { MessageBus } from '@self-notes/clients-message-bus';
import { subcribeCommands } from './core/facory/subscribe-commands';
import {
  NotificationCommandHandler,
  RouterCommandHandler,
} from './core/command-handlers';
import { BaseCommandHandler } from 'libs/clients-message-bus/src/lib/types';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserProfileService } from './core/services';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
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
  ],
  providers: [
    RouterCommandHandler,
    NotificationCommandHandler,
    {
      provide: MessageBus,
      useFactory: (...commandHandlers: BaseCommandHandler<any>[]) =>
        new MessageBus(commandHandlers),
      deps: [RouterCommandHandler, NotificationCommandHandler],
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
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
