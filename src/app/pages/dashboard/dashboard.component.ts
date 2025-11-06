import { Component, computed } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    user = computed(() => this.auth.user());

    constructor(private auth: AuthService, private router: Router) { }

    async logout() {
        await this.auth.logout();
        this.router.navigate(['/login']);
    }
}
