import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MoviesService } from '../movies.service';
import { DatePipe, DecimalPipe, NgFor, NgStyle } from '@angular/common';
import AOS from 'aos';

@Component({
  selector: 'app-movies-details',
  standalone: true,
  imports: [NgStyle, NgFor, DecimalPipe, RouterLink, DatePipe],
  templateUrl: './movies-details.component.html',
  styleUrl: './movies-details.component.css'
})

export class MoviesDetailsComponent {

  mediaId: string = '';
  mediaType: string = '';
  tvDetails: any = {};
  mediaDetails: any = {};
  similarMovies: any[] = [];
  imgprefix: string = 'https://image.tmdb.org/t/p/w500';
  imgBackdrop: string = 'https://image.tmdb.org/t/p/original';


  constructor(private _ActivatedRoute: ActivatedRoute, private _MoviesService: MoviesService) {
    _ActivatedRoute.paramMap.subscribe(params => {
      this.ngOnInit()
    })
  }

  ngOnInit(): void {
    this.getIdAndMediaFromLink()
    this.getMovieDetailsById();
    this.getSimilarMovies();
    AOS.init();
  }

  getIdAndMediaFromLink() {
    this.mediaType = (this._ActivatedRoute.snapshot.params['media']);
    this.mediaId = this._ActivatedRoute.snapshot.params['id'];
  }

  getMovieDetailsById() {
    this._MoviesService.getMediaDetailsByTypeAndId(this.mediaType, this.mediaId).subscribe((response) => {
      this.mediaDetails = response;
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    })
  }

  getSimilarMovies() {
    if (this.mediaType == 'movie' || this.mediaType == 'tv') {
      this._MoviesService.getSimilarMovies(this.mediaType, this.mediaId).subscribe((response) => {
        this.similarMovies = response.results;
      })
    } else {
      this._MoviesService.trendMovies('person').subscribe((response) => {
        this.similarMovies = response.results;
      })
    }
  }

}
