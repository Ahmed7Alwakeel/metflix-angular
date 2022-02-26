import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { IMovies } from 'src/app/models/movies';
import { AuthService } from 'src/app/services/auth.service';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  page = 1
  added: IMovies[] = []
  isLoading = false;
  favourMovie: IMovies[] = []
  isUser = false;
  searchh=""
  movie: IMovies[] = []
  constructor(
    private movieService: MoviesService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    // this.input=this.movieService.query
    this.authService.user.subscribe(user => {
      if (user) {
        this.isUser=true;
        console.log(this.isUser)
        this.authService.userID = user.uid
        
        this.movieService.getFavouriteMovies().subscribe((movie: any) => {
          this.favourMovie = movie.map((ele: any) => {
            return {
              ide: ele.payload.doc.id,
              ...ele.payload.doc.data()
            }
          })

        })
      }
      else {
        this.authService.userID = ""
        this.isUser=false;
        console.log(this.isUser)
      }
    })
    this.isLoading = true
    if(this.searchh!=""){
      this.movieService.getMovies(this.page).subscribe((movies: any) => {
        this.isLoading = false
        this.movie = movies.results
  
      })
    }else{
      this.movieService.getMoviesBySearch("spider man").subscribe((movies: any) => {
        this.isLoading = false
        this.movie = movies.results
  
      })
    }
    



  }
  nextPage() {
    if (this.page < 20 && this.page > 0)
      this.movieService.getMovies(++this.page).subscribe((movies: any) => {
        this.isLoading = false
        this.movie = movies.results
      })
  }
  backPage() {
    if (this.page > 1)
      this.movieService.getMovies(--this.page).subscribe((movies: any) => {
        this.isLoading = false
        this.movie = movies.results
      })
  }

  addToFavour(movie: IMovies, index: number) {

    this.added[index] = movie
   
    this.movieService.addTofavour(movie).then(() => {
      
    })
  }
  removeFromFavour(movieId: number, index: number) {
    for (let i = 0; i < this.favourMovie.length; i++) {
      if (this.favourMovie[i].id == movieId) {
        this.movieService.deleteFromFavourite(this.favourMovie[i].ide).then(() => {
           this.added.splice(index, 1)
        })
      }

    }
  }
}
