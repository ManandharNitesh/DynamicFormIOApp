import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormIoFormComponent } from './edit-form-io-form.component';

describe('EditFormIoFormComponent', () => {
  let component: EditFormIoFormComponent;
  let fixture: ComponentFixture<EditFormIoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditFormIoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFormIoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
