import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestellenComponent } from './bestellen.component';

describe('BestellenComponent', () => {
  let component: BestellenComponent;
  let fixture: ComponentFixture<BestellenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestellenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
