import { RouterLink, RouterLinkActive } from '@angular/router';
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})

export class SideBarComponent {

  @Input() openedBar: boolean = false;

  sidebarState() {
    this.openedBar = !this.openedBar
  }

  postionTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

}
