import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { RouterModule } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { TaskService, TaskModel } from '../services/task.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    RouterModule,
    ExploreContainerComponent,
  ],
})
export class Tab1Page implements AfterViewInit, OnDestroy {
  tasks$: Observable<TaskModel[]>;
  todo$: Observable<TaskModel[]>;
  completed$: Observable<TaskModel[]>;
  counts$: Observable<[number, number]>;
  @ViewChild('pieCanvas', { static: false })
  pieCanvas!: ElementRef<HTMLCanvasElement>;

  private pieChart?: Chart;

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.tasks$;
    this.todo$ = this.tasks$.pipe(map((list) => list.filter((t) => !t.completed)));
    this.completed$ = this.tasks$.pipe(map((list) => list.filter((t) => t.completed)));

    this.counts$ = this.tasks$.pipe(
    map(list => {
      const completed = list.filter(t => t.completed).length;
      const todo = list.length - completed;
      return [completed, todo] as [number, number];
    })
    );
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

  taskButton() {
    return
  }

  pomodoroButton() {
    return
  }

  calendarButton() {
    return
  }

}
