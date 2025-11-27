import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Auth, User } from '@angular/fire/auth';

// Firebase Auth functions we need to mock
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from '@angular/fire/auth';

// -------------------------------
// Jasmine spies (NOT Jest!)
// -------------------------------
describe('AuthService (Karma + Jasmine)', () => {
    let service: AuthService;
    let authMock: jasmine.SpyObj<Auth>;

    // Create spies for Firebase functions
    let signInSpy: jasmine.Spy;
    let registerSpy: jasmine.Spy;
    let signOutSpy: jasmine.Spy;
    let onAuthSpy: jasmine.Spy;


    // Short reference to avoid long TypeScript paths in spyOn()
    const firebaseAuthFunctions = {
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        signOut,
        onAuthStateChanged
    };


    beforeEach(() => {
        // Create spy for Auth object
        authMock = {} as Auth;

        // Spy on Firebase functions BEFORE TestBed creates service
        signInSpy = spyOn<any>(firebaseAuthFunctions, 'signInWithEmailAndPassword').and.returnValue(Promise.resolve());
        registerSpy = spyOn<any>(firebaseAuthFunctions, 'createUserWithEmailAndPassword').and.returnValue(Promise.resolve());
        signOutSpy = spyOn<any>(firebaseAuthFunctions, 'signOut').and.returnValue(Promise.resolve());
        onAuthSpy = spyOn<any>(firebaseAuthFunctions, 'onAuthStateChanged').and.callFake((auth: Auth, cb: (user: User | null) => void) => {
            // Do nothing for auth-state listener in unit tests
        });

        TestBed.configureTestingModule({
            providers: [
                AuthService,
                { provide: Auth, useValue: authMock }
            ]
        });

        service = TestBed.inject(AuthService);
    });
    // --------------------------------------------------------------------
    // TEST 1 — login()
    // --------------------------------------------------------------------
    it('should call Firebase signInWithEmailAndPassword when login() is used', async () => {
        await service.login('test@example.com', 'password123');

        expect(signInSpy).toHaveBeenCalledWith(
            authMock,
            'test@example.com',
            'password123'
        );
    });

    // --------------------------------------------------------------------
    // TEST 2 — register()
    // --------------------------------------------------------------------
    it('should call Firebase createUserWithEmailAndPassword when register() is used', async () => {
        await service.register('new@example.com', 'newpass');

        expect(registerSpy).toHaveBeenCalledWith(
            authMock,
            'new@example.com',
            'newpass'
        );
    });

    // --------------------------------------------------------------------
    // TEST 3 — logout()
    // --------------------------------------------------------------------
    it('should call Firebase signOut when logout() is used', async () => {
        await service.logout();

        expect(signOutSpy).toHaveBeenCalledWith(authMock);
    });

    // --------------------------------------------------------------------
    // TEST 4 — isAuthenticated()
    // --------------------------------------------------------------------
    it('should return true when currentUser signal has a user', () => {
        const fakeUser = { uid: '111' } as User;
        service.currentUser.set(fakeUser);

        expect(service.isAuthenticated()).toBeTrue();
    });

    it('should return false when user is null', () => {
        service.currentUser.set(null);

        expect(service.isAuthenticated()).toBeFalse();
    });

    // --------------------------------------------------------------------
    // TEST 5 — user()
    // --------------------------------------------------------------------
    it('should return the current user from the signal', () => {
        const fakeUser = { uid: 'XYZ' } as User;
        service.currentUser.set(fakeUser);

        expect(service.user()).toEqual(fakeUser);
    });
});
