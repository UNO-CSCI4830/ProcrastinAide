import { Component, computed, AfterViewInit, ViewChild, ElementRef, OnDestroy, } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { IonButton, IonicModule } from '@ionic/angular';
import { Chart } from 'chart.js/auto';
import { TaskModel } from '../../data/task.model';
import { TaskService } from '../../services/task.service';
import { Observable } from 'rxjs';
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
    private toastCtrl: ToastController
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



    async logout() {
        await this.auth.logout();
        this.router.navigate(['/login']);
    }
}