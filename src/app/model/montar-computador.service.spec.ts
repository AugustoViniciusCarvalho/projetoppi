import { TestBed } from '@angular/core/testing';

import { MontarComputadorService } from './montar-computador.service';

describe('MontarComputadorService', () => {
  let service: MontarComputadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MontarComputadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
