import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMovies } from 'src/app/models/movies';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
movieId=0;
movieDetail:IMovies ={} as IMovies
  constructor(
    private movieService:MoviesService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap)=>{
      this.movieId=Number(paramMap.get('id'));
      this.movieService.getMovieDetails(this.movieId).subscribe(movie=>{
        if( this.movieDetail!=null)
        this.movieDetail=movie
      })
      
    });
  }

}
