import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VervoersgegevensComponent } from './vervoersgegevens.component';
//tests
describe('VervoersgegevensComponent', () => {
  let component: VervoersgegevensComponent;
  let fixture: ComponentFixture<VervoersgegevensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VervoersgegevensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VervoersgegevensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
