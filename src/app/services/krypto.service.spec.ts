import { TestBed, inject } from '@angular/core/testing';

import { KryptoService } from './krypto.service';

describe('KryptoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KryptoService]
    });
  });

  it('should be created', inject([KryptoService], (service: KryptoService) => {
    expect(service).toBeTruthy();
  }));
});
