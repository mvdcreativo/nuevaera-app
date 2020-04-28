import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/interfaces/product';
import { Router } from '@angular/router';

@Component({
  selector: 'brands-slides',
  templateUrl: './brands-slides.component.html',
  styleUrls: ['./brands-slides.component.scss'],
})
export class BrandsSlidesComponent implements OnInit {
  @Input() configSlide;
  @Input() slides: any[];


  public urlFiles: string = environment.urlFiles;


  

  constructor(
    private route: Router
  ) { }

  ngOnInit() 
  {
  }

  onClickLink(item){
    this.route.navigate(["/list", "marca", item])
  }

}
