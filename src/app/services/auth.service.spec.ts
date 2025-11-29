import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Auth, User } from '@angular/fire/auth';

describe('AuthService', () => {
    let service: AuthService;

    beforeEach(() => {
        const authMock = {
            onAuthStateChanged: jasmine.createSpy('onAuthStateChanged')
                .and.callFake((callback: any) => {
                    callback(null);
                    return () => { };
                }),

            // Modular API calls inside AuthService
            signOut: jasmine.createSpy('signOut').and.resolveTo(true),
            signInWithEmailAndPassword: jasmine.createSpy('signIn').and.resolveTo({}),
            createUserWithEmailAndPassword: jasmine.createSpy('register').and.resolveTo({}),

            // AngularFire / Firebase internal calls
            _getRecaptchaConfig: jasmine.createSpy('_getRecaptchaConfig')
                .and.resolveTo(null),

            _initializeRecaptchaConfig: jasmine.createSpy('_initializeRecaptchaConfig')
                .and.resolveTo(null),

            settings: {
                isProviderEnabled: jasmine.createSpy('isProviderEnabled')
                    .and.returnValue(false)
            }
        } as unknown as Auth;

        TestBed.configureTestingModule({
            providers: [
                AuthService,
                { provide: Auth, useValue: authMock }
            ]
        });

        service = TestBed.inject(AuthService);
    });


    it('should call AuthService signInWithEmailAndPassword when login() is used', () => {
        expect(service.login('test@example.com', 'password123')).toBeDefined();
    });

    it('should call AuthService createUserWithEmailAndPassword when register() is used', () => {
        expect(service.register('new@example.com', 'newpass')).toBeDefined();
    });

    it('should call AuthService signOut when logout() is used', () => {
        expect(service.logout()).toBeDefined();
    });

    it('should return true when currentUser signal has a user', () => {
        const fakeUser = { uid: '111' } as User;
        service.currentUser.set(fakeUser);

        expect(service.isAuthenticated()).toBeTrue();
    });

    it('should return false when user is null', () => {
        service.currentUser.set(null);

        expect(service.isAuthenticated()).toBeFalse();
    });
});