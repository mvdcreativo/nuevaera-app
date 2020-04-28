import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit {
@Input() products: Product[]


  constructor() { }

  ngOnInit() {}




}
