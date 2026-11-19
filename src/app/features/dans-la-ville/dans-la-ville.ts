
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal
} from '@angular/core';

import { Habitations } from './components/habitations/habitations';
import { Habitants } from './components/habitants/habitants';

type Ville = 'memphis' | 'thebes' | 'amarna';

type Espace =
  | 'habitat'
  | 'circulation'
  | 'pouvoir'
  | 'religion'
  | 'administration';

type SousEcran = 'plan' | 'habitations' | 'habitants';

interface Zone {
  titre: string;
  question: string;
  fonction: string;
  description: string;
  decouvertes: string[];
}

interface PlanVille {
  nom: string;
  sousTitre: string;
  introduction: string;
  zones: Record<Espace, Zone>;
}

@Component({
  selector: 'app-dans-la-ville',
  standalone: true,
  imports: [Habitations, Habitants],
  templateUrl: './dans-la-ville.html',
  styleUrl: './dans-la-ville.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DansLaVille {

  readonly villes: Ville[] = [
    'memphis',
    'thebes',
    'amarna'
  ];

  readonly espaces: Espace[] = [
    'habitat',
    'circulation',
    'pouvoir',
    'religion',
    'administration'
  ];

  readonly ville = signal<Ville>('memphis');

  readonly espace = signal<Espace>('habitat');

  readonly sousEcran = signal<SousEcran>('plan');

  readonly plansVilles: Record<Ville, PlanVille> = {

    memphis: {
      nom: 'Memphis',
      sousTitre: 'La ville du pouvoir',
      introduction:
        'Découvrez comment la capitale égyptienne organisait les activités politiques, religieuses et quotidiennes.',

      zones: {
        habitat: {
          titre: 'Les habitations',
          question: 'Comment vivait-on dans la ville ?',
          fonction: 'Habiter et vivre ensemble',
          description:
            'À Memphis, les habitants vivaient dans des quartiers proches des lieux de travail, des marchés et des espaces religieux.',
          decouvertes: [
            'Les maisons en briques crues',
            'Les cours intérieures',
            'Les pièces de vie',
            'Les espaces de stockage',
            'La vie quotidienne des familles'
          ]
        },

        circulation: {
          titre: 'Les rues',
          question: 'Comment circulait-on ?',
          fonction: 'Circulation et échanges',
          description:
            'Les rues permettaient de relier les habitations, les espaces administratifs et les lieux religieux. Le Nil facilitait également le transport.',
          decouvertes: [
            'Les rues principales',
            'Les passages entre les maisons',
            'Les marchés',
            'Les déplacements à pied',
            'Les échanges par le Nil'
          ]
        },

        pouvoir: {
          titre: 'Les palais',
          question: 'Où se concentrait le pouvoir ?',
          fonction: 'Pouvoir royal',
          description:
            'Memphis était un important centre du pouvoir royal. Les espaces palatiaux et les bâtiments officiels participaient à la gestion du royaume.',
          decouvertes: [
            'Les espaces de réception',
            'Les salles officielles',
            'Les cours',
            'Les espaces réservés au pouvoir',
            'Les activités de la cour'
          ]
        },

        religion: {
          titre: 'Les temples',
          question: 'Quelle place occupait la religion ?',
          fonction: 'Religion et vie urbaine',
          description:
            'Le culte de Ptah occupait une place importante à Memphis. Les temples jouaient un rôle religieux, économique et symbolique.',
          decouvertes: [
            'Le temple de Ptah',
            'Les cours religieuses',
            'Les sanctuaires',
            'Les prêtres',
            'Les offrandes'
          ]
        },

        administration: {
          titre: 'Les espaces administratifs',
          question: 'Comment la ville était-elle gérée ?',
          fonction: 'Administration du royaume',
          description:
            'Les responsables administraient les ressources, les échanges et les activités du pouvoir royal.',
          decouvertes: [
            'Les bureaux des scribes',
            'Les archives',
            'Les réserves',
            'La gestion des ressources',
            'Les ateliers'
          ]
        }
      }
    },

    thebes: {
      nom: 'Thèbes',
      sousTitre: 'La ville des dieux',
      introduction:
        'Explorez une grande ville religieuse structurée par les temples, les quartiers et les activités liées au Nil.',

      zones: {
        habitat: {
          titre: 'Les habitations',
          question: 'Comment vivait-on à Thèbes ?',
          fonction: 'Vie quotidienne',
          description:
            'Les habitants vivaient dans des maisons et des quartiers liés aux activités artisanales, religieuses et commerciales.',
          decouvertes: [
            'Les maisons',
            'Les cours intérieures',
            'Les quartiers d’artisans',
            'La préparation des repas',
            'La vie familiale'
          ]
        },

        circulation: {
          titre: 'Les rues',
          question: 'Comment se déplaçait-on ?',
          fonction: 'Relier les quartiers et les temples',
          description:
            'Les voies de circulation reliaient les quartiers, les temples et les zones proches du Nil. Certaines voies servaient aux processions religieuses.',
          decouvertes: [
            'Les rues des quartiers',
            'Les voies processionnelles',
            'Les accès aux temples',
            'Les marchés',
            'Le transport fluvial'
          ]
        },

        pouvoir: {
          titre: 'Les palais',
          question: 'Où s’exerçait le pouvoir ?',
          fonction: 'Pouvoir royal et cérémoniel',
          description:
            'Les espaces royaux étaient associés aux fonctions politiques et aux cérémonies du pouvoir pharaonique.',
          decouvertes: [
            'Les résidences royales',
            'Les cours officielles',
            'Les espaces de réception',
            'Les cérémonies',
            'Les relations avec les temples'
          ]
        },

        religion: {
          titre: 'Les temples',
          question: 'Pourquoi les temples étaient-ils essentiels ?',
          fonction: 'Centre religieux majeur',
          description:
            'Thèbes était un centre religieux majeur, notamment grâce aux sanctuaires de Karnak et de Louxor dédiés principalement au culte d’Amon.',
          decouvertes: [
            'Le temple de Karnak',
            'Le temple de Louxor',
            'Les pylônes',
            'Les salles à colonnes',
            'Les sanctuaires'
          ]
        },

        administration: {
          titre: 'Les espaces administratifs',
          question: 'Qui organisait les activités ?',
          fonction: 'Gestion religieuse et économique',
          description:
            'Les administrations royales et les institutions religieuses organisaient les ressources, les travailleurs et les activités économiques.',
          decouvertes: [
            'Les scribes',
            'Les archives',
            'Les magasins',
            'Les ateliers',
            'La gestion des offrandes'
          ]
        }
      }
    },

    amarna: {
      nom: 'Amarna',
      sousTitre: 'La ville planifiée',
      introduction:
        'Découvrez la capitale créée sous Akhenaton, organisée autour d’un axe principal, de palais, de temples et de quartiers.',

      zones: {
        habitat: {
          titre: 'Les habitations',
          question: 'Comment vivait-on à Amarna ?',
          fonction: 'Organisation résidentielle',
          description:
            'Amarna comprenait des quartiers résidentiels, des maisons de tailles différentes et des espaces associés aux activités domestiques.',
          decouvertes: [
            'Les maisons familiales',
            'Les grandes résidences',
            'Les cours',
            'Les cuisines',
            'Les ateliers domestiques'
          ]
        },

        circulation: {
          titre: 'Les rues',
          question: 'Comment circulait-on dans la capitale ?',
          fonction: 'Organisation des déplacements',
          description:
            'Un axe principal reliait les grands ensembles officiels. Des voies secondaires desservaient les quartiers résidentiels.',
          decouvertes: [
            'La voie royale',
            'Les rues secondaires',
            'Les quartiers',
            'Les déplacements officiels',
            'Les accès aux bâtiments'
          ]
        },

        pouvoir: {
          titre: 'Les palais',
          question: 'Où se trouvait le pouvoir royal ?',
          fonction: 'Pouvoir du pharaon',
          description:
            'Les ensembles palatiaux occupaient une place importante dans la capitale d’Akhenaton.',
          decouvertes: [
            'Le Grand Palais',
            'Les cours royales',
            'Les espaces de réception',
            'Les bâtiments officiels',
            'Les cérémonies royales'
          ]
        },

        religion: {
          titre: 'Les temples',
          question: 'Quelle religion organisait la ville ?',
          fonction: 'Culte d’Aton',
          description:
            'Les temples d’Aton comprenaient de vastes espaces ouverts, permettant les cérémonies et les offrandes sous la lumière solaire.',
          decouvertes: [
            'Le Grand Temple d’Aton',
            'Les cours ouvertes',
            'Les autels',
            'Les espaces d’offrandes',
            'Le symbolisme solaire'
          ]
        },

        administration: {
          titre: 'Les espaces administratifs',
          question: 'Comment la capitale était-elle administrée ?',
          fonction: 'Gestion de la capitale',
          description:
            'Des bâtiments officiels accueillaient les activités administratives, les scribes et la gestion des ressources.',
          decouvertes: [
            'Les bureaux',
            'Les scribes',
            'Les archives',
            'Les réserves',
            'Les ateliers'
          ]
        }
      }
    }
  };

  readonly planActif = computed(
    () => this.plansVilles[this.ville()]
  );

  readonly espaceActif = computed(
    () => this.planActif().zones[this.espace()]
  );

  readonly titreVille = computed(
    () => this.planActif().nom
  );

  choisirVille(ville: Ville): void {
    this.ville.set(ville);
    this.espace.set('habitat');
    this.sousEcran.set('plan');
  }

  choisirEspace(espace: Espace): void {
    this.espace.set(espace);
  }

  espaceSelectionne(espace: Espace): boolean {
    return this.espace() === espace;
  }

  nomVille(ville: Ville): string {
    return this.plansVilles[ville].nom;
  }

  ouvrirHabitations(): void {
    this.sousEcran.set('habitations');
    this.remonterPage();
  }

  ouvrirHabitants(): void {
    this.sousEcran.set('habitants');
    this.remonterPage();
  }

  retourAuPlan(): void {
    this.sousEcran.set('plan');
    this.remonterPage();
  }

  retourAuxHabitations(): void {
    this.sousEcran.set('habitations');
    this.remonterPage();
  }

  private remonterPage(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
}
