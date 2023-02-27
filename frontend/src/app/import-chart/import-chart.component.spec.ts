import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportChartComponent } from './import-chart.component';

describe('ImportChartComponent', () => {
  let component: ImportChartComponent;
  let fixture: ComponentFixture<ImportChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
