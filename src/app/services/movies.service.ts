import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMovies } from '../models/movies';
import{AuthService} from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpClient: HttpClient,
    private authService:AuthService,
    private fireStore: AngularFirestore,
  
    ) { }
  getMovies(page:number):Observable<IMovies>{
    return this.httpClient.get<IMovies>(`${environment.baseUrl}${page}`) 
  }
  getMovieDetails(id:number):Observable<IMovies>{
    return this.httpClient.get<IMovies>(`https://api.themoviedb.org/3/movie/${id}?api_key=9f88bf74a43bfc37f66724aa8369bbe1`) 
  }
getMoviesBySearch(query:string):Observable<IMovies>{
  return this.httpClient.get<IMovies>(`https://api.themoviedb.org/3/movie/popular?api_key=9f88bf74a43bfc37f66724aa8369bbe1&query=${query}`)
}
  addTofavour(movie:IMovies){
      return this.fireStore.collection(`user/${this.authService.userID}/favoriteMovie`).add(movie)
    
  }
  getFavouriteMovies() {
    return this.fireStore.collection(`user/${this.authService.userID}/favoriteMovie`).snapshotChanges()
  }
  deleteFromFavourite(movieId: string) {
    return this.fireStore.doc(`user/${this.authService.userID}/favoriteMovie/${movieId}`).delete()
  }
}
