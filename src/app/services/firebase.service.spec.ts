import { TestBed } from '@angular/core/testing';
import { FirebaseService } from './firebase.service';
import { environment } from '../../environments/environment';

describe('FirebaseService', () => {
  let service: FirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseService]
    });
    service = TestBed.inject(FirebaseService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should return the FirebaseApp instance', () => {
    expect(service.getAppInstance()).toBeDefined();
  });

  it('should return the Firestore instance', () => {
    expect(service.getDbInstance()).toBeDefined();
  });

  it('should correctly report emulator usage', () => {
    expect(service.isUsingEmulator()).toBe(environment.useEmulators);
  });
});
