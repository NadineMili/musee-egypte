
import { Component, input, output, signal, computed } from '@angular/core';

type Profil = 'habitant' | 'artisan' | 'fonctionnaire' | 'pretre';

interface EtapeJournee {
  numero: number;
  lieu: string;
  description: string;
  accessible: boolean;
}

interface ProfilData {
  nom: string;
  introduction: string;
  etapes: EtapeJournee[];
}

@Component({
  selector: 'app-habitants',
  standalone: true,
  templateUrl: './habitants.html',
  styleUrl: './habitants.scss'
})
export class Habitants {
  ville = input<string>('Memphis');

  retour = output<void>();

  profilActif = signal<Profil>('artisan');

  readonly profils: { id: Profil; label: string }[] = [
    { id: 'habitant', label: 'Un habitant' },
    { id: 'artisan', label: 'Un artisan' },
    { id: 'fonctionnaire', label: 'Un fonctionnaire' },
    { id: 'pretre', label: 'Un prêtre' }
  ];

  readonly donnees: Record<Profil, ProfilData> = {
    habitant: {
      nom: 'Un habitant',
      introduction: 'Il organise sa journée autour de sa famille et des activités de la ville.',
      etapes: [
        {
          numero: 1,
          lieu: 'Quartier résidentiel',
          description: 'Il commence sa journée à la maison.',
          accessible: true
        },
        {
          numero: 2,
          lieu: 'Rue principale',
          description: 'Il se déplace vers les lieux d’échanges.',
          accessible: true
        },
        {
          numero: 3,
          lieu: 'Marché',
          description: 'Il échange ou achète des produits.',
          accessible: true
        },
        {
          numero: 4,
          lieu: 'Quartier résidentiel',
          description: 'Il retrouve sa famille.',
          accessible: true
        },
        {
          numero: 5,
          lieu: 'Palais royal',
          description: 'Les espaces du pouvoir restent généralement réservés.',
          accessible: false
        }
      ]
    },

    artisan: {
      nom: 'Un artisan',
      introduction: 'Il travaille pour les besoins de la ville.',
      etapes: [
        {
          numero: 1,
          lieu: 'Quartier résidentiel',
          description: 'Au lever du jour, il quitte sa maison modeste.',
          accessible: true
        },
        {
          numero: 2,
          lieu: 'Axe principal',
          description: 'Il emprunte les rues jusqu’à l’atelier.',
          accessible: true
        },
        {
          numero: 3,
          lieu: 'Ateliers',
          description: 'Il fabrique des objets, puis les met en réserve.',
          accessible: true
        },
        {
          numero: 4,
          lieu: 'Administration et réserves',
          description: 'Ses produits sont gérés et répartis par l’administration.',
          accessible: true
        },
        {
          numero: 5,
          lieu: 'Palais royal : accès limité',
          description: 'Il n’entre pas librement dans les espaces du pouvoir.',
          accessible: false
        }
      ]
    },

    fonctionnaire: {
      nom: 'Un fonctionnaire',
      introduction: 'Il participe à l’organisation et à la gestion de la ville.',
      etapes: [
        {
          numero: 1,
          lieu: 'Quartier résidentiel',
          description: 'Il quitte sa maison pour rejoindre son travail.',
          accessible: true
        },
        {
          numero: 2,
          lieu: 'Axe principal',
          description: 'Il traverse les voies de circulation.',
          accessible: true
        },
        {
          numero: 3,
          lieu: 'Administration',
          description: 'Il contrôle des documents et des ressources.',
          accessible: true
        },
        {
          numero: 4,
          lieu: 'Réserves',
          description: 'Il participe à la gestion des stocks.',
          accessible: true
        },
        {
          numero: 5,
          lieu: 'Sanctuaire',
          description: 'Certains espaces sacrés restent réservés aux personnes autorisées.',
          accessible: false
        }
      ]
    },

    pretre: {
      nom: 'Un prêtre',
      introduction: 'Il accomplit des activités liées au culte religieux.',
      etapes: [
        {
          numero: 1,
          lieu: 'Quartier résidentiel',
          description: 'Il se prépare pour ses activités religieuses.',
          accessible: true
        },
        {
          numero: 2,
          lieu: 'Axe principal',
          description: 'Il rejoint le secteur religieux.',
          accessible: true
        },
        {
          numero: 3,
          lieu: 'Temple',
          description: 'Il participe aux rites et aux offrandes.',
          accessible: true
        },
        {
          numero: 4,
          lieu: 'Réserves du temple',
          description: 'Il intervient dans les activités liées au culte.',
          accessible: true
        },
        {
          numero: 5,
          lieu: 'Palais royal',
          description: 'L’accès dépend de son rôle et de ses autorisations.',
          accessible: false
        }
      ]
    }
  };

  profilSelectionne = computed(
    () => this.donnees[this.profilActif()]
  );

  choisirProfil(profil: Profil): void {
    this.profilActif.set(profil);
  }

  lieuFrequent(lieu: string): boolean {
    const etapes = this.profilSelectionne().etapes;

    return etapes.some(
      e => e.accessible && e.lieu.toLowerCase().includes(lieu.toLowerCase())
    );
  }

  numeroLieu(lieu: string): number | null {
    const etape = this.profilSelectionne().etapes.find(
      e => e.accessible && e.lieu.toLowerCase().includes(lieu.toLowerCase())
    );

    return etape?.numero ?? null;
  }
}
