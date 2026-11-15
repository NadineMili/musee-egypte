
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';

@Component({
  selector: 'app-conclusion',
  standalone: true,
  imports: [],
  templateUrl: './conclusion.html',
  styleUrl: './conclusion.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Conclusion {

  readonly score = input<number>(0);
  readonly totalQuestions = input<number>(3);

  readonly reviewRequested = output<void>();
  readonly nextRequested = output<void>();

}
