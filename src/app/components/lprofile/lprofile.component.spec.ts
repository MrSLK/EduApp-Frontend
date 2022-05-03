import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LprofileComponent } from './lprofile.component';

describe('LprofileComponent', () => {
  let component: LprofileComponent;
  let fixture: ComponentFixture<LprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
