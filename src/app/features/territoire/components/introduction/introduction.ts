
import {
  ChangeDetectionStrategy,
  Component,
  output,
} from '@angular/core';

@Component({
  selector: 'app-introduction',
  imports: [],
  templateUrl: './introduction.html',
  styleUrl: './introduction.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Introduction {
  readonly explore = output<void>();

  onExplore(): void {
    this.explore.emit();
  }
}
