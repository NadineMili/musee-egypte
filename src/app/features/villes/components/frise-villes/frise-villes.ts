
import {
  ChangeDetectionStrategy,
  Component,
  output
} from '@angular/core';

interface TimelineCity {
  id: string;
  name: string;
  period: string;
  description: string;
  image: string;
  alt: string;
}

@Component({
  selector: 'app-frise-villes',
  standalone: true,
  imports: [],
  templateUrl: './frise-villes.html',
  styleUrl: './frise-villes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FriseVilles {

  readonly backRequested = output<void>();
  readonly nextRequested = output<void>();

  readonly cities: TimelineCity[] = [
    {
      id: 'memphis',
      name: 'Memphis',
      period: 'Vers 3100 av. J.-C.',
      description: 'Unification et capitale.',
      image: '/images/territoire/Memphis.jpg',
      alt: 'Vestiges de Memphis en Égypte'
    },
    {
      id: 'thebes',
      name: 'Thèbes',
      period: '1550–1070 av. J.-C.',
      description: 'Apogée au Nouvel Empire.',
      image: '/images/territoire/Thebes.jpg',
      alt: 'Reconstitution de la ville de Thèbes'
    },
    {
      id: 'amarna',
      name: 'Amarna',
      period: '1346–1332 av. J.-C.',
      description: 'Capitale d’Akhenaton.',
      image: '/images/territoire/Amarna.jpg',
      alt: 'Reconstitution de la ville d’Amarna'
    }
  ];
}
