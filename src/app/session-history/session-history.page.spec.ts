import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SessionHistoryPage } from './session-history.page';
import { RouterTestingModule } from '@angular/router/testing';
import { DatePipe } from '@angular/common';

describe('SessionHistoryPage (Unit Tests)', () => {
  let component: SessionHistoryPage;
  let fixture: ComponentFixture<SessionHistoryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionHistoryPage, RouterTestingModule, DatePipe]
    }).compileComponents();

    fixture = TestBed.createComponent(SessionHistoryPage);
    component = fixture.componentInstance;
  });

  // 1️⃣ getSessionCount()
  it('should return the correct number of sessions', () => {
    expect(component.getSessionCount()).toBe(3);
  }); 

  // 2️⃣ getSessionByTask()
    it('should return the correct session by task name', () => {
    const result = component.getSessionByTask('CS Project');
    expect(result?.pomodoros).toBe(2);
  }); 

  // 3️⃣ hasLongSession()
   it('should detect if a long session exists', () => {
    const hasLong = component.hasLongSession(60);
    expect(hasLong).toBeTrue();    // 75 min exists
  }); 

  // 4️⃣ totalPomodoros()
   it('should correctly sum all pomodoros', () => {
    expect(component.totalPomodoros()).toBe(6);  
    // 3 + 2 + 1 = 6
  }); 
});
