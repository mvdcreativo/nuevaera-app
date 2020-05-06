import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MercadopagoWebComponent } from './mercadopago-web.component';

describe('MercadopagoWebComponent', () => {
  let component: MercadopagoWebComponent;
  let fixture: ComponentFixture<MercadopagoWebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MercadopagoWebComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MercadopagoWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
