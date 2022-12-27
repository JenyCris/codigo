import { TestBed } from '@angular/core/testing';

import { CertificadosService } from './certificados.service';

describe('CertificadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CertificadosService = TestBed.get(CertificadosService);
    expect(service).toBeTruthy();
  });
});
