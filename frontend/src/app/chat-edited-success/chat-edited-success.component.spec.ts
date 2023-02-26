import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatEditedSuccessComponent } from './chat-edited-success.component';

describe('ChatEditedSuccessComponent', () => {
  let component: ChatEditedSuccessComponent;
  let fixture: ComponentFixture<ChatEditedSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatEditedSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatEditedSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
