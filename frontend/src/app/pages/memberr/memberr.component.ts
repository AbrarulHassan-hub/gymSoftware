import { Component,inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpClientModule } from '@angular/common/http';
interface Members {
  Id: number;
  Code:string;
  Name: string;
  PlanId: number;
  PhoneNo: string;
  StartDate:Date;
  Status:boolean
}
interface Membership {
  id: number;
  code:string;
  name: string;
  duration: string;
  amount: number;
}
@Component({
  selector: 'app-memberr',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './memberr.component.html',
  styleUrls: ['./memberr.component.css']
})
export class MemberrComponent implements OnInit{
  //getrecord of members
  ngOnInit(): void {
    this.getMembers();
    this.getMembershipPlans() 
  }
  memberForm: Members = {
  Id: 0,
  Code: '',
  Name: '',
  PlanId: 0,
  PhoneNo: '',
  StartDate: new Date(),
  Status: false
};
  memberdata:Members[]=[];
  membershipPlans: Membership[] = [];
  http = inject(HttpClient);
  getMembershipPlans() 
  {
      this.http.get<Membership[]>("https://localhost:7233/api/membership").subscribe({next:(res)=>{
          this.membershipPlans=res;
          console.log(this.membershipPlans);
        },error:(err)=>{
          console.error("Error: ",err);
        }})
  }
  getMembers()
  {
    this.http.get<Members[]>("https://localhost:7233/api/members").subscribe({next:(res)=>{
      this.memberdata = res;
    }})
  }
  //End Get Record Members

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