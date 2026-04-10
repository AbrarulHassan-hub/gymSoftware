import { Component } from '@angular/core';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent {
  showModel:boolean = false;
  ToggleModel(state:boolean)
  {
    this.showModel = state;
  }
  AddModelShow()
  {
    this.showModel = true;
  }
}
