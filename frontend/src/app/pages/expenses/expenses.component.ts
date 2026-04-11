import { Component } from '@angular/core';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent {
  ShowModel:boolean = false;
 ToggleModel(state:boolean)
 {
  this.ShowModel = state;
 }
 AddModelClear()
 {
  this.ToggleModel(true); 
 }
 selectTab(event: Event, activeClass: string) {
  const allTabs = document.querySelectorAll('.tab-opt');
  allTabs.forEach(t => t.className = 'tab-opt');

  const el = event.target as HTMLElement;
  el.classList.add(activeClass);

  const input = document.getElementById('paymentMethodVal') as HTMLInputElement;
  if (input) input.value = el.dataset['val'] || '';
}
}
