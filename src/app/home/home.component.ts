import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';
import { DatePipe, DecimalPipe, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderHomeComponent } from "../header-home/header-home.component";
import AOS from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, DecimalPipe, RouterLink, DatePipe, HeaderHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  genreMovies: any[] = [];
  trendingMovies: any[] = [];
  trendingTv: any[] = [];
  trendingPerson: any[] = [];
  imgprefix: string = 'https://image.tmdb.org/t/p/w500';
  mainTitle !: string;

  constructor(private _moviesService: MoviesService) { }

  ngOnInit() {
    this.pagePostion()
    this.GetTrendingMovie('Trending Movies')
    this.GetTrendingTvShows()
    this.GetTrendingActors()
    AOS.init();
  }

  pagePostion() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  
  GetTrendingMovie(title: string) {
    this.mainTitle = title
    this.genreMovies = [];
    this._moviesService.trendMovies('movie').subscribe((response) => {
      this.genreMovies = response.results;
      this.trendingMovies = response.results;
    })
  }

  GetTrendingTvShows() {
    this._moviesService.trendMovies('tv').subscribe((response) => {
      this.trendingTv = response.results;
    })
  }

  GetTrendingActors() {
    this._moviesService.trendMovies('person').subscribe((response) => {
      this.trendingPerson = response.results;
    })
  }

  getMovieByGenre(id: string, title: string) {
    this.mainTitle = title;
    this.genreMovies = [];
    this._moviesService.showMoviesByGenre(id, 1).subscribe((response) => {
      this.genreMovies = response.results;
    })
  }

}
