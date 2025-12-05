import { Injectable, signal } from '@angular/core';
import { Auth, User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, connectAuthEmulator } from '@angular/fire/auth';
import { environment } from '../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // Signal holds the current user (null if not logged in)
    currentUser = signal<User | null>(null);

    constructor(private auth: Auth) {
        // Keep signal in sync with Firebase Auth
        onAuthStateChanged(this.auth, (user) => {
            this.currentUser.set(user);
        });
    }

    /** LOGIN user with Firebase Auth */
    async login(email: string, password: string) {
        console.log(email + " " + password);
        await signInWithEmailAndPassword(this.auth, email, password);
    }

    /** REGISTER new user */
    async register(email: string, password: string) {
        await createUserWithEmailAndPassword(this.auth, email, password);
    }

    /** LOGOUT current user */
    async logout() {
        await signOut(this.auth);
    }

    /** Returns whether a user is currently authenticated */
    isAuthenticated(): boolean {
        return this.currentUser() !== null;
    }

    /** Returns the current user object */
    user(): User | null {
        return this.currentUser();
    }
}