import { Component, inject, OnInit } from '@angular/core';
import { CommonModule,NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
declare var Chart: any;
interface Expense {
  id: number;
  expensesTitle: string;
  category: number;
  date: any;
  amount: number;
  paymentMethod: string;
  status: number;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,NgClass, FormsModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {}
  counts = { countMembership: 0, countMembers: 0, countPayments: 0,countAttendence:0 };
  http = inject(HttpClient);
  expenseRecord: Expense[] = [];
  filteredRecords: Expense[] = [];
   selectedMonth: string = '';
  selectedCategory: number = 0;
  selectedStatus: number = 0;

  totalExpenses: number = 0;
  totalPaid: number = 0;
  totalPending: number = 0;
  totalDue: number = 0;

  catChart: any;
  statusChart: any;
  ngOnInit(): void {
    this.countMembership();
    this.countMembers();
    this.countPayments();
    this.countPresentTodayAttendence();
    this.getExpenses();
  }

  countMembership() {
    this.http.get<number>("https://localhost:7233/api/membership/count").subscribe({
      next: (res) => {
        this.counts.countMembership = res;
      }
    });
  }
  countMembers()
  {
    this.http.get<number>("https://localhost:7233/api/members/Countmember").subscribe({
      next:(res)=>{
        this.counts.countMembers = res;
        console.log(this.counts.countMembers);
      }
    })
  }
  countPayments()
  {
    this.http.get<number>("https://localhost:7233/api/Payment/CountPayment").subscribe({
      next:(res)=>{
        this.counts.countPayments =res;
      }
    })
  }
  countPresentTodayAttendence()
  {
    this.http.get<number>("https://localhost:7233/api/Attendence/todayattendence").subscribe({
      next:(res)=>{
        this.counts.countAttendence = res;
        console.log("present today attendence:",this.counts.countAttendence);
      }
    })
  }
 NewMemberAdd() {
  this.router.navigate(['/dashboard/members']);
}
categoryMap: { [key: number]: string } = {
    1: 'Equipment Purchase',
    2: 'Equipment Repair',
    3: 'Electricity Bill',
    4: 'Water Bill',
    5: 'Internet & WiFi',
    6: 'Cleaning Supplies',
    7: 'Rent'
  };

  statusMap: { [key: number]: string } = {
    1: 'Paid',
    2: 'Pending',
    3: 'Due'
  };

  statusClassMap: { [key: number]: string } = {
    1: 'badge-paid',
    2: 'badge-pending',
    3: 'badge-due'
  };
  ngAfterViewInit(): void {
    this.loadChartJs().then(() => {
      this.initCharts();
    });
  }
  loadChartJs(): Promise<void> {
    return new Promise((resolve) => {
      if ((window as any).Chart) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js';
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  }

  getExpenses() {
    this.http.get<Expense[]>('https://localhost:7233/api/Expenses').subscribe({
      next: (res) => {
        this.expenseRecord = res;
        this.filteredRecords = res;
        this.calculateTotals(res);
        this.updateCharts();
      }
    });
  }

  applyFilters() {
    let filtered = [...this.expenseRecord];

    if (this.selectedMonth) {
      filtered = filtered.filter(e => {
        const d = new Date(e.date);
        const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        return ym === this.selectedMonth;
      });
    }

    if (this.selectedCategory) {
      filtered = filtered.filter(e => +e.category === +this.selectedCategory);
    }

    if (this.selectedStatus) {
      filtered = filtered.filter(e => +e.status === +this.selectedStatus);
    }

    this.filteredRecords = filtered;
    this.calculateTotals(filtered);
    this.updateCharts();
  }

  calculateTotals(records: Expense[]) {
    this.totalExpenses = records.reduce((s, e) => s + e.amount, 0);
    this.totalPaid = records.filter(e => +e.status === 1).reduce((s, e) => s + e.amount, 0);
    this.totalPending = records.filter(e => +e.status === 2).reduce((s, e) => s + e.amount, 0);
    this.totalDue = records.filter(e => +e.status === 3).reduce((s, e) => s + e.amount, 0);
  }

  initCharts() {
    const catCtx = document.getElementById('catChart') as HTMLCanvasElement;
    const statusCtx = document.getElementById('statusChart') as HTMLCanvasElement;

    if (!catCtx || !statusCtx) return;

    this.catChart = new Chart(catCtx, {
      type: 'bar',
      data: {
        labels: ['Equipment', 'Repair', 'Electricity', 'Water', 'Internet', 'Cleaning', 'Rent'],
        datasets: [{
          data: [0, 0, 0, 0, 0, 0, 0],
          backgroundColor: ['#378ADD', '#EF9F27', '#1D9E75', '#D4537E', '#7F77DD', '#639922', '#E24B4A'],
          borderRadius: 4,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#888' } },
          y: { grid: { color: 'rgba(128,128,128,0.15)' }, ticks: { font: { size: 11 }, color: '#888', callback: (v: any) => 'Rs ' + v } }
        }
      }
    });

    this.statusChart = new Chart(statusCtx, {
      type: 'doughnut',
      data: {
        labels: ['Paid', 'Pending', 'Due'],
        datasets: [{
          data: [0, 0, 0],
          backgroundColor: ['#639922', '#BA7517', '#E24B4A'],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: { legend: { display: false } }
      }
    });

    this.updateCharts();
  }

  updateCharts() {
    if (!this.catChart || !this.statusChart) return;

    const catTotals = [0, 0, 0, 0, 0, 0, 0];
    this.filteredRecords.forEach(e => {
      const idx = +e.category - 1;
      if (idx >= 0 && idx < 7) catTotals[idx] += e.amount;
    });

    this.catChart.data.datasets[0].data = catTotals;
    this.catChart.update();

    this.statusChart.data.datasets[0].data = [
      this.totalPaid,
      this.totalPending,
      this.totalDue
    ];
    this.statusChart.update();
  }

  formatDate(date: any): string {
    if (!date) return 'N/A';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  }

  paidCount(): number {
    return this.filteredRecords.filter(e => +e.status === 1).length;
  }

  pendingCount(): number {
    return this.filteredRecords.filter(e => +e.status === 2).length;
  }

  dueCount(): number {
    return this.filteredRecords.filter(e => +e.status === 3).length;
  }

  // ✅ getter bana diya — har baar fresh value lega
  get stats() {
    return [
      { label: 'Total Members',      value: this.counts.countMembers,    delta: '↑ 12', sub: 'this month',      color: 'yellow', icon: '👥' },
      { label: 'Active Memberships', value: this.counts.countMembership, delta: '↑ 8',  sub: 'vs last week',    color: 'green',  icon: '✅' },
      { label: 'Payments Due',       value: this.counts.countPayments,   delta: '↑ 5',  sub: 'overdue >7 days', color: 'red',    icon: '💳' },
      { label: "Today's Attendance", value: this.counts.countAttendence,  delta: '↑ 11', sub: 'vs yesterday',    color: 'blue',   icon: '🏋'  }
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