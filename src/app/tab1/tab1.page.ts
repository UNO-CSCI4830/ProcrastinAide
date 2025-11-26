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
  @ViewChild('pieCanvas', { static: false })
  pieCanvas!: ElementRef<HTMLCanvasElement>;

  private pieChart?: Chart;

  constructor() {}

  ngAfterViewInit(): void {
    console.log('Tab1 ngAfterViewInit, canvas:', this.pieCanvas?.nativeElement);

    if (!this.pieCanvas) {
      return;
    }

    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Completed', 'In Progress', 'Not Started'],
        datasets: [
          {
            label: 'Tasks',
            data: [5, 3, 2],
            backgroundColor: ['#4bc0c0', '#ffcd56', '#ff6384'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      },
    });
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
