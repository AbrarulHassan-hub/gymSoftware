import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass,DatePipe } from '@angular/common';

interface Expense {
  id: number;
  expensesTitle: string;
  category: number;
  date: Date;
  amount: number;
  paymentMethod: string;
  status: number;
}

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [FormsModule, HttpClientModule, NgClass,DatePipe],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent implements OnInit {

  Expenses: Expense = {
    id: 0,
    expensesTitle: '',
    category: 0,
    date: new Date(),
    amount: 0,
    paymentMethod: '',
    status: 0
  };

  selectedTab: number = 1;
  http = inject(HttpClient);
  expenseRecord: Expense[] = [];
  ShowModel: boolean = false;

  ngOnInit(): void {
    this.getExpenses();
  }

  ToggleModel(state: boolean) {
    this.ShowModel = state;
  }

  AddModelClear() {
    this.Expenses = {
      id: 0,
      expensesTitle: '',
      category: 0,
      date: new Date(),
      amount: 0,
      paymentMethod: '',
      status: 0
    };
    this.selectedTab = 1;
    this.ToggleModel(true);
  }

  getExpenses() {
    this.http.get<Expense[]>("https://localhost:7233/api/Expenses").subscribe({
      next: (res) => {
        this.expenseRecord = res;
      }
    });
  }

  SaveRecord() {
    const expenses = {
      ExpensesTitle: this.Expenses.expensesTitle,
      Category: this.Expenses.category,
      Date: this.Expenses.date,
      Amount: this.Expenses.amount,
      PaymentMethod: this.Expenses.paymentMethod,
      Status: this.selectedTab
    };

    this.http.post("https://localhost:7233/api/Expenses", expenses).subscribe({
      next: (res) => {
        alert("Record Added Successfully");
        this.getExpenses();
        this.ToggleModel(false);
      }
    });
  }

  EditExpenses(expenses: Expense) {
    console.log(expenses);
    this.Expenses.id = expenses.id;
    this.Expenses.expensesTitle = expenses.expensesTitle;
    this.Expenses.category = expenses.category;
    this.Expenses.date = this.formatDateForInput(expenses.date);
    this.Expenses.amount = expenses.amount;
    this.Expenses.paymentMethod = expenses.paymentMethod;
    this.selectedTab = expenses.status;
    this.ToggleModel(true);
  }
formatDateForInput(date: any): any {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`; 
}
DeleteExpenses(id: number) {
  this.http.delete(`https://localhost:7233/api/Expenses/${id}`).subscribe({
    next: (res) => {      
      alert("Record Deleted Successfully");
      this.getExpenses();
    }     
  });
}
  UpdateRecord() {
    const expenses = {
      ExpensesTitle: this.Expenses.expensesTitle,
      Category: this.Expenses.category,
      Date: this.Expenses.date,
      Amount: this.Expenses.amount,
      PaymentMethod: this.Expenses.paymentMethod,
      Status: this.selectedTab
    };

    this.http.put('https://localhost:7233/api/Expenses/' + this.Expenses.id, expenses).subscribe({
      next: (res) => {
        alert("Record Updated Successfully");
        this.getExpenses();
        this.ToggleModel(false);
      }
    });
  }

  selectTab(event: Event, activeClass: string, val: number) {
    const allTabs = document.querySelectorAll('.tab-opt');
    allTabs.forEach(t => {
      t.classList.remove('active-paid', 'active-pending', 'active-due');
    });

    const el = event.target as HTMLElement;
    el.classList.add(activeClass);

    this.selectedTab = val;
  }

  // Category Map
  categoryMap: { [key: number]: string } = {
    1: '🏋️ Equipment Purchase',
    2: '🔧 Equipment Repair',
    3: '💡 Electricity Bill',
    4: '💧 Water Bill',
    5: '🌐 Internet & WiFi',
    6: '🧹 Cleaning Supplies',
    7: '🏠 Rent'
  };

  // Status Map
  statusMap: { [key: number]: string } = {
    1: 'Paid',
    2: 'Pending',
    3: 'Due'
  };

  // Status CSS Class Map
  statusClassMap: { [key: number]: string } = {
    1: 'badge-paid',
    2: 'badge-pending',
    3: 'badge-due'
  };
}