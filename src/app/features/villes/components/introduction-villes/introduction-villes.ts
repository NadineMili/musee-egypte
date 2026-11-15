
import {
  ChangeDetectionStrategy,
  Component,
  output
} from '@angular/core';

@Component({
  selector: 'app-introduction-villes',
  standalone: true,
  imports: [],
  templateUrl: './introduction-villes.html',
  styleUrl: './introduction-villes.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IntroductionVilles {
  readonly startRequested = output<void>();
  readonly cityRequested =
    output<'memphis' | 'thebes' | 'amarna'>();

  readonly cities = [
    {
      id: 'memphis' as const,
      name: 'Memphis',
      subtitle: 'La ville du pouvoir',
      period: 'Vers 3100 av. J.-C.',
      icon: '𓂀',
      theme: 'memphis',
      description:
        'Découvrez comment une capitale concentre le pouvoir, l’administration et les échanges.'
    },
    {
      id: 'thebes' as const,
      name: 'Thèbes',
      subtitle: 'La ville des dieux',
      period: '1550–1070 av. J.-C.',
      icon: '☀',
      theme: 'thebes',
      description:
        'Explorez une ville où les temples et les monuments expriment la puissance religieuse.'
    },
    {
      id: 'amarna' as const,
      name: 'Amarna',
      subtitle: 'La ville planifiée',
      period: '1346–1332 av. J.-C.',
      icon: '𓇳',
      theme: 'amarna',
      description:
        'Comprenez comment Akhenaton a créé une capitale autour d’un nouveau projet religieux.'
    }
  ];
}
