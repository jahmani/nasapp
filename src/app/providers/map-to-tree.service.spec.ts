import { TestBed } from '@angular/core/testing';

import { MapToTreeService } from './map-to-tree.service';

describe('MapToTreeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapToTreeService = TestBed.get(MapToTreeService);
    expect(service).toBeTruthy();
  });
});
