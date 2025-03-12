import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { SideBarComponent } from "./side-bar/side-bar.component";
import { AuthService } from './auth.service';
import { NgStyle } from '@angular/common';
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    SideBarComponent,
    NgStyle,
    FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {

  title = 'movies';
  isLogin: boolean = false;
  isOpenSideBar: boolean = false;

  
  constructor(private _authsevice: AuthService) { }

  ngOnInit(): void {
    this.checkIsLogin()
  }

  checkIsLogin() {
    this._authsevice.userData.subscribe(() => {
      if (this._authsevice.userData.getValue() != null) {
        this.isLogin = true;
      }
      else {
        this.isLogin = false;
      }
    })
  }

  sideBarValue(event: any) {
    this.isOpenSideBar = event
  }

}
