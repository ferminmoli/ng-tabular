import { TestBed } from '@angular/core/testing';
import { NgTabularService } from './tabular.service';

describe('ng-tabularService', () => {
  let service: NgTabularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgTabularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
