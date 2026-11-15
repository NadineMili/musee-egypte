
import {
  ChangeDetectionStrategy,
  Component,
  output,
  signal
} from '@angular/core';

import { Introduction } from './components/introduction/introduction';
import { CarteNil } from './components/carte-nil/carte-nil';
import { AnimationNil } from './components/animation-nil/animation-nil';
import { Paysages } from './components/paysages/paysages';
import { QuizNil } from './components/quiz/quiz';
import { Conclusion } from './components/conclusion/conclusion';

type TerritoryScreen =
  | 'introduction'
  | 'carte'
  | 'animation'
  | 'paysages'
  | 'quiz'
  | 'conclusion';

@Component({
  selector: 'app-territoire',
  standalone: true,
  imports: [
    Introduction,
    CarteNil,
    AnimationNil,
    Paysages,
    QuizNil,
    Conclusion
  ],
  templateUrl: './territoire.html',
  styleUrl: './territoire.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Territoire {

  // Écran affiché actuellement
  readonly currentScreen =
    signal<TerritoryScreen>('introduction');

  // Score obtenu au quiz
  readonly quizScore = signal<number>(0);

  // Événement pour passer à l'étape 2
  readonly nextStepRequested = output<void>();

  // Navigation entre les écrans
  goTo(screen: TerritoryScreen): void {
    this.currentScreen.set(screen);

    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
  }

  // Récupérer le score et afficher la conclusion
  onQuizCompleted(score: number): void {
    this.quizScore.set(score);
    this.goTo('conclusion');
  }

  // Demander le passage à l'étape 2
  goToNextStep(): void {
    this.nextStepRequested.emit();
  }
}
