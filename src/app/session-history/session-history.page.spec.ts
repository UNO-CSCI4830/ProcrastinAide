import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SessionHistoryPage } from './session-history.page';

describe('SessionHistoryPage', () => {
  let component: SessionHistoryPage;
  let fixture: ComponentFixture<SessionHistoryPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SessionHistoryPage,
        RouterTestingModule,   // ✅ FIX
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SessionHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
