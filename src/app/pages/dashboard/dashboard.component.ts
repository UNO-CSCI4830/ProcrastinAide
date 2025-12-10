import { Component, computed } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { IonButton, IonicModule } from '@ionic/angular';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    imports: [CommonModule, FormsModule, IonicModule, RouterModule]
})
export class DashboardComponent {
    user = computed(() => this.auth.user());

    constructor(private auth: AuthService, private router: Router) { }

    async logout() {
        await this.auth.logout();
        this.router.navigate(['/login']);
    }
}
