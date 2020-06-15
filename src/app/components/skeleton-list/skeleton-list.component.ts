import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'skeleton-list',
  templateUrl: './skeleton-list.component.html',
  styleUrls: ['./skeleton-list.component.scss'],
})
export class SkeletonListComponent implements OnInit {

  @Input()cantItera :number = 1;
  iteraciones: any[];

  constructor() { }

  ngOnInit() {
    this.iteraciones = Array(this.cantItera)
  }

}
