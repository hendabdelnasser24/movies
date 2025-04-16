import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MoviesService } from '../movies.service';
import { DatePipe, DecimalPipe, NgFor, NgStyle } from '@angular/common';
import AOS from 'aos';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-details-show',
  standalone: true,
  imports: [NgStyle, NgFor, DecimalPipe, RouterLink, DatePipe, NgxSpinnerModule],
  templateUrl: './details-show.component.html',
  styleUrl: './details-show.component.css'
})
export class DetailsShowComponent {

  mediaId: string = '';
  mediaType: string = '';
  tvDetails: any = {};
  mediaDetails: any = {};
  similarMovies: any[] = [];
  imgprefix: string = 'https://image.tmdb.org/t/p/w500';
  imgBackdrop: string = 'https://image.tmdb.org/t/p/original';


  constructor(private _ActivatedRoute: ActivatedRoute, private _MoviesService: MoviesService, private _ngxSpinnerService: NgxSpinnerService) {
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
    this._ngxSpinnerService.show();
    this._MoviesService.getMediaDetailsByTypeAndId(this.mediaType, this.mediaId).subscribe((response) => {
      this.mediaDetails = response;
      this._ngxSpinnerService.hide();
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    })
  }

  getSimilarMovies() {
    this._ngxSpinnerService.show();
    if (this.mediaType == 'movie' || this.mediaType == 'tv') {
      this._MoviesService.getSimilarMovies(this.mediaType, this.mediaId).subscribe((response) => {
        this.similarMovies = response.results;
        this._ngxSpinnerService.hide();
      })
    } else {
      this._MoviesService.trendMovies('person').subscribe((response) => {
        this.similarMovies = response.results;
        this._ngxSpinnerService.hide();
      })
    }
  }
  pagePostion() {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }

}
