// Data model
export interface QuizQuestionModel {
    id?: string;
    topic: string;
    question: string;
    answer: string;
    wrongAnswers: string[];
}