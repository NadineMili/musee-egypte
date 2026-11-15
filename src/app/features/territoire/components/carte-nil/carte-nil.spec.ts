
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  computed,
  output,
  signal
} from '@angular/core';

type LayerId =
  | 'nil'
  | 'fertile'
  | 'desert'
  | 'agriculture'
  | 'implantations';

interface MapLayer {
  readonly id: LayerId;
  readonly label: string;
  readonly description: string;
  readonly color: string;
}

@Component({
  selector: 'app-carte-nil',
  standalone: true,
  imports: [],
  templateUrl: './carte-nil.html',
  styleUrl: './carte-nil.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarteNil implements OnDestroy {

  // Communication avec le composant Territoire
  readonly backRequested = output<void>();
  readonly animationRequested = output<void>();

  // Données des couches géographiques
  readonly layers: readonly MapLayer[] = [
    {
      id: 'nil',
      label: 'Le Nil, axe de vie',
      description:
        'Eau, terres fertiles et voies de circulation. Le Nil permet le développement des activités humaines.',
      color: '#65a9d0'
    },
    {
      id: 'fertile',
      label: 'Les terres fertiles',
      description:
        'La vallée et le delta du Nil constituent des espaces favorables aux cultures grâce aux dépôts de limon.',
      color: '#91bb72'
    },
    {
      id: 'desert',
      label: 'Les déserts',
      description:
        'Les déserts Libyque et Arabique encadrent la vallée du Nil et créent un contraste territorial visible.',
      color: '#d5a96a'
    },
    {
      id: 'agriculture',
      label: 'Les zones agricoles',
      description:
        'Les parcelles cultivées et les canaux d’irrigation se développent à proximité du fleuve.',
      color: '#568b4b'
    },
    {
      id: 'implantations',
      label: 'Les implantations humaines',
      description:
        'Les établissements humains se concentrent près de l’eau et des terres cultivables.',
      color: '#a34e2b'
    }
  ];

  // État de la carte
  readonly selectedLayer = signal<LayerId>('nil');

  readonly nilDiscovered = signal(false);

  readonly visibleLayers = signal<readonly LayerId[]>([
    'nil'
  ]);

  readonly isAnimating = signal(false);

  // Fiche explicative active
  readonly activeLayer = computed(() => {
    return this.layers.find(
      layer => layer.id === this.selectedLayer()
    ) ?? this.layers[0];
  });

  // Timers pour l'apparition progressive
  private timers: ReturnType<typeof setTimeout>[] = [];

  // Vérifier si une couche est visible
  isVisible(id: LayerId): boolean {
    return this.visibleLayers().includes(id);
  }

  // Sélectionner une couche
  selectLayer(id: LayerId): void {

    if (id !== 'nil' && !this.isVisible(id)) {
      return;
    }

    this.selectedLayer.set(id);
  }

  // Clic sur le Nil
  discoverNil(): void {

    if (this.nilDiscovered()) {
      this.selectedLayer.set('nil');
      return;
    }

    this.nilDiscovered.set(true);
    this.isAnimating.set(true);
    this.selectedLayer.set('nil');

    const sequence: LayerId[] = [
      'fertile',
      'desert',
      'agriculture',
      'implantations'
    ];

    sequence.forEach((layerId, index) => {

      const timer = setTimeout(() => {

        this.visibleLayers.update(current => [
          ...current,
          layerId
        ]);

        if (index === sequence.length - 1) {
          this.isAnimating.set(false);
        }

      }, (index + 1) * 500);

      this.timers.push(timer);
    });
  }

  // Recommencer l'exploration
  resetExploration(): void {

    this.clearTimers();

    this.selectedLayer.set('nil');
    this.nilDiscovered.set(false);
    this.isAnimating.set(false);
    this.visibleLayers.set(['nil']);
  }

  // Passer à l'écran suivant
  goToAnimation(): void {

    if (!this.nilDiscovered() || this.isAnimating()) {
      return;
    }

    this.animationRequested.emit();
  }

  // Nettoyage des timers
  private clearTimers(): void {
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers = [];
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }
}
