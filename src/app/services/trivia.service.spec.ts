import { TestBed } from '@angular/core/testing';
import { TriviaService } from './trivia.service';

describe('TriviaService', () => {
  let service: TriviaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TriviaService]
    });

    service = TestBed.inject(TriviaService);

    // Mock trivia data for consistent tests
    (service as any).trivia = [
      { question: 'Q1', answer: 'A1' },
      { question: 'Q2', answer: 'A2' },
      { question: 'Q3', answer: 'A3' }
    ];
  });

  // --------------------------------------------------
  // 1. getRandomQuestion()
  // --------------------------------------------------
  it('should return one of the trivia items (getRandomQuestion)', () => {
    const result = service.getRandomQuestion();
    expect((service as any).trivia).toContain(result);
  });

  it('should return the correct item when Math.random is mocked', () => {
    spyOn(Math, 'random').and.returnValue(0.5); 
    const result = service.getRandomQuestion();
    expect(result).toEqual({ question: 'Q2', answer: 'A2' });
  });

  // --------------------------------------------------
  // 2. getTotalQuestions()
  // --------------------------------------------------
  it('should return the correct number of trivia questions (getTotalQuestions)', () => {
    const result = service.getTotalQuestions();
    expect(result).toBe(3);
  });

  // --------------------------------------------------
  // 3. getQuestionByIndex()
  // --------------------------------------------------
  it('should return the trivia item at a specific index (getQuestionByIndex)', () => {
    const result = service.getQuestionByIndex(1);
    expect(result).toEqual({ question: 'Q2', answer: 'A2' });
  });

  it('should return undefined for an invalid index (getQuestionByIndex)', () => {
    const result = service.getQuestionByIndex(99);
    expect(result).toBeUndefined();
  });

  // --------------------------------------------------
  // 4. hasTrivia()
  // --------------------------------------------------
  it('should return true when trivia list is not empty (hasTrivia)', () => {
    const result = service.hasTrivia();
    expect(result).toBeTrue();
  });

  it('should return false when trivia list is empty (hasTrivia)', () => {
    (service as any).trivia = [];
    const result = service.hasTrivia();
    expect(result).toBeFalse();
  });
});