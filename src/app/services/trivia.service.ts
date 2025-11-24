import { Injectable } from '@angular/core';
import triviaData from '../../assets/trivia.json';

@Injectable({ providedIn: 'root' })
export class TriviaService {
  private trivia = triviaData;

  // 1. Random question
  getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * this.trivia.length);
    return this.trivia[randomIndex];
  }

  // 2. Get question count
  getTotalQuestions(): number {
    return this.trivia.length;
  }

  // 3. Get question by index
  getQuestionByIndex(index: number) {
    return this.trivia[index];
  }

  // 4. Check if trivia exists
  hasTrivia(): boolean {
    return this.trivia.length > 0;
  }
}