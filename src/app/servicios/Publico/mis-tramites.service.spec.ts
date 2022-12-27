import { TestBed } from '@angular/core/testing';

import { MisTramitesService } from './mis-tramites.service';

describe('MisTramitesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MisTramitesService = TestBed.get(MisTramitesService);
    expect(service).toBeTruthy();
  });
});
