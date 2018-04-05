import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegateInfoComponent } from './delegate-info.component';

describe('DelegateInfoComponent', () => {
  let component: DelegateInfoComponent;
  let fixture: ComponentFixture<DelegateInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelegateInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelegateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
