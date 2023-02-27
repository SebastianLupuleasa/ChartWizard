import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartImportSuccessComponent } from './chart-import-success.component';

describe('ChartImportSuccessComponent', () => {
  let component: ChartImportSuccessComponent;
  let fixture: ComponentFixture<ChartImportSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartImportSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartImportSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
