import { TestBed } from '@angular/core/testing';

import { RadicadoService } from './radicado.service';

describe('RadicadoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RadicadoService = TestBed.get(RadicadoService);
    expect(service).toBeTruthy();
  });
});
