import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/mainlayout/navbar/navbar.component';
import { MainlayoutComponent } from './components/mainlayout/mainlayout.component';
import { MoviesComponent } from './components/mainlayout/movies/movies.component';
import { DetailsComponent } from './components/mainlayout/details/details.component';
import {HttpClientModule} from '@angular/common/http'
import { FavouriteComponent } from './components/mainlayout/favourite/favourite.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    NavbarComponent,
    MainlayoutComponent,
    MoviesComponent,
    DetailsComponent,
    FavouriteComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
   
    BrowserModule,
    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
