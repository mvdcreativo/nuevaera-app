import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DataOrderPage } from './data-order.page';

describe('DataOrderPage', () => {
  let component: DataOrderPage;
  let fixture: ComponentFixture<DataOrderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataOrderPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DataOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
