import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedChartsComponent } from './shared-charts.component';

describe('SharedChartsComponent', () => {
  let component: SharedChartsComponent;
  let fixture: ComponentFixture<SharedChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedChartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
