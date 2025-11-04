import { Injectable } from '@angular/core';
import triviaData from '../../assets/trivia.json';

@Injectable({ providedIn: 'root' })
export class TriviaService {
  private trivia = triviaData;

  getRandomQuestion() {
    const randomIndex = Math.floor(Math.random() * this.trivia.length);
    return this.trivia[randomIndex];
  }
}