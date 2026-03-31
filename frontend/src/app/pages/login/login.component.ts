import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObject:any={
    name:"",
    password:""
  }
  router=inject(Router);
  http = inject(HttpClient);
  loginUser(){
    this.http.post("https://localhost:7233/api/login", this.loginObject)
    .subscribe((res:any)=>{
      alert("Login Successfully");
      localStorage.setItem("GymLogin", JSON.stringify(res));
      this.router.navigateByUrl("dashboard");
    }, error=>{
      if(error.status==401){
        alert(error.error);
      }else{
        alert("Something went wrong. Please try later");
      }
    })
  }

}