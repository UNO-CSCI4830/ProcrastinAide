import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    selectedTab: 'login' | 'register' = 'login'; // controls which tab is active

    email = '';
    password = '';
    confirmPassword = '';
    errorMessage = '';

    constructor(private auth: AuthService, private router: Router) { }

    // switch tabs
    setTab(tab: 'login' | 'register') {
        this.selectedTab = tab;
        this.errorMessage = '';
    }

    async login() {
        try {
            await this.auth.login(this.email, this.password);
            this.router.navigate(['/dashboard']);
        } catch (error) {
            this.errorMessage = 'Invalid email or password.';
        }
    }

    async register() {
        if (this.password !== this.confirmPassword) {
            this.errorMessage = 'Passwords do not match.';
            return;
        }
        try {
            await this.auth.register(this.email, this.password);
            this.router.navigate(['/dashboard']);
        } catch (error) {
            this.errorMessage = 'Registration failed. Try again.';
        }
    }
}
