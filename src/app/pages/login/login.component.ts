import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    selectedTab: 'login' | 'register' = 'login';

    email = '';
    password = '';
    confirmPassword = '';
    errorMessage = '';

    constructor(private auth: AuthService, private router: Router) {}

    setTab(tab: 'login' | 'register') {
        this.selectedTab = tab;
        this.errorMessage = '';
    }

    async login() {
        console.log("Email:", this.email, "Password:", this.password);
        try {
            await this.auth.login(this.email, this.password);
            this.router.navigate(['/dashboard']);
        } catch (error: any) {
            console.error(error);
            this.errorMessage = error.message;
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
        } catch (error: any) {
            console.error(error);
            this.errorMessage = error.message;
        }
    }
}
