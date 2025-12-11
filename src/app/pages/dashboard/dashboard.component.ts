import { Component, computed, AfterViewInit, ViewChild, ElementRef, OnDestroy, } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { IonButton, IonicModule } from '@ionic/angular';
import { Chart } from 'chart.js/auto';
import { TaskModel } from '../../data/task.model';
import { TaskService } from '../../services/task.service';
import { Observable,firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    imports: [CommonModule, FormsModule, IonicModule, RouterModule]
    
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  tasks$: Observable<TaskModel[]>;
  todo$: Observable<TaskModel[]>;
  completed$: Observable<TaskModel[]>;
  counts$: Observable<[number, number]>;

  @ViewChild('pieCanvas', { static: false })
  pieCanvas!: ElementRef<HTMLCanvasElement>;

  private pieChart?: Chart;

  user = computed(() => this.auth.user());

  constructor(
    private auth: AuthService,
    private router: Router,
    private taskService: TaskService,   // <-- make it a property
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    this.tasks$ = this.taskService.tasks$;  // <-- use the observable on the service

    this.todo$ = this.tasks$.pipe(
      map(list => list.filter(t => !t.completed))
    );

    this.completed$ = this.tasks$.pipe(
      map(list => list.filter(t => t.completed))
    );

    this.counts$ = this.tasks$.pipe(
      map(list => {
        const completed = list.filter(t => t.completed).length;
        const todo = list.length - completed;
        return [completed, todo] as [number, number];
      })
    );
  }
  // Function for reccomending next task
  async recommendNextTask() {
    try {
      const recommended = await this.taskService.recommendNextTask();
      if (!recommended) {
        const t = await this.toastCtrl.create({
          message: 'No pending tasks to recommend',
          duration: 2500,
          color: 'medium'
        });
        await t.present();
        return;
      }

      const message = `${recommended.name}${recommended.due ? ' — due ' + new Date(recommended.due).toLocaleString() : ''}${recommended.priority ? ' — priority ' + recommended.priority : ''}`;
      const t = await this.toastCtrl.create({
        message: `Recommended: ${message}`,
        duration: 5000,
        color: 'primary'
      });
      await t.present();
    } catch (err) {
      console.error('Recommendation failed', err);
      const t = await this.toastCtrl.create({
        message: 'Failed to compute recommendation',
        duration: 2500,
        color: 'danger'
      });
      await t.present();
    }
  }

    ngAfterViewInit() {
    this.initializeChart();

    this.showWeeklyRecapIfNeeded();
    this.counts$.subscribe(([completedCount, todoCount]) => {
    this.updateChart(completedCount, todoCount);
  });
}

initializeChart() {
  this.pieChart = new Chart(this.pieCanvas.nativeElement, {
    type: 'pie',
    data: {
      labels: ['Completed', 'To do'],
      datasets: [
        {
          label: 'Tasks',
          data: [0, 0],
          backgroundColor: ['#7ecf8fff', '#cf7589ff'],
          },
      ],
    },
  });
}

updateChart(completed: number, todo: number) {
  if (!this.pieChart) return;

  this.pieChart.data.datasets[0].data = [completed, todo];
  this.pieChart.update();
}

ngOnDestroy(): void {
    if (this.pieChart) {
      this.pieChart.destroy();
    }
  }

  private async showWeeklyRecapIfNeeded(force = false) {
    try {
      const oneWeekMs = 7 * 24 * 60 * 60 * 1000;
      if (!force) {
        const lastShown = localStorage.getItem('weeklyRecapLastShown');
        if (lastShown && (Date.now() - parseInt(lastShown, 10) < oneWeekMs)) {
          return; // already shown within the last week
        }
      }

      const tasks = await firstValueFrom(this.taskService.tasks$) as TaskModel[];
      if (!tasks || tasks.length === 0) return;

      const weekAgo = new Date(Date.now() - oneWeekMs);

      // Build session-like items from tasks but only consider completed tasks in the last week
      const sessions = tasks
        .filter(t => t.completed && t.completedAt)
        .map(t => ({
          name: t.name,
          category: t.category ?? 'Uncategorized',
          date: new Date(t.completedAt as string),
          duration: t.duration ?? 25
        })).filter(s => s.date >= weekAgo);

      if (!sessions || sessions.length === 0) return;

      const totalMinutes = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);

      // Aggregate by category
      const byCategory = new Map<string, { minutes: number; sessions: number }>();
      for (const s of sessions) {
        const c = s.category || 'Uncategorized';
        const cur = byCategory.get(c) ?? { minutes: 0, sessions: 0 };
        cur.minutes += s.duration || 0;
        cur.sessions += 1;
        byCategory.set(c, cur);
      }

      const topCategories = Array.from(byCategory.entries())
        .map(([cat, v]) => ({ cat, minutes: v.minutes, sessions: v.sessions }))
        .sort((a, b) => b.minutes - a.minutes)
        .slice(0, 5);

      // Aggregate by task name
      const byTask = new Map<string, { minutes: number; sessions: number }>();
      for (const s of sessions) {
        const key = s.name;
        const cur = byTask.get(key) ?? { minutes: 0, sessions: 0 };
        cur.minutes += s.duration || 0;
        cur.sessions += 1;
        byTask.set(key, cur);
      }

      const topTasks = Array.from(byTask.entries())
        .map(([name, v]) => ({ name, minutes: v.minutes, sessions: v.sessions }))
        .sort((a, b) => b.minutes - a.minutes)
        .slice(0, 5);

      // Build plain-text message
      const plural = sessions.length === 1 ? 'session' : 'sessions';
      let message = `You had ${sessions.length} ${plural} this week totaling ${totalMinutes} minutes.\n\n`;
      message += `Top topics:\n`;
      for (const c of topCategories) {
        message += `- ${c.cat}: ${c.minutes} min (${c.sessions} sessions)\n`;
      }
      message += `\nTop activities:\n`;
      for (const t of topTasks) {
        message += `- ${t.name}: ${t.minutes} min (${t.sessions} sessions)\n`;
      }

      const alert = await this.alertCtrl.create({
        header: 'Weekly Recap',
        message,
        cssClass: 'weekly-recap-alert',
        buttons: [
          { text: 'View Details', handler: () => this.router.navigate(['/session-history']) },
          { text: 'OK', role: 'cancel' }
        ]
      });
      await alert.present();

      // mark shown
      localStorage.setItem('weeklyRecapLastShown', Date.now().toString());
    } catch (err) {
      console.error('Failed to compute weekly recap', err);
    }
  }

  // Debug helper: force show the weekly recap now (temporary)
  public async showWeeklyRecapNow() {
    await this.showWeeklyRecapIfNeeded(true);
  }



    async logout() {
        await this.auth.logout();
        this.router.navigate(['/login']);
    }
}