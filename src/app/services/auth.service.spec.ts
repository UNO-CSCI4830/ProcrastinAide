import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Auth, User } from '@angular/fire/auth';

describe('AuthService', () => {
  let service: AuthService;
  let authMock: jasmine.SpyObj<Auth>;

  beforeEach(() => {
    // Create a Spy object for Auth, but we only need its *instance*, not its methods,
    // because Firebase auth methods like signInWithEmailAndPassword are imported functions.
    authMock = jasmine.createSpyObj<Auth>('Auth', [], {
      currentUser: null
    });

    // Spy on Firebase helper functions
    spyOn(require('@angular/fire/auth'), 'onAuthStateChanged')
      .and.callFake((_auth: Auth, cb: (user: User | null) => void) => {
        cb(null);
      });


    spyOn(require('@angular/fire/auth'), 'signInWithEmailAndPassword')
      .and.returnValue(Promise.resolve({} as User)); // mock success

    spyOn(require('@angular/fire/auth'), 'createUserWithEmailAndPassword')
      .and.returnValue(Promise.resolve({} as User));

    spyOn(require('@angular/fire/auth'), 'signOut')
      .and.returnValue(Promise.resolve());

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Auth, useValue: authMock }
      ],
    });

    service = TestBed.inject(AuthService);
  });

  /** --------------------------------------------------------
   * TEST: login()
   * -------------------------------------------------------- */
  it('should call signInWithEmailAndPassword on login()', async () => {
    const email = 'test@example.com';
    const password = '123456';

    await service.login(email, password);

    const spy = require('@angular/fire/auth').signInWithEmailAndPassword;
    expect(spy).toHaveBeenCalledWith(authMock, email, password);
  });

  /** --------------------------------------------------------
   * TEST: register()
   * -------------------------------------------------------- */
  it('should call createUserWithEmailAndPassword on register()', async () => {
    const email = 'new@example.com';
    const password = 'password';

    await service.register(email, password);

    const spy = require('@angular/fire/auth').createUserWithEmailAndPassword;
    expect(spy).toHaveBeenCalledWith(authMock, email, password);
  });

  /** --------------------------------------------------------
   * TEST: logout()
   * -------------------------------------------------------- */
  it('should call signOut on logout()', async () => {
    await service.logout();

    const spy = require('@angular/fire/auth').signOut;
    expect(spy).toHaveBeenCalledWith(authMock);
  });

  /** --------------------------------------------------------
   * TEST: isAuthenticated() & user()
   * -------------------------------------------------------- */
  it('should return false when not authenticated', () => {
    expect(service.isAuthenticated()).toBeFalse();
    expect(service.user()).toBeNull();
  });

  it('should return true when a user is authenticated', () => {
    const fakeUser = { uid: '123' } as User;
    service.currentUser.set(fakeUser);

    expect(service.isAuthenticated()).toBeTrue();
    expect(service.user()).toEqual(fakeUser);
  });
});
