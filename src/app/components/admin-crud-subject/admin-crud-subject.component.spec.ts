import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCrudSubjectComponent } from './admin-crud-subject.component';

describe('AdminCrudSubjectComponent', () => {
  let component: AdminCrudSubjectComponent;
  let fixture: ComponentFixture<AdminCrudSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCrudSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCrudSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
