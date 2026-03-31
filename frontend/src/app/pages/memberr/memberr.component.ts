import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-memberr',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memberr.component.html',
  styleUrls: ['./memberr.component.css']
})
export class MemberrComponent {
  //Model Show 
  showModal:boolean=false;
toggleModal(state:boolean)
{
  this.showModal=state;
}
members = [
  { initials: 'SA', name: 'Sara Ahmed',  id: '1001011330', plan: 'Annual, Monthly Plan', status: 'Active', statusClass: 'active' },
  { initials: 'MR', name: 'M. Raza',     id: '1001011331', plan: 'Annual Plan',          status: 'Active', statusClass: 'active' },
  { initials: 'FQ', name: 'Fatima Qazi', id: '1001011332', plan: 'Quarterly Plan',        status: 'Due',    statusClass: 'due' },
  { initials: 'AK', name: 'Ali Karim',   id: '1001011333', plan: 'Monthly Plan',          status: 'Active', statusClass: 'active' },
  { initials: 'NB', name: 'Nadia Baig',  id: '1001011334', plan: 'Monthly Plan',          status: 'New',    statusClass: 'new' },
];
}