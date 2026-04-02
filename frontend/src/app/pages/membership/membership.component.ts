import { HttpClient,HttpClientModule  } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { error } from 'console';
// This interface defines the structure of Membership data coming from backend API
interface Membership {
  id: number;
  code:string;
  name: string;
  duration: string;
  amount: number;
}
@Component({
  selector: 'app-membership',
  standalone: true,
  // Import HttpClientModule to enable API calls in the application
  imports: [FormsModule, HttpClientModule],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.css'
})
export class MembershipComponent implements OnInit {
  membershipObject:Membership={
    id: 0,
    code:'',
    name: '',
    duration:'',
    amount: 0
  }
  //For Eidt
  isEditMode:boolean=false;
// Stores membership data fetched from backend API
  memberships:Membership[]=[];
  http = inject(HttpClient);
   // Lifecycle hook: called once component is initialized
  ngOnInit(): void {
    this.getMembership();
  }
  //Get all data from memebership
  getMembership()
  {
    this.http.get<Membership[]>("https://localhost:7233/api/membership").subscribe({next:(res)=>{
      this.memberships=res;
      console.log(this.memberships);
    },error:(err)=>{
      console.error("Error: ",err);
    }})
  }
  addMemberShip()
  {
    if(this.membershipObject.id == 0)
    {
      this.http.post("https://localhost:7233/api/membership",this.membershipObject).subscribe((res:any)=>{
      alert("Registeration Membership Successfully")
      this.getMembership();
      this.toggleModal(false);
      },error=>{
      if(error.status == 400)
      {
        alert("Invalid Object")
      }
      else if(error.status == 500)
      {
        alert(error.error);
      }
    })
    }
  }
  //Update Record
  UpdateRecord() {
  const payload = {
    id: this.membershipObject.id,
    Code: this.membershipObject.code,
    name: this.membershipObject.name,
    duration: this.membershipObject.duration,
    amount: this.membershipObject.amount
  };
  this.http.put(`https://localhost:7233/api/membership/${payload.id}`, payload)
    .subscribe({
      next: (res: any) => {
        alert("Updated Membership Successfully");
        this.getMembership();
        this.toggleModal(false);
      },
      error: (error) => {
        if (error.status == 400) {
          alert("Invalid Object");
        } else if (error.status == 500) {
          alert(error.error);
        }
      }
    });
}
  //Edit Mode
  onEditMod(membership: Membership) {
  this.membershipObject = { ...membership };
  console.log(this.membershipObject)
  this.toggleModal(true);   
}
OnDelete(id:number)
{
  this.http.delete(`https://localhost:7233/api/membership/${id}`).subscribe({next:(res:any)=>{
  alert("Delete Record Successfully");
  this.getMembership();
  }})
}
  //Reset Form
resetForm() {
  this.membershipObject = {
    id: 0,
    code: '',
    name: '',
    duration: '',
    amount: 0
  };
  this.toggleModal(true);   
}

    //Model Show 
  showModal:boolean=false;
  toggleModal(state:boolean)
  {
    this.showModal=state;
  }
  // membership = [
  //   { initials: 'B', code: "M-P1", name: "Basic", duration: "1 Month", amount: 1000 },
  //   { initials: 'S', code: "M-P2", name: "Standard", duration: "1 Month", amount: 2000 },
  //   { initials: 'P', code: "M-P3", name: "Premium", duration: "1 Month", amount: 3000 },
  //   { initials: 'B', code: "Q-P1", name: "Basic", duration: "3 Months", amount: 2700},
  //   { initials: 'S', code: "Q-P2", name: "Standard", duration: "3 Months", amount: 5500 },
  //   { initials: 'B', code: "Y-P1", name: "Basic", duration: "12 Months", amount: 10000},
  //   { initials: 'P', code: "Y-P2", name: "Premium", duration: "12 Months", amount: 18000}
    
  // ];
}
