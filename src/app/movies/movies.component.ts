import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor, DecimalPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import AOS from 'aos';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [NgFor, DecimalPipe, RouterLink, DatePipe, NgxSpinnerModule, ReactiveFormsModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})

export class MoviesComponent {

  genreForm: FormGroup = new FormGroup({
    selectedOption: new FormControl('28'),
  })
  genresIdAndName: any[] = [];
  genreMovies: any[] = [];
  selectValue: string = '';
  totalPages: number[] = [];
  imgprefix: string = 'https://image.tmdb.org/t/p/w500';
  currentPage: number = 0;


  constructor(private _moviesService: MoviesService, private _ngxSpinnerService: NgxSpinnerService) { }


  ngOnInit(): void {

    this.getGenresIdAndName()
    this.getMoviesByGenre(1)
    AOS.init();
  }

  getGenresIdAndName() {
    this._ngxSpinnerService.show();
    this._moviesService.getMovieGenreIdAndName().subscribe((Response) => {
      this.genresIdAndName = Response.genres
    })
    this._ngxSpinnerService.hide();
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
  }

  getMoviesByGenre(pageNumber: number) {
    const id = this.genreForm.controls['selectedOption'].value
    this._ngxSpinnerService.show();
    this._moviesService.showMoviesByGenre(id, pageNumber).subscribe((response) => {
      this.genreMovies = response.results;
      this._ngxSpinnerService.hide();
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
    this.getMoviesByGenre(this.currentPage + 1)
    this._ngxSpinnerService.hide();
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
  }

  previousPage() {
    this.currentPage -= 1;
    this.getMoviesByGenre(this.currentPage + 1)
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

}

