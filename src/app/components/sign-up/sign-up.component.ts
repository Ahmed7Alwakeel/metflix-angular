import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
error="";
  constructor(private authService:AuthService,
    private route:Router,) { }

  ngOnInit(): void {
  }
  signUp(form: NgForm) {
    let data = form.value
    console.log(data)
    this.authService.signUp(data.email, data.password).then((res) => {
      if(res.user!=null)
     this.authService.addNewUser(res.user.uid,data.name,data.email).then(()=>{
       this.route.navigate(['/welcome'])
     })
    }).catch(error => {
      this.error = error.message
    })
  }

}
