import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MainComponent } from './pages/main/main.component';
import { TimeKeeperComponent } from './pages/time-keeper/time-keeper.component';
import { DayTimeCardComponent } from './components/day-time-card/day-time-card.component';
import { ElapsedTimeDisplayComponent } from './components/elapsed-time-display/elapsed-time-display.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { MonthTimeCardComponent } from './components/month-time-card/month-time-card.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    MainComponent,
    TimeKeeperComponent,
    DayTimeCardComponent,
    ElapsedTimeDisplayComponent,
    LoginCardComponent,
    MonthTimeCardComponent,
    SidenavComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
