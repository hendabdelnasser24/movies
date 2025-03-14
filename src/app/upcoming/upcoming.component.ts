import { Component } from '@angular/core';
import { MoviesService } from '../movies.service';
import { RouterLink } from '@angular/router';
import { DatePipe, DecimalPipe, NgFor } from '@angular/common';
import AOS from 'aos';

@Component({
  selector: 'app-upcoming',
  standalone: true,
  imports: [RouterLink, DecimalPipe, DatePipe, NgFor],
  templateUrl: './upcoming.component.html',
  styleUrl: './upcoming.component.css'
})

export class UpcomingComponent {

  upcomingMovies: any[] = [];
  totalPages: number[] = [];
  imgprefix: string = 'https://image.tmdb.org/t/p/w500';
  currentPage: number = 0;

  constructor(private _moviesService: MoviesService) { }


  ngOnInit(): void {
    this.getUpcomingMovies(1)
    AOS.init();
  }

  getUpcomingMovies(pageNumber: number) {
    this.upcomingMovies = [];
    this._moviesService.getUpcomingMovies(pageNumber).subscribe((response) => {
      this.upcomingMovies = response.results
      this.getTotalPages(20)
    })
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
    this.getUpcomingMovies(this.currentPage + 1)
  }

  previousPage() {
    this.currentPage -= 1;
    this.getUpcomingMovies(this.currentPage + 1)
  }

}
