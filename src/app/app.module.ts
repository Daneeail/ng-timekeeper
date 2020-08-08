import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MainComponent } from './pages/main/main.component';
import { TimeCardComponent } from './pages/time-card/time-card.component';
import { DayTimeCardComponent } from './components/day-time-card/day-time-card.component';
import { ElapsedTimeDisplayComponent } from './components/elapsed-time-display/elapsed-time-display.component';
import { LoginCardComponent } from './components/login-card/login-card.component';
import { MonthTimeCardComponent } from './components/month-time-card/month-time-card.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FooterComponent } from './components/footer/footer.component';
import { ScheduleCardComponent } from './components/schedule-card/schedule-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,

    // Pages
    LoginComponent,
    NotFoundComponent,
    MainComponent,
    TimeCardComponent,

    // Components
    DayTimeCardComponent,
    ElapsedTimeDisplayComponent,
    LoginCardComponent,
    MonthTimeCardComponent,
    SidenavComponent,
    ToolbarComponent,
    FooterComponent,
    ScheduleCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
