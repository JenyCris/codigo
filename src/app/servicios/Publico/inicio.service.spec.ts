import { TestBed } from '@angular/core/testing';

import { InicioService } from './inicio.service';

describe('InicioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InicioService = TestBed.get(InicioService);
    expect(service).toBeTruthy();
  });
});
