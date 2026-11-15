
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  OnDestroy,
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
  id: LayerId;
  label: string;
  description: string;
}

@Component({
  selector: 'app-carte-nil',
  standalone: true,
  imports: [],
  templateUrl: './carte-nil.html',
  styleUrls: ['./carte-nil.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarteNil implements OnDestroy {

  readonly backRequested = output<void>();
  readonly animationRequested = output<void>();

  readonly layers: MapLayer[] = [
    {
      id: 'nil',
      label: 'Le Nil, axe de vie',
      description:
        'Le Nil est le principal axe de vie de l’Égypte antique. Il fournit de l’eau, favorise l’agriculture et facilite les déplacements.'
    },
    {
      id: 'fertile',
      label: 'Les terres fertiles',
      description:
        'Les terres proches du Nil bénéficient des dépôts de limon apportés par les crues. Elles permettent le développement des cultures.'
    },
    {
      id: 'desert',
      label: 'Les déserts',
      description:
        'Les déserts entourent la vallée du Nil. Ils forment de vastes espaces arides qui contrastent avec les terres fertiles.'
    },
    {
      id: 'agriculture',
      label: 'Les zones agricoles',
      description:
        'Les habitants aménagent des champs et des canaux d’irrigation pour cultiver les terres proches du fleuve.'
    },
    {
      id: 'implantations',
      label: 'Les implantations humaines',
      description:
        'Les villages et les villes se développent près du Nil et des terres cultivables, à distance des zones les plus exposées aux crues.'
    }
  ];

  readonly nilDiscovered = signal(false);

  readonly selectedLayer = signal<LayerId>('nil');

  readonly isAnimating = signal(false);

  private revealTimer: ReturnType<typeof setTimeout> | null = null;

  private readonly revealedLayers =
    signal<LayerId[]>(['nil']);

  readonly activeLayer = computed(() => {
    return this.layers.find(
      layer => layer.id === this.selectedLayer()
    ) ?? this.layers[0];
  });

  // ASSOCIATION DES IMAGES : CONSERVÉE
  readonly currentMapImage = computed(() => {
    switch (this.selectedLayer()) {

      case 'fertile':
        return '/images/territoire/2.png';

      case 'agriculture':
        return '/images/territoire/1.png';

      case 'implantations':
        return '/images/territoire/3.png';

      case 'desert':
        return '/images/territoire/4.jpg';

      case 'nil':
      default:
        return '/images/territoire/nil.jpg';
    }
  });

  discoverNil(): void {
    if (this.nilDiscovered()) {
      return;
    }

    this.nilDiscovered.set(true);
    this.selectedLayer.set('nil');
    this.isAnimating.set(true);

    const order: LayerId[] = [
      'fertile',
      'desert',
      'agriculture',
      'implantations'
    ];

    let index = 0;

    const revealNext = (): void => {
      if (index >= order.length) {
        this.isAnimating.set(false);
        this.revealTimer = null;
        return;
      }

      const layer = order[index];

      this.revealedLayers.update(current => [
        ...current,
        layer
      ]);

      index++;

      this.revealTimer = setTimeout(revealNext, 500);
    };

    this.revealTimer = setTimeout(revealNext, 500);
  }

  isVisible(layer: LayerId): boolean {
    return this.revealedLayers().includes(layer);
  }

  selectLayer(layer: LayerId): void {
    if (
      !this.nilDiscovered() ||
      !this.isVisible(layer)
    ) {
      return;
    }

    this.selectedLayer.set(layer);
  }

  goToAnimation(): void {
    if (
      !this.nilDiscovered() ||
      this.isAnimating()
    ) {
      return;
    }

    this.animationRequested.emit();
  }

  ngOnDestroy(): void {
    if (this.revealTimer !== null) {
      clearTimeout(this.revealTimer);
      this.revealTimer = null;
    }
  }
}
