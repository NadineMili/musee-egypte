
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  OnDestroy,
  OnInit,
  output,
  signal
} from '@angular/core';

interface AnimationPhase {
  title: string;
  description: string;
  start: number;
}

@Component({
  selector: 'app-animation-nil',
  standalone: true,
  imports: [],
  templateUrl: './animation-nil.html',
  styleUrl: './animation-nil.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimationNil implements OnInit, OnDestroy {

  readonly backRequested = output<void>();
  readonly nextRequested = output<void>();

  readonly duration = 15;
  readonly elapsed = signal(0);
  readonly playing = signal(false);

  private timer: ReturnType<typeof setInterval> | null = null;

  readonly phases: AnimationPhase[] = [
    {
      title: 'Le fleuve',
      description: 'Le Nil traverse le désert du sud vers le nord.',
      start: 0
    },
    {
      title: 'La crue',
      description: 'L’eau déborde sur la plaine inondable.',
      start: 3
    },
    {
      title: 'Les terres',
      description: 'Le limon enrichit progressivement les sols.',
      start: 6
    },
    {
      title: 'L’agriculture',
      description: 'Les champs et les canaux d’irrigation apparaissent.',
      start: 9
    },
    {
      title: 'Les habitats',
      description: 'Les villages se concentrent près des terres cultivées.',
      start: 12
    }
  ];

  readonly completed = computed(
    () => this.elapsed() >= this.duration
  );

  readonly progress = computed(
    () => (this.elapsed() / this.duration) * 100
  );

  readonly phaseIndex = computed(
    () => Math.min(
      Math.floor(this.elapsed() / 3),
      this.phases.length - 1
    )
  );

  readonly currentPhase = computed(
    () => this.phases[this.phaseIndex()]
  );

  readonly riverProgress = computed(
    () => Math.min(100, (this.elapsed() / 3) * 100)
  );

  ngOnInit(): void {
    this.play();
  }

  play(): void {
    if (this.playing() || this.completed()) {
      return;
    }

    this.playing.set(true);

    this.timer = setInterval(() => {
      this.elapsed.update(value =>
        Math.min(this.duration, Number((value + 0.1).toFixed(1)))
      );

      if (this.completed()) {
        this.pause();
      }
    }, 100);
  }

  pause(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }

    this.playing.set(false);
  }

  togglePlayback(): void {
    if (this.playing()) {
      this.pause();
    } else {
      this.play();
    }
  }

  replay(): void {
    this.pause();
    this.elapsed.set(0);
    this.play();
  }

  formatTime(seconds: number): string {
    return `${Math.floor(seconds)} s`;
  }

  ngOnDestroy(): void {
    this.pause();
  }
}
