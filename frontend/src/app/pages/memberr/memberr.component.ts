import { Component,inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient,HttpClientModule } from '@angular/common/http';
interface Members {
  id: number;
  code:number;
  name: string;
  planId: number;
  phoneNo: string;
  startDate:Date;
  status:boolean
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
  id: 0,
  code: 0,
  name: '',
  planId: 0,
  phoneNo: '',
  startDate: new Date(),
  status: false
};
  memberdata:Members[]=[];
  membershipPlans: Membership[] = [];
  http = inject(HttpClient);
  getMembershipPlans() 
  {
      this.http.get<Membership[]>("https://localhost:7233/api/membership").subscribe({next:(res)=>{
          this.membershipPlans=res;
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
  //Get plan name
  getPlanName(planId:number)
  {
    var plan = this.membershipPlans.find(p=>p.id==planId);
    return plan ? plan.name : "Unknown Plan";
  }
  //Model Show 
showModal:boolean=false;
toggleModal(state:boolean)
{
  this.showModal=state;
}
saveMember()
{
    const payload = {
    Code: Number(this.memberForm.code),
    Name: String(this.memberForm.name),
    PlanId: Number(this.memberForm.planId),
    PhoneNO: String(this.memberForm.phoneNo),
    StartDate: new Date(this.memberForm.startDate),
    Status: Boolean(this.memberForm.status)
  };
  console.log(this.memberForm);
  this.http.post("https://localhost:7233/api/members",payload).subscribe((res:any)=>{
    alert("Member Added Successfully");
    this.getMembers();
    this.toggleModal(false);
  })
}
deleteMember(id:number)
{
  this.http.delete(`https://localhost:7233/api/members/${id}`).subscribe((res:any)=>{
  alert("Member Deleted Successfully");
  this.getMembers();
  })
}
editmember(member: Members)
{
  this.memberForm.id = member.id;
  this.memberForm.code = member.code;
  this.memberForm.name = member.name;
  this.memberForm.planId = member.planId;
  this.memberForm.phoneNo = member.phoneNo;
   //  Date ko yyyy-MM-dd format mein convert karo
  const d = new Date(member.startDate);
  this.memberForm.startDate = d.toISOString().split('T')[0] as any;
  this.memberForm.status = member.status;
  this.toggleModal(true);
}
updateMember()
{
    const payload = {
    Id: Number(this.memberForm.id),
    Code: Number(this.memberForm.code),
    Name: String(this.memberForm.name),
    PlanId: Number(this.memberForm.planId),
    PhoneNO: String(this.memberForm.phoneNo),
    StartDate: new Date(this.memberForm.startDate),
    Status: Boolean(this.memberForm.status)
  };
  this.http.put(`https://localhost:7233/api/members/${payload.Id}`,payload).subscribe(((res:any)=>{
    alert("Member updated Successfully");
    this.getMembers();
    this.toggleModal(false);
  }))
}
toggleModalAdd()
{
  this.memberForm = {
  id: 0,
  code: 0,
  name: '',
  planId: 0,
  phoneNo: '',
  startDate: new Date(),
  status: false
  }
  this.toggleModal(true);
}




// members = [
//   { initials: 'SA', name: 'Sara Ahmed',  id: '1001011330', plan: 'Annual, Monthly Plan', status: 'Active', statusClass: 'active' },
//   { initials: 'MR', name: 'M. Raza',     id: '1001011331', plan: 'Annual Plan',          status: 'Active', statusClass: 'active' },
//   { initials: 'FQ', name: 'Fatima Qazi', id: '1001011332', plan: 'Quarterly Plan',        status: 'Due',    statusClass: 'due' },
//   { initials: 'AK', name: 'Ali Karim',   id: '1001011333', plan: 'Monthly Plan',          status: 'Active', statusClass: 'active' },
//   { initials: 'NB', name: 'Nadia Baig',  id: '1001011334', plan: 'Monthly Plan',          status: 'New',    statusClass: 'new' },
// ];
}