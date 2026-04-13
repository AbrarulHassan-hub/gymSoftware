import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit, AfterViewInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  selector: 'app-report',
  standalone: true,
  imports: [HttpClientModule, NgClass, FormsModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit, AfterViewInit {

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

  ngOnInit(): void {
    this.getExpenses();
  }

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
}