import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MemberrComponent } from './pages/memberr/memberr.component';
import { HomeComponent } from './pages/home/home.component';
import { MembershipComponent } from './pages/membership/membership.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { SettingComponent } from './pages/setting/setting.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'members',
                component: MemberrComponent
            },
            {
                path: 'membership',
                component: MembershipComponent
            },
            {
                path: 'payments',
                component: PaymentComponent
            },
            {
                path: 'attendance',
                component: AttendanceComponent
            },
            {
                path: 'expenses',
                component: ExpensesComponent
            },
            {
                path: 'settings',
                component: SettingComponent
            }
        ]
    }
];