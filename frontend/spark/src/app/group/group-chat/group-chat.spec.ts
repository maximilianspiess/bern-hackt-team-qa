import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupChat } from './group-chat';

describe('GroupChat', () => {
  let component: GroupChat;
  let fixture: ComponentFixture<GroupChat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupChat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupChat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
