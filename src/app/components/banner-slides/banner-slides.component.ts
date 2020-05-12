import { Component, OnInit, Input } from '@angular/core';
import { Slides } from '../ofers-slides/Interface/slides';

@Component({
  selector: 'banner-slides',
  templateUrl: './banner-slides.component.html',
  styleUrls: ['./banner-slides.component.scss'],
})
export class BannerSlidesComponent implements OnInit {

  @Input() slides: Slides;

  constructor() { }

  ngOnInit() {}


  configSlide = {
    slidesPerView: 1.2,
    spaceBetween: 5,
    // centeredSlides: true,
    pagination: false,

  }
}
