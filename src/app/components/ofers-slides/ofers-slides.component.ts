import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/interfaces/product';
import { Router } from '@angular/router';

@Component({
  selector: 'ofers-slides',
  templateUrl: './ofers-slides.component.html',
  styleUrls: ['./ofers-slides.component.scss'],
})
export class OfersSlidesComponent implements OnInit {
  @Input() configSlide;
  @Input() slides: any[];


  public urlFiles: string = environment.urlFiles;


  

  constructor(
    private router : Router
  ) { }

  ngOnInit() 
  {
  }
  onClick(id){
    this.router.navigate(['/product-detail' , id])
  }

}
