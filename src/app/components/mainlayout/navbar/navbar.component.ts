import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
isUser=false;
  constructor(
    private authService:AuthService,
    private route:Router,
    private movieService:MoviesService
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      if (user) {
        this.authService.userID = user.uid
        this.isUser=true;
      }
      else {
        
        this.authService.userID = ""
        this.isUser=false
      }
    })
  }
  logOut(){
this.authService.logOut().then(()=>{
this.route.navigate(["/login"])
})
  }

}
