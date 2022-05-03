import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserCrudComponent } from './admin-user-crud.component';

describe('AdminUserCrudComponent', () => {
  let component: AdminUserCrudComponent;
  let fixture: ComponentFixture<AdminUserCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUserCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
