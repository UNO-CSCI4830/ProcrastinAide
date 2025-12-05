import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TriviaTestComponent } from './trivia-test.component';

describe('TriviaTestComponent', () => {
  let component: TriviaTestComponent;
  let fixture: ComponentFixture<TriviaTestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      // declarations: [ TriviaTestComponent ],
      imports: [IonicModule.forRoot(), TriviaTestComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(TriviaTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
