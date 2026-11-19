
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

export type ZoneHabitation =
  | 'pieces'
  | 'cour'
  | 'stockage'
  | 'terrasse';

interface DetailZone {
  titre: string;
  fonction: string;
  description: string;
}

@Component({
  selector: 'app-habitations',
  standalone: true,
  imports: [],
  templateUrl: './habitations.html',
  styleUrl: './habitations.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Habitations {

  @Input() ville: string = 'Memphis';

  @Output() retour = new EventEmitter<void>();

  @Output() voirHabitants = new EventEmitter<void>();

  zoneSelectionnee: ZoneHabitation = 'pieces';

  readonly zones: Record<ZoneHabitation, DetailZone> = {

    pieces: {
      titre: 'Pièces de vie',
      fonction: 'Habiter et vivre ensemble',
      description:
        'Les habitations constituent les unités fondamentales de la ville. ' +
        'Leur organisation répond aux besoins quotidiens des habitants ' +
        'et reflète parfois leur statut social.'
    },

    cour: {
      titre: 'Cour intérieure',
      fonction: 'Organiser la vie quotidienne',
      description:
        'La cour intérieure est un espace de circulation et de vie domestique. ' +
        'Elle permet de relier différentes parties de la maison ' +
        'et peut accueillir plusieurs activités quotidiennes.'
    },

    stockage: {
      titre: 'Espaces de stockage',
      fonction: 'Conserver les ressources',
      description:
        'Ces espaces servent à conserver les provisions, les céréales ' +
        'et les objets nécessaires au fonctionnement du foyer.'
    },

    terrasse: {
      titre: 'Terrasse et espaces domestiques',
      fonction: 'Utiliser les espaces complémentaires',
      description:
        'La terrasse et les espaces domestiques peuvent accueillir ' +
        'des activités complémentaires selon l’organisation de la maison.'
    }

  };

  get detailActif(): DetailZone {
    return this.zones[this.zoneSelectionnee];
  }

  selectionnerZone(zone: ZoneHabitation): void {
    this.zoneSelectionnee = zone;
  }

  estActive(zone: ZoneHabitation): boolean {
    return this.zoneSelectionnee === zone;
  }

  retourVueAerienne(): void {
    this.retour.emit();
  }

  ouvrirHabitants(): void {
    this.voirHabitants.emit();
  }
}
