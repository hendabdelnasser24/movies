import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-header-home',
  standalone: true,
  imports: [CarouselModule, NgFor, RouterLink],
  templateUrl: './header-home.component.html',
  styleUrl: './header-home.component.css'
})

export class HeaderHomeComponent {

  @Input() headerTrendingMovies: any[] = [];
  imgprefix: string = 'https://image.tmdb.org/t/p/w500';
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 900,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 4
      },
      400: {
        items: 4
      },
      740: {
        items: 8
      },
      940: {
        items: 8
      }
    },
    nav: true
  }

}
