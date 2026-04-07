import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Component,inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Console } from 'console';

interface Members {
  id: number;
  code:number;
  name: string;
  planId: number;
  phoneNo: string;
  startDate:Date;
  status:boolean
}
interface Payment{
  id:number;
  memberId:number;
  paymentType:string;
  amount:number;
  paymentStatus:string;
}
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule,HttpClientModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{
  paymentform:Payment={
    id:0,
    memberId:0,
    paymentType:'',
    amount:0,
    paymentStatus:''
  }
  ngOnInit(): void {
    this.getmemberdata();
    this.getpaymentdata();
  }
  memberRecord:Members[]=[];
  paymentRecord:Payment[]=[];
  http = inject(HttpClient);
  getmemberdata()
  {
    this.http.get<Members[]>("https://localhost:7233/api/members").subscribe({next:(res)=>{
      this.memberRecord=res;
    }});
  }

  getpaymentdata()
  {
    this.http.get<Payment[]>("https://localhost:7233/api/Payment").subscribe({next:(res)=>{
      this.paymentRecord =res;
    }})
  }
  AddRecord()
  {
    const cPaymentForm = {
      MemberId:this.paymentform.memberId,
      PaymentType:this.paymentform.paymentType,
      Amount:this.paymentform.amount,
      PaymentStatus:this.paymentform.paymentStatus  
  }
  this.http.post("https://localhost:7233/api/Payment",cPaymentForm).subscribe({next:(res)=>{
    this.getpaymentdata();
    this.ToggleModel(false);
  }});
}
  ToggleModelAdd()
  {
    this.paymentform=
    {
      id:0,
      memberId:0,
      paymentType:'',
      amount:0,
      paymentStatus:''  
    }
    this.ToggleModel(true);
  }
  getMemberName(paymentId:number)
  {
    const paymentName = this.memberRecord.find(m=>m.id == paymentId);
    return paymentName? paymentName.name : "Unknown Member";
  }
EditPayment(payment: Payment) {
  this.paymentform.id = payment.id; // ✅ also save id for update call
  this.paymentform.memberId = payment.memberId;
  this.paymentform.paymentType = payment.paymentType.charAt(0).toUpperCase() + payment.paymentType.slice(1).toLowerCase();
  this.paymentform.amount = payment.amount;
  this.paymentform.paymentStatus = payment.paymentStatus.charAt(0).toUpperCase() + payment.paymentStatus.slice(1).toLowerCase();
  this.ToggleModel(true);
}
  ShowModel:boolean=false;
  ToggleModel(state:boolean)
  {
    this.ShowModel=state;
  }
  UpdateRecord()
  {
    const uPaymentForm = {
      Id:this.paymentform.id,
      MemberId:this.paymentform.memberId,
      PaymentType:this.paymentform.paymentType,
      Amount:this.paymentform.amount,
      PaymentStatus:this.paymentform.paymentStatus  
    }
    this.http.put('https://localhost:7233/api/Payment/'+this.paymentform.id,uPaymentForm).subscribe({next:(res)=>{
      alert("Payment Updated Successfully");
      this.getpaymentdata();
      this.ToggleModel(false);
     }});

  }
  DeletePayment(id:number)
  {
    this.http.delete('https://localhost:7233/api/Payment/'+id).subscribe({next:(res)=>{
      alert("Payment Deleted Successfully");
      this.getpaymentdata();
      }});
  }
 
  //PaymentType Data
  paymentTypes = [
    {value:'Online',display:"Online"},
    {value:'Cash',display:"Cash"},
  ]
   //Payment Status Data 
  paymentstatus=[
    {value:'Late',display:'Late'},
    {value:'Ontime', display:'Ontime'}
  ]
}
