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
    slidesPerView: "auto",
    spaceBetween: 10,
    initialSlide:1,
    centeredSlides: true,
    // centeredSlides: true,
    pagination: false,

  }
}
