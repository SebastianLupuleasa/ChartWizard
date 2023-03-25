import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedChartDialogComponent } from './shared-chart-dialog.component';

describe('SharedChartDialogComponent', () => {
  let component: SharedChartDialogComponent;
  let fixture: ComponentFixture<SharedChartDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedChartDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedChartDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
