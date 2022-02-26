import { Component, OnInit } from '@angular/core';
import { IMovies } from 'src/app/models/movies';
import { AuthService } from 'src/app/services/auth.service';
import { MoviesService } from 'src/app/services/movies.service';
import { MoviesComponent } from '../movies/movies.component';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {
  favouriteMovies: IMovies[] = []
  constructor(
    private authService: AuthService,
    private movieService: MoviesService
  ) { }

  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      if (user) {
        this.authService.userID = user.uid

        this.movieService.getFavouriteMovies().subscribe((movie: any) => {
          this.favouriteMovies = movie.map((ele: any) => {
            return {
              ide: ele.payload.doc.id,
              ...ele.payload.doc.data()
            }
          })
        })
      }
      else {

        this.authService.userID = ""
      }
    })
  }

  removeFromFavour(movieId:number,index:number){
    
    // alert(movie.fireId)
    for(let i=0;i<this.favouriteMovies.length;i++){
      if( this.favouriteMovies[i].id==movieId){
      
        this.movieService.deleteFromFavourite(this.favouriteMovies[i].ide).then(()=>{
          // this.added.splice(index,1)
        })
    }
   
     
     }
   }
}
