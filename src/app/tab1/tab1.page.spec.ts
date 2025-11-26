import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tab1Page } from './tab1.page';
import { RouterTestingModule } from '@angular/router/testing';

describe('Tab1Page', () => {
  let component: Tab1Page;
  let fixture: ComponentFixture<Tab1Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, Tab1Page],
    }).compileComponents();

    fixture = TestBed.createComponent(Tab1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate the pie canvas in the template', () => {
    const canvas: HTMLCanvasElement | null =
      fixture.nativeElement.querySelector('canvas');
    expect(canvas).toBeTruthy();
  });

  it('should create the pie chart after init view', () => {
    const anyComponent = component as any;
    expect(anyComponent.pieChart).toBeDefined();
  });

  it('should destroy the chart on ngOnDestroy', () => {
    const mockChart = { destroy: jasmine.createSpy('destroy') } as any;
    (component as any).pieChart = mockChart;
    component.ngOnDestroy();
    expect(mockChart.destroy).toHaveBeenCalled();
  });

  it('taskButton should be callable and for now, return undefined', () => {
    expect(() => component.taskButton()).not.toThrow();
    expect(component.taskButton()).toBeUndefined();
  });

  it('pomodoroButton should be callable and for now, return undefined', () => {
    expect(() => component.pomodoroButton()).not.toThrow();
    expect(component.pomodoroButton()).toBeUndefined();
  });

  it('calendarButton should be callable and for now, return undefined', () => {
    expect(() => component.calendarButton()).not.toThrow();
    expect(component.calendarButton()).toBeUndefined();
  });
});
