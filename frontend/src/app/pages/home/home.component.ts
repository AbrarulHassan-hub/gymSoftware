import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  counts = { countMembership: 0 };

  http = inject(HttpClient);

  ngOnInit(): void {
    this.countMembership();
  }

  countMembership() {
    this.http.get<number>("https://localhost:7233/api/membership/count").subscribe({
      next: (res) => {
        this.counts.countMembership = res;
        console.log(this.counts.countMembership);
      }
    });
  }

  // ✅ getter bana diya — har baar fresh value lega
  get stats() {
    return [
      { label: 'Total Members',      value: 348,                         delta: '↑ 12', sub: 'this month',      color: 'yellow', icon: '👥' },
      { label: 'Active Memberships', value: this.counts.countMembership, delta: '↑ 8',  sub: 'vs last week',    color: 'green',  icon: '✅' },
      { label: 'Payments Due',       value: 24,                          delta: '↑ 5',  sub: 'overdue >7 days', color: 'red',    icon: '💳' },
      { label: "Today's Attendance", value: 67,                          delta: '↑ 11', sub: 'vs yesterday',    color: 'blue',   icon: '🏋'  }
    ];
  }

  recentMembers = [
    { name: 'Sara Ahmed',  meta: 'Joined today · Monthly Plan',        badge: 'New',    badgeClass: 'new',    initials: 'SA', color: 'rgba(240,192,64,0.15)',  textColor: '#f0c040' },
    { name: 'M. Raza',     meta: 'Annual Plan · Expires Jun 2026',     badge: 'Active', badgeClass: 'active', initials: 'MR', color: 'rgba(77,159,255,0.15)',  textColor: '#4d9fff' },
    { name: 'Fatima Qazi', meta: 'Quarterly · Payment overdue',        badge: 'Due',    badgeClass: 'due',    initials: 'FQ', color: 'rgba(224,90,43,0.15)',   textColor: '#e05a2b' },
    { name: 'Ali Karim',   meta: 'Monthly Plan · Auto-renew on',       badge: 'Active', badgeClass: 'active', initials: 'AK', color: 'rgba(62,207,142,0.15)',  textColor: '#3ecf8e' },
    { name: 'Nadia Baig',  meta: 'Joined yesterday · Monthly Plan',    badge: 'New',    badgeClass: 'new',    initials: 'NB', color: 'rgba(240,192,64,0.12)',  textColor: '#f0c040' }
  ];

  attendanceBars = [
    { day: 'Mon', height: 52, isToday: false },
    { day: 'Tue', height: 70, isToday: false },
    { day: 'Wed', height: 44, isToday: false },
    { day: 'Thu', height: 85, isToday: false },
    { day: 'Fri', height: 60, isToday: false },
    { day: 'Sat', height: 38, isToday: false },
    { day: 'Sun', height: 67, isToday: true  }
  ];
}