import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSelectMenuComponent } from './chart-select-menu.component';

describe('ChartSelectMenuComponent', () => {
  let component: ChartSelectMenuComponent;
  let fixture: ComponentFixture<ChartSelectMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartSelectMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartSelectMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
