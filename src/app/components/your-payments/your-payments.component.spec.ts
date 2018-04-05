import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourPaymentsComponent } from './your-payments.component';

describe('YourPaymentsComponent', () => {
  let component: YourPaymentsComponent;
  let fixture: ComponentFixture<YourPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
