import { Component,inject,OnInit } from '@angular/core';
import { NgClass,DatePipe} from '@angular/common';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ConstantPool } from '@angular/compiler';
interface Members {
  id: number;
  code:number;
  name: string;
  planId: number;
  phoneNo: string;
  startDate:Date;
  status:boolean
}
interface Attendance 
{
  id:number;
  memberId:number;
  attendences:string;
  date:Date;
}
@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [FormsModule,NgClass, HttpClientModule,DatePipe ],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent implements OnInit {
  Attendence:Attendance = {
    id:0,
    memberId:0,
    attendences:'',
    date:new Date()
  };
  Member:Members[]=[];
  Attend:Attendance[]=[];
  ngOnInit(): void 
  {
    this.getMembers();
    this.getAttttendence()
  }
  http = inject(HttpClient);
  getAttttendence()
  {
    this.http.get<Attendance[]>("https://localhost:7233/api/Attendence").subscribe({next:(res)=>{
      this.Attend=res;
      console.log("attendence record:",this.Attend);
    }})
  }
  getMembers()
  {
     this.http.get<Members[]>("https://localhost:7233/api/members").subscribe({next:(res)=>{
      this.Member = res;
    }})
  }
  SavePayment()
  {
    const cAttendence={
      MemberId:this.Attendence.memberId,
      Attendences:this.Attendence.attendences,
      Date:this.Attendence.date 
    }
    this.http.post("https://localhost:7233/api/Attendence",cAttendence).subscribe({next:(res)=>{
      this.getAttttendence();
      this.ToggleModel(false);
    }})
  }
  getPlanName(memberId:number)
  {
    var member = this.Member.find(p=>p.id==memberId);
    return member ? member.name : "Unknown Member";
  }
  showModel: boolean = false;
  ToggleModel(state: boolean) {
    this.showModel = state;
  }
  AddModelShow() {
    this.Attendence={
      id:0,
      memberId:0,
      attendences:'',
      date:new Date() 
    }
    this.showModel = true;
  }
  EditAttendence(attendence: Attendance) {
    this.Attendence.id = attendence.id;
    this.Attendence.memberId = attendence.memberId;
    this.Attendence.attendences = attendence.attendences;
    this.Attendence.date = attendence.date;
     //  Date ko yyyy-MM-dd format mein convert karo
    const d = new Date(attendence.date);
    this.Attendence.date = d.toISOString().split('T')[0] as any;
    this.ToggleModel(true);
  }
  UpdateAttendence()
  {
     const cAttendence={
      MemberId:this.Attendence.memberId,
      Attendences:this.Attendence.attendences,
      Date:this.Attendence.date 
    }
    this.http.put("https://localhost:7233/api/Attendence/"+this.Attendence.id,cAttendence).subscribe({next:(res)=>{
      alert("Updated Successfully");
      this.getAttttendence();
      this.ToggleModel(false);
    }})
  }
  DeleteAttendence(id:Number)
  {
    this.http.delete("https://localhost:7233/api/Attendence/"+id).subscribe({next:(res)=>{
      alert("Deleted Successfully");
      this.getAttttendence();
    }})
  }

  attendence = [
    {Id:1,value:'Present',display:"Present"},
    {Id:2,value:'Absent',display:"Absent"},
  ];
}