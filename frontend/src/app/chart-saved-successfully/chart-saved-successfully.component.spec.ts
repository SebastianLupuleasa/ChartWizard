import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSavedSuccessfullyComponent } from './chart-saved-successfully.component';

describe('ChartSavedSuccessfullyComponent', () => {
  let component: ChartSavedSuccessfullyComponent;
  let fixture: ComponentFixture<ChartSavedSuccessfullyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartSavedSuccessfullyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartSavedSuccessfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
