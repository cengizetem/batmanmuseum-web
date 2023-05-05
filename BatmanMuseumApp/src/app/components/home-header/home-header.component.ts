import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {
  ngOnInit(): void {
    const navBar = document.querySelector('.navbar');
    if(navBar != null) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 750) {
          navBar.classList.add('navbar-scroll');
        } else {
          navBar.classList.remove('navbar-scroll');
        }
      });
    }
  }
}
