import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import triviaData from '../../../assets/trivia.json';
import { Router } from '@angular/router';

interface TriviaQuestion {
  question: string;
  answer: string;
  options: string[];
}

@Component({
  selector: 'app-trivia-test',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './trivia-test.component.html',
  styleUrls: ['./trivia-test.component.scss']
})
export class TriviaTestComponent implements OnInit, OnDestroy {

  questions: TriviaQuestion[] = triviaData;
  usedQuestions: TriviaQuestion[] = [];

  currentQuestion!: TriviaQuestion;
  feedback: string = '';
  showFeedback = false;

  breakTimeLeft: number = 0;   // seconds
  timer: any = null;

  constructor(private router: Router) {}

  ngOnInit() {
    // -------------------------------
    // RECEIVE BREAK TIME FROM POMODORO
    // -------------------------------
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras.state as { breakTime: number };

    this.breakTimeLeft = state?.breakTime ?? 60; // fallback 1 minute

    this.startBreakCountdown();
    this.loadQuestion();
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  // -------------------------------
  // BREAK TIMER COUNTDOWN LOGIC
  // -------------------------------
  startBreakCountdown() {
    this.timer = setInterval(() => {
      this.breakTimeLeft--;

      if (this.breakTimeLeft <= 0) {
        clearInterval(this.timer);
        alert("Break is over!");
        this.router.navigate(['/pomodoro']);
      }
    }, 1000);
  }

  get breakMinutes() {
    return Math.floor(this.breakTimeLeft / 60);
  }

  get breakSeconds() {
    const s = this.breakTimeLeft % 60;
    return s < 10 ? '0' + s : s;
  }

  // -------------------------------
  // RANDOM QUESTION LOGIC
  // -------------------------------
  loadQuestion() {
    this.showFeedback = false;
    this.feedback = '';

    if (this.usedQuestions.length === this.questions.length) {
      this.usedQuestions = [];
    }

    let q: TriviaQuestion;
    do {
      const r = Math.floor(Math.random() * this.questions.length);
      q = this.questions[r];
    } while (this.usedQuestions.includes(q));

    this.usedQuestions.push(q);

    this.currentQuestion = {
      ...q,
      options: [...q.options].sort(() => Math.random() - 0.5)
    };
  }

  selectOption(option: string) {
    this.feedback = option === this.currentQuestion.answer ? "Correct!" : "Incorrect!";
    this.showFeedback = true;

    setTimeout(() => this.loadQuestion(), 1000);
  }
}