import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NewMemberComponent } from './new-member/new-member.component';
import { AuthGuard } from './auth/auth.guard';
import { MemberDetailsComponent } from './member-details/member-details.component';

export const rootRouterConfig: Routes = [
    { path: '', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'new-member', component: NewMemberComponent, canActivate: [AuthGuard] },
    { path: 'detail/:id', component: MemberDetailsComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent }
  ];