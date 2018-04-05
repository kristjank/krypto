import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { MomentModule } from 'angular2-moment';
import { FlotModule } from 'ng2modules-flot';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StatusBarComponent } from './components/status-bar/status-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { YourPaymentsComponent } from './components/your-payments/your-payments.component';
import { PayoutHistoryComponent } from './components/payout-history/payout-history.component';
import { PayoutTransactionsComponent } from './components/payout-transactions/payout-transactions.component';
import { DelegateInfoComponent } from './components/delegate-info/delegate-info.component';
import { PendingPaymentsComponent } from './components/pending-payments/pending-payments.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { KryptoService } from './services/krypto.service';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'your-payments', component: YourPaymentsComponent },
  { path: 'payout-history', component: PayoutHistoryComponent },
  { path: 'delegate-info', component: DelegateInfoComponent },
  { path: 'pending-payments', component: PendingPaymentsComponent },
  { path: 'transactions', component: PayoutTransactionsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StatusBarComponent,
    FooterComponent,
    MainComponent,
    YourPaymentsComponent,
    PayoutHistoryComponent,
    DelegateInfoComponent,
    PendingPaymentsComponent,
    LoginComponent,
    RegisterComponent,
    PayoutTransactionsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpModule,
    MomentModule,
    FlotModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [KryptoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
