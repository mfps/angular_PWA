import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TastiesComponent } from './tasties.component';

describe('TastiesComponent', () => {
  let component: TastiesComponent;
  let fixture: ComponentFixture<TastiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TastiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TastiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
