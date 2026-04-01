import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.css'
})
export class MembershipComponent {
    //Model Show 
  showModal:boolean=false;
  toggleModal(state:boolean)
  {
    this.showModal=state;
  }
  membership = [
    { initials: 'B', code: "M-P1", name: "Basic", duration: "1 Month", amount: 1000 },
    { initials: 'S', code: "M-P2", name: "Standard", duration: "1 Month", amount: 2000 },
    { initials: 'P', code: "M-P3", name: "Premium", duration: "1 Month", amount: 3000 },
    { initials: 'B', code: "Q-P1", name: "Basic", duration: "3 Months", amount: 2700},
    { initials: 'S', code: "Q-P2", name: "Standard", duration: "3 Months", amount: 5500 },
    { initials: 'B', code: "Y-P1", name: "Basic", duration: "12 Months", amount: 10000},
    { initials: 'P', code: "Y-P2", name: "Premium", duration: "12 Months", amount: 18000}
    
  ];
}
