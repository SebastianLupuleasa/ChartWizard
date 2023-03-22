import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullscreenChartComponent } from './fullscreen-chart.component';

describe('FullscreenChartComponent', () => {
  let component: FullscreenChartComponent;
  let fixture: ComponentFixture<FullscreenChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullscreenChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullscreenChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
