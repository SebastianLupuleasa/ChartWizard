import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSharedSuccessComponent } from './chart-shared-success.component';

describe('ChartSharedSuccessComponent', () => {
  let component: ChartSharedSuccessComponent;
  let fixture: ComponentFixture<ChartSharedSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartSharedSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartSharedSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
