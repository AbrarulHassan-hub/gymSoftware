import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberrComponent } from './memberr.component';

describe('MemberrComponent', () => {
  let component: MemberrComponent;
  let fixture: ComponentFixture<MemberrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
