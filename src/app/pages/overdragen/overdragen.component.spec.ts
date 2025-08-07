import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverdragenComponent } from './overdragen.component';

describe('OverdragenComponent', () => {
  let component: OverdragenComponent;
  let fixture: ComponentFixture<OverdragenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverdragenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverdragenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
