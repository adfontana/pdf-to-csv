import { TestBed } from '@angular/core/testing';

import { FileReaderService } from './file-reader.service';

describe('FileReaderService', () => {
  let service: FileReaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileReaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
