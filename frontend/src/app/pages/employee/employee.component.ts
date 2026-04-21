import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component,inject,OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Console } from 'console';
interface Employee {
  id: number;
  empCode: number;
  phoneNo: string;
  empName: string;
  empNIC: string;
  empAdress: string;
  status: boolean;
}

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule,HttpClientModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  http = inject(HttpClient);
  employees: Employee[] = [];
  employeeData = {
    id: 0,
    empCode:0,
    empName: '',
    phoneNo: '',
    empNIC: '',
    empAdress: '',
    status: false
  }
  ngOnInit(): void {
    this.getEmployeeRecord();
  }
  ShowModel: boolean = false;
  ToggleModel(status: boolean) {
    this.ShowModel = status;
  }
  ResetModel() {
    this.employeeData = {
      id: 0,
      empCode:0,
      empName: '',
      phoneNo: '',
      empNIC: '',
      empAdress: '',
      status: false
    };
    this.ToggleModel(true);
  }
  getEmployeeRecord()
  {
    this.http.get<Employee[]>('https://localhost:7233/api/Employee').subscribe(
      (response) => {
        this.employees = response;
        console.log('Employee record updated successfully:', this.employees);
      },
      (error) => {
        console.error('Error fetching employee records:', error);
        alert('Error fetching employee records.');
      }
    );
  }
  AddRecordEmp()
  {
    this.http.post('https://localhost:7233/api/Employee', this.employeeData).subscribe(
      (response) => {
        console.log('Employee record added successfully:', response);
        this.getEmployeeRecord(); 
        this.ToggleModel(false); 
      },
      (error) => {
        console.error('Error adding employee record:', error);
      }
    );
  }
UpdateRecordEmp() {
  const payload = {
    ...this.employeeData,
    empCode: Number(this.employeeData.empCode),
    status: this.employeeData.status === true || (this.employeeData.status as any) === 'true'
  };

  this.http.put(`https://localhost:7233/api/Employee/${payload.id}`, payload).subscribe(
    (response) => {
      console.log('Employee record updated successfully:', response);
      this.getEmployeeRecord();
      this.ToggleModel(false);
    },
    (error) => {
      console.error('Error updating employee record:', error);
      alert('Error updating: ' + JSON.stringify(error.error));
    }
  );
}
  DeleteRecord(id: number)
  {
    this.http.delete(`https://localhost:7233/api/Employee/${id}`).subscribe(  
      (response) => {
        console.log('Employee record deleted successfully:', response);
        this.getEmployeeRecord(); 
      },
      (error) => {
        console.error('Error deleting employee record:', error);
      }
    );
  }
  editmember(employee: Employee) {
    this.employeeData = { ...employee };
    this.ToggleModel(true);
  }
}
