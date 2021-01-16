import { Component, OnInit, Input } from '@angular/core';
import { AvatarSlides } from './Interface/avatar-slides';
import { Router } from '@angular/router';

@Component({
  selector: 'avatar-slides',
  templateUrl: './avatar-slides.component.html',
  styleUrls: ['./avatar-slides.component.scss'],
})
export class AvatarSlidesComponent implements OnInit {
  @Input() slides: AvatarSlides;


  constructor(
    private route: Router
  ) { }

  ngOnInit() { }

  configSlide = {
    slidesPerView: 4.5,
    spaceBetween: 10,
    centeredSlides: false,
    pagination: false,
    breakpoints: {
      1024: {
          slidesPerView: 6.5, 
          spaceBetween: 20
      },
      768: {
          slidesPerView: 6.5,
          spaceBetween: 10
      },
      640: {
          slidesPerView: 4.5,
          spaceBetween: 10
      },

    }
  }

  onClickLink(item){
    this.route.navigate(["/list", item])
  }

}
