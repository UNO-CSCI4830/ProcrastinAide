import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import triviaData from '../../../assets/trivia.json';

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
export class TriviaTestComponent implements OnInit {

  questions: TriviaQuestion[] = triviaData;
  currentIndex = 0;
  currentQuestion!: TriviaQuestion;
  feedback: string = '';
  showFeedback: boolean = false;

  ngOnInit() {
    this.loadQuestion();
  }

usedQuestions: TriviaQuestion[] = [];

  loadQuestion() {
  this.showFeedback = false;
  this.feedback = '';

  /*Reset deck if all questions used.*/
  if (this.usedQuestions.length === this.questions.length) {
    this.usedQuestions = [];
  }

  /*Keep randomly drawing question, until un-used question is selected.*/
  let q: TriviaQuestion;
  do {
    const randomIndex = Math.floor(Math.random() * this.questions.length);
    q = this.questions[randomIndex];
  } while (this.usedQuestions.includes(q));

  this.usedQuestions.push(q);

  this.currentQuestion = {
    ...q,
    options: [...q.options].sort(() => Math.random() - 0.5)
  };
}


  selectOption(option: string) {
    this.feedback = option === this.currentQuestion.answer
      ? "Correct!"
      : "Incorrect!";

    this.showFeedback = true;

    setTimeout(() => {
      this.currentIndex++;
      this.loadQuestion();
    }, 1000);
  }
}