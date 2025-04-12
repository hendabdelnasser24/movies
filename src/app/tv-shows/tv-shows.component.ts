import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor, DecimalPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import AOS from 'aos';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-tv-shows',
  standalone: true,
  imports: [NgFor, DecimalPipe, RouterLink, DatePipe, NgxSpinnerModule, ReactiveFormsModule],
  templateUrl: './tv-shows.component.html',
  styleUrl: './tv-shows.component.css'
})

export class TvShowsComponent {

  genreForm: FormGroup = new FormGroup({
    selectedOption: new FormControl('10759'),
  })
  genreTvShows: any[] = []
  genresTvIdAndName: any[] = [];
  selectValue: string = '';
  totalPages: number[] = [];
  imgprefix: string = 'https://image.tmdb.org/t/p/w500';
  currentPage: number = 0;


  constructor(private _moviesService: MoviesService, private _ngxSpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getTvGenresIdAndName()
    this.getTvShowsByGenre(1)
    AOS.init();
  }

  getTvGenresIdAndName() {
    this._ngxSpinnerService.show();
    this._moviesService.getTvGenreIdAndName().subscribe((Response) => {
      this.genresTvIdAndName = Response.genres
    })
    this._ngxSpinnerService.hide();
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getTvShowsByGenre(pageNumber: number) {
    const id = this.genreForm.controls['selectedOption'].value
    this._ngxSpinnerService.show();
    this._moviesService.showTvByGenre(id, pageNumber).subscribe((Response) => {
      this.genreTvShows = Response.results;
      this.getTotalPages(20)
    })
    this._ngxSpinnerService.hide();
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getTotalPages(totalPages: number) {
    this.totalPages = [];
    for (let index = 1; index <= totalPages; index++) {
      this.totalPages.push(index)
    }
  }

  activeButton(index: number) {
    this.currentPage = index
  }

  nextPage() {
    this.currentPage += 1;
    this.getTvShowsByGenre(this.currentPage + 1)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  previousPage() {
    this.currentPage -= 1;
    this.getTvShowsByGenre(this.currentPage + 1)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
