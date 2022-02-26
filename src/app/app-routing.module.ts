import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DetailsComponent } from './components/mainlayout/details/details.component';
import { FavouriteComponent } from './components/mainlayout/favourite/favourite.component';
import { MainlayoutComponent } from './components/mainlayout/mainlayout.component';
import { MoviesComponent } from './components/mainlayout/movies/movies.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"login", component:LoginComponent,canActivate:[LoginGuard]}, //,canActivate:[LoginGuard]
  {path:"sign-up", component:SignUpComponent,canActivate:[LoginGuard]},  //,canActivate:[LoginGuard]
  
  {path:"",component:MainlayoutComponent,children:[
    {path:"home",component:MoviesComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path:"detail/:id",component:DetailsComponent},
    {path:"favourite",component:FavouriteComponent,canActivate:[AuthGuard]},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
