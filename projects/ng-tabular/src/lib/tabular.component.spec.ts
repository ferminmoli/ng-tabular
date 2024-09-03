import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgTabularComponent } from './tabular.component';

describe('NgTabularComponent', () => {
  let component: NgTabularComponent;
  let fixture: ComponentFixture<NgTabularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgTabularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgTabularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
