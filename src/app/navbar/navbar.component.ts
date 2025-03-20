import { MoviesService } from './../movies.service';
import { Component, EventEmitter, NgModule, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, NgIf, FormsModule, NgFor,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {
  @Output() sideBarState: EventEmitter<boolean> = new EventEmitter<boolean>;
  isOpen: boolean = false;
  loginData: boolean = false;
  searchingData: any[] = [];
  query: string = '';
  imgprefix: string = 'https://image.tmdb.org/t/p/w500';
  isOpendSearch: boolean = false;


  constructor(private _authsevice: AuthService, private _MoviesService: MoviesService) { }

  ngOnInit(): void {
    this.userData()
  }
  
  moviesAndTvShowsData() {
    this._MoviesService.getDataBySearching(this.query).subscribe((response) => {
      this.searchingData = response.results;
    })
  }

  userData() {
    this._authsevice.userData.subscribe(() => {
      if (this._authsevice.userData.getValue() != null) {
        this.loginData = true;
      }
      else {
        this.loginData = false;
      }
    })
  }

  logout() {
    this._authsevice.logout()
  }

  openSideBar() {
    this.isOpen = !this.isOpen;
    this.sideBarState.emit(this.isOpen);
  }
  
  openSearch() {
    this.isOpendSearch = !this.isOpendSearch
  }

  closeSearch(){
    this.query = '';
    this.searchingData = [];
  }

  postionTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

}
