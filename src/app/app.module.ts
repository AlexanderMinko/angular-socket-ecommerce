import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { FooterComponent } from './footer/footer.component';
import { ProductListComponent } from './main/product-list/product-list.component';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { LoginComponent } from './header/login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { socialTokenInterceptor } from './iterceptors/social-token.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './main/product-details/product-details.component';
import { CartStatusComponent } from './header/cart-status/cart-status.component';
import { CartDetailsComponent } from './main/cart-details/cart-details.component';
import { AccountDetailsComponent } from './main/account-details/account-details.component';
import { OrderDetailsComponent } from './main/order-details/order-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VerificationComponent } from './main/verification/verification.component';
import { AdminPanelComponent } from './main/admin-panel/admin-panel.component';
import { NotFoundComponent } from './main/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AsideComponent,
    FooterComponent,
    ProductListComponent,
    LoginComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    AccountDetailsComponent,
    OrderDetailsComponent,
    VerificationComponent,
    AdminPanelComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SocialLoginModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '45265684038-74683m2b15bgbs00cbhb1g836girvc6l.apps.googleusercontent.com'),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '734975127240832'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    socialTokenInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


