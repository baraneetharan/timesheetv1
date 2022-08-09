import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HelloComponent } from './hello.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { TaskComponent } from './task/task.component';
import { LogComponent } from './log/log.component';
import { ReportComponent } from './report/report.component';
import { AuthGuard } from './auth/auth.guard';
import { UnAuthorisedComponent } from './un-authorised/un-authorised.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserreportComponent } from './userreport/userreport.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'task', component: TaskComponent },
  { path: 'log', component: LogComponent },
  { path: 'report', component: ReportComponent },
  { path: 'userreport', component: UserreportComponent },
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  { path: 'accessdenied', component: UnAuthorisedComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
