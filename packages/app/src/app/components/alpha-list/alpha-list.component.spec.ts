import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphaListComponent } from './alpha-list.component';

describe('AlphaListComponent', () => {
  let component: AlphaListComponent;
  let fixture: ComponentFixture<AlphaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlphaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlphaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
