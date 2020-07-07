import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddNewShopPage } from './add-new-shop.page';

describe('AddNewShopPage', () => {
  let component: AddNewShopPage;
  let fixture: ComponentFixture<AddNewShopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewShopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewShopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
