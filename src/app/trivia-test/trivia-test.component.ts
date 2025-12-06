import { Component, OnInit } from '@angular/core';
import { TriviaService } from '../services/trivia.service';
import { IonContent, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-trivia-test',
  templateUrl: './trivia-test.component.html',
  imports: [IonContent, IonButton]
})
export class TriviaTestComponent implements OnInit {
  question: any;

  constructor(private triviaService: TriviaService) {}

  ngOnInit() {
    this.loadTrivia();
  }

  loadTrivia() {
    this.question = this.triviaService.getRandomQuestion();
    console.log('Loaded question:', this.question);
  }
}