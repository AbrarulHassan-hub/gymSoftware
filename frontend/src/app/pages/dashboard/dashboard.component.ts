import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  router = inject(Router);

  pagetitle = 'Dashboard';
  todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  activeNav: string = 'home';

  navigateTo(page: string) {
    this.activeNav = page;
    const titles: any = {
      home: 'Dashboard',
      package:'Packages',
      members: 'Members',
      payments: 'Payments',
      attendance: 'Attendance',
      reports: 'Reports',
      classes: 'Classes',
      settings: 'Settings',
      expenses: 'Expenses',
    };
    this.pagetitle = titles[page] || 'Dashboard';
    this.router.navigate(['dashboard', page]);
  }
}