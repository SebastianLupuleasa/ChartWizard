import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCreatedSuccessComponent } from './chart-created-success.component';

describe('ChartCreatedSuccessComponent', () => {
  let component: ChartCreatedSuccessComponent;
  let fixture: ComponentFixture<ChartCreatedSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartCreatedSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartCreatedSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
