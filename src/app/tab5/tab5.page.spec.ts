import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Tab5Page } from './tab5.page';
import { TaskService, TaskModel } from '../services/task.service';
import { of } from 'rxjs';

describe('Tab5Page', () => {
  let component: Tab5Page;
  let fixture: ComponentFixture<Tab5Page>;
  let taskServiceSpy: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TaskService', ['setCompleted']);
    spy.tasks$ = of([]);

    await TestBed.configureTestingModule({
      imports: [Tab5Page],
      providers: [
        provideRouter([]),
        { provide: TaskService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab5Page);
    component = fixture.componentInstance;
    taskServiceSpy = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // --- Method 1: getPriorityColor ---
  describe('getPriorityColor', () => {
    it('should return "danger" if the task if overdue', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const task = { 
        name: 'Test Task', 
        createdAt: '2023-01-01T00:00:00.000Z', 
        due: yesterday.toISOString(), 
        completed: false 
      } as TaskModel;

      const result = component.getPriorityColor(task);
      expect(result).toBe('danger');
    });
    
    it('should return "warning" if the task is due today', () => {
      const today = new Date();
      
      const task = { 
        name: 'Test Task', 
        createdAt: '2023-01-01T00:00:00.000Z', 
        due: today.toISOString(), 
        completed: false 
      } as TaskModel;
      
      const result = component.getPriorityColor(task);
      expect(result).toBe('warning');
    });
  });

  // --- Method 2: toggleCompleted ---
  describe('toggleCompleted', () => {
    it('should call taskService.setCompleted with the task ID', () => {
      const mockDateStr = '2025-01-01T12:00:00.000Z';
      const task = { 
        name: 'Test Task', 
        createdAt: mockDateStr, 
        completed: false 
      } as TaskModel;

      // Call the method
      component.toggleCompleted(task, true);

      // Check if the service was called with the specific ID string
      expect(taskServiceSpy.setCompleted).toHaveBeenCalledWith(mockDateStr, true);
    });
  });

  // --- Method 3: daysBetween ---
  describe('daysBetween', () => {
    it('should return the correct number of days difference', () => {
      const start = new Date('2025-01-01T00:00:00');
      const end = new Date('2025-01-03T00:00:00');

      // @ts-ignore: Suppressing error in case function is still private
      const result = component.daysBetween(start, end);
      
      expect(result).toBe(2);
    });
  });

  // --- Method 4: toMidnight ---
  describe('toMidnight', () => {
    it('should return the date with time set to 00:00:00', () => {
      const inputDate = new Date('2025-01-01T15:45:30'); // 3:45 PM
      
      // @ts-ignore: Suppressing error in case function is still private
      const result = component.toMidnight(inputDate);
      
      expect(result.getHours()).toBe(0);
      expect(result.getMinutes()).toBe(0);
      expect(result.getSeconds()).toBe(0);
    });
  });

});