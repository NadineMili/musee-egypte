
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  output,
  signal
} from '@angular/core';

interface QuizQuestion {
  question: string;
  answers: string[];
  correctAnswer: number;
  explanation: string;
}

@Component({
  selector: 'app-quiz-nil',
  standalone: true,
  imports: [],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizNil {
  readonly Math = Math;
  readonly backRequested = output<void>();
  readonly nextRequested = output<number>();

  readonly questions: QuizQuestion[] = [
    {
      question:
        'Pourquoi les populations se concentrent-elles près du Nil ?',
      answers: [
        'Parce qu’il apporte eau et terres cultivables',
        'Parce que le désert est entièrement habitable'
      ],
      correctAnswer: 0,
      explanation:
        'Le Nil apporte l’eau et rend possible l’agriculture dans une région largement désertique.'
    },
    {
      question:
        'Que se passe-t-il après la crue ?',
      answers: [
        'Le limon enrichit les sols',
        'Le désert recouvre les champs'
      ],
      correctAnswer: 0,
      explanation:
        'Le retrait des eaux laisse des sédiments qui favorisent les cultures.'
    },
    {
      question:
        'Quelle relation résume l’étape ?',
      answers: [
        'Géographie → ressources → agriculture → implantations',
        'Désert → temples → ports maritimes'
      ],
      correctAnswer: 0,
      explanation:
        'Les ressources du territoire soutiennent l’agriculture et la concentration des établissements humains.'
    }
  ];

  readonly currentIndex = signal(0);
  readonly selectedAnswer = signal<number | null>(null);
  readonly score = signal(0);
  readonly finished = signal(false);

  readonly currentQuestion = computed(
    () => this.questions[this.currentIndex()]
  );

  readonly answered = computed(
    () => this.selectedAnswer() !== null
  );

  readonly isCorrect = computed(
    () =>
      this.selectedAnswer() ===
      this.currentQuestion().correctAnswer
  );

  readonly progress = computed(
    () => ((this.currentIndex() + 1) / this.questions.length) * 100
  );

  selectAnswer(index: number): void {
    if (this.answered() || this.finished()) {
      return;
    }

    this.selectedAnswer.set(index);

    if (index === this.currentQuestion().correctAnswer) {
      this.score.update(value => value + 1);
    }
  }

  nextQuestion(): void {
    if (!this.answered()) {
      return;
    }

    if (this.currentIndex() < this.questions.length - 1) {
      this.currentIndex.update(index => index + 1);
      this.selectedAnswer.set(null);
    } else {
      this.finished.set(true);
    }
  }

  restartQuiz(): void {
    this.currentIndex.set(0);
    this.selectedAnswer.set(null);
    this.score.set(0);
    this.finished.set(false);
  }

  continue(): void {
    if (this.finished()) {
      this.nextRequested.emit(this.score());
    }
  }
}
