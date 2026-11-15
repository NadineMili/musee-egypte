
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  output,
  signal
} from '@angular/core';

type LandscapeId = 'kemet' | 'deshret';

interface Landscape {
  id: LandscapeId;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
}

@Component({
  selector: 'app-paysages',
  standalone: true,
  imports: [],
  templateUrl: './paysages.html',
  styleUrl: './paysages.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Paysages {

  readonly backRequested = output<void>();
  readonly nextRequested = output<void>();

  readonly landscapes: Landscape[] = [
    {
      id: 'kemet',
      title: 'KEMET',
      subtitle: 'TERRE NOIRE',
      description:
        'Terres fertiles associées aux dépôts de limon du Nil. Elles concentrent une grande partie des activités agricoles et des implantations.',
      image: '/images/territoire/kemet.jpg',
      alt: 'Paysage fertile et verdoyant de la vallée du Nil'
    },
    {
      id: 'deshret',
      title: 'DESHRET',
      subtitle: 'TERRE ROUGE',
      description:
        'Espaces désertiques qui entourent la vallée. Ils constituent aussi des espaces de ressources, de circulation et de nécropoles.',
      image: '/images/territoire/deshret.jpg',
      alt: 'Paysage désertique égyptien aux dunes rougeâtres'
    }
  ];

  readonly selectedLandscape =
    signal<LandscapeId | null>(null);

  readonly visitedLandscapes =
    signal<LandscapeId[]>([]);

  readonly selectedInfo = computed(() =>
    this.landscapes.find(
      landscape =>
        landscape.id === this.selectedLandscape()
    ) ?? null
  );

  readonly canContinue = computed(() =>
    this.visitedLandscapes().includes('kemet') &&
    this.visitedLandscapes().includes('deshret')
  );

  selectLandscape(id: LandscapeId): void {
    this.selectedLandscape.set(id);

    this.visitedLandscapes.update(visited =>
      visited.includes(id) ? visited : [...visited, id]
    );
  }

  isVisited(id: LandscapeId): boolean {
    return this.visitedLandscapes().includes(id);
  }

  continue(): void {
    if (this.canContinue()) {
      this.nextRequested.emit();
    }
  }
}
