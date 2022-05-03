import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddSubjectComponent } from './admin-add-subject.component';

describe('AdminAddSubjectComponent', () => {
  let component: AdminAddSubjectComponent;
  let fixture: ComponentFixture<AdminAddSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
