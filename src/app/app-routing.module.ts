import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/pages/login/login.component';
import { NotFoundComponent } from 'src/app/pages/not-found/not-found.component';
import { MainComponent } from 'src/app/pages/main/main.component';
import { TimeKeeperComponent } from 'src/app/pages/time-keeper/time-keeper.component';
import { DayTimeCardComponent } from 'src/app/components/day-time-card/day-time-card.component';
import { WeekTimeCardComponent } from 'src/app/components/week-time-card/week-time-card.component';
import { MonthTimeCardComponent } from 'src/app/components/month-time-card/month-time-card.component';

const routes: Routes = [{
  path: '',
  component: LoginComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: '',
  component: MainComponent,
  children: [{
      path: 'time-keeper',
      component: TimeKeeperComponent,
      children: [{
          path: '',
          component: DayTimeCardComponent
        },
        {
          path: 'day',
          component: DayTimeCardComponent
        },
        {
          path: 'week',
          component: WeekTimeCardComponent
        },
        {
          path: 'month',
          component: MonthTimeCardComponent
        }
      ]
    },
  ]
},
{
  path: '**',
  component: NotFoundComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
