import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditedSuccessComponent } from './user-edited-success.component';

describe('UserEditedSuccessComponent', () => {
  let component: UserEditedSuccessComponent;
  let fixture: ComponentFixture<UserEditedSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEditedSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserEditedSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
