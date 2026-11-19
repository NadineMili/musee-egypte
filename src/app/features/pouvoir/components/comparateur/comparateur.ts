import {
  Component,
  EventEmitter,
  Output,
  computed,
  signal
} from '@angular/core';

type Categorie = 'vivants' | 'dieux' | 'morts';

interface Carte {
  id: number;
  texte: string;
  categorie: Categorie;
  placee: boolean;
  erreurs: number;
  indice: string;
  explication: string;
}

interface Colonne {
  id: Categorie;
  titre: string;
}

@Component({
  selector: 'app-comparateur',
  standalone: true,
  imports: [],
  templateUrl: './comparateur.html',
  styleUrl: './comparateur.scss'
})
export class Comparateur {

  @Output() retour = new EventEmitter<void>();
  @Output() suivant = new EventEmitter<void>();

  colonnes: Colonne[] = [
    { id: 'vivants', titre: 'Les vivants' },
    { id: 'dieux', titre: 'Les dieux' },
    { id: 'morts', titre: 'Les morts' }
  ];

  cartes = signal<Carte[]>([
    {
      id: 1,
      texte: 'Maisons en brique crue',
      categorie: 'vivants',
      placee: true,
      erreurs: 0,
      indice: 'Pense aux matériaux utilisés pour les habitations.',
      explication: 'La brique est utilisée pour ce qui sert à vivre.'
    },
    {
      id: 2,
      texte: 'Grand pylône et cour à colonnes',
      categorie: 'dieux',
      placee: true,
      erreurs: 0,
      indice: 'Ces éléments appartiennent à un ensemble religieux.',
      explication: 'Les pylônes et les cours monumentales caractérisent les temples.'
    },
    {
      id: 3,
      texte: 'Procession d’Opet',
      categorie: 'dieux',
      placee: true,
      erreurs: 0,
      indice: 'Cette fête relie les temples de Karnak et de Louxor.',
      explication: 'La fête d’Opet est une procession religieuse.'
    },
    {
      id: 4,
      texte: 'Tombe taillée dans la falaise',
      categorie: 'morts',
      placee: true,
      erreurs: 0,
      indice: 'Cet espace est destiné à l’inhumation.',
      explication: 'Les tombes rupestres appartiennent à la ville des morts.'
    },
    {
      id: 5,
      texte: 'Ateliers, greniers, marché',
      categorie: 'vivants',
      placee: false,
      erreurs: 0,
      indice: 'Pense aux activités économiques et quotidiennes.',
      explication: 'Les habitants travaillent, stockent et échangent dans la ville des vivants.'
    },
    {
      id: 6,
      texte: 'Village des ouvriers (Deir el-Médineh)',
      categorie: 'vivants',
      placee: false,
      erreurs: 0,
      indice: 'Même sur la rive ouest, ce village est habité par des personnes vivantes.',
      explication: 'Correct. Ce village est sur la rive ouest, mais il est habité par des vivants.'
    },
    {
      id: 7,
      texte: 'Sanctuaire réservé aux prêtres',
      categorie: 'dieux',
      placee: false,
      erreurs: 0,
      indice: 'Le sanctuaire se trouve au cœur d’un temple.',
      explication: 'Le sanctuaire est un espace religieux dont l’accès est réservé.'
    },
    {
      id: 8,
      texte: 'Rive ouest, vallée désertique',
      categorie: 'morts',
      placee: false,
      erreurs: 0,
      indice: 'Pense aux nécropoles et aux tombes royales.',
      explication: 'Les vallées désertiques de la rive ouest abritent des nécropoles.'
    },
    {
      id: 9,
      texte: 'Temple de millions d’années au bord des champs',
      categorie: 'morts',
      placee: false,
      erreurs: 0,
      indice: 'Ce temple est lié au culte funéraire du roi.',
      explication: 'Les temples de millions d’années participent au culte funéraire royal.'
    }
  ]);

  carteSelectionnee = signal<number | null>(null);
  carteEnGlissement = signal<number | null>(null);

  message = signal('Correct. La brique est pour ce qui sert à vivre.');
  typeMessage = signal<'succes' | 'erreur' | 'information'>('succes');

  nombrePlacees = computed(
    () => this.cartes().filter(carte => carte.placee).length
  );

  termine = computed(
    () => this.nombrePlacees() === this.cartes().length
  );

  cartesDisponibles = computed(
    () => this.cartes().filter(carte => !carte.placee)
  );

  cartesDeColonne(categorie: Categorie): Carte[] {
    return this.cartes().filter(
      carte => carte.placee && carte.categorie === categorie
    );
  }

  selectionnerCarte(id: number): void {
    const carte = this.cartes().find(c => c.id === id);

    if (!carte || carte.placee) {
      return;
    }

    this.carteSelectionnee.set(id);

    this.message.set(
      `Carte sélectionnée : « ${carte.texte} ». Choisis maintenant une colonne.`
    );

    this.typeMessage.set('information');
  }

  commencerGlissement(event: DragEvent, id: number): void {
    const carte = this.cartes().find(c => c.id === id);

    if (!carte || carte.placee) {
      event.preventDefault();
      return;
    }

    this.carteEnGlissement.set(id);
    this.carteSelectionnee.set(id);

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', String(id));
    }
  }

  autoriserDepot(event: DragEvent): void {
    event.preventDefault();

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
  }

  deposerCarte(event: DragEvent, categorie: Categorie): void {
    event.preventDefault();

    const valeur = event.dataTransfer?.getData('text/plain');
    const id = valeur ? Number(valeur) : this.carteEnGlissement();

    if (id !== null && Number.isFinite(id)) {
      this.verifierCarte(id, categorie);
    }

    this.carteEnGlissement.set(null);
  }

  terminerGlissement(): void {
    this.carteEnGlissement.set(null);
  }

  choisirColonne(categorie: Categorie): void {
    const id = this.carteSelectionnee();

    if (id === null) {
      this.message.set('Sélectionne d’abord une carte à placer.');
      this.typeMessage.set('information');
      return;
    }

    this.verifierCarte(id, categorie);
  }

  verifierCarte(id: number, categorie: Categorie): void {
    const carte = this.cartes().find(c => c.id === id);

    if (!carte || carte.placee) {
      return;
    }

    if (carte.categorie === categorie) {
      this.cartes.update(cartes =>
        cartes.map(c =>
          c.id === id ? { ...c, placee: true } : c
        )
      );

      this.carteSelectionnee.set(null);
      this.message.set(carte.explication);
      this.typeMessage.set('succes');

      if (this.termine()) {
        this.message.set(
          'Bravo ! Les 9 cartes sont correctement placées. Tu peux consulter le tableau comparatif.'
        );
      }

      return;
    }

    const erreurs = carte.erreurs + 1;

    this.cartes.update(cartes =>
      cartes.map(c =>
        c.id === id ? { ...c, erreurs } : c
      )
    );

    const bonneColonne = this.colonnes.find(
      colonne => colonne.id === carte.categorie
    );

    if (erreurs >= 2) {
      this.message.set(
        `Ce n’est pas la bonne colonne. La bonne réponse est : ${bonneColonne?.titre}.`
      );
    } else {
      this.message.set(`Essaie encore ! Indice : ${carte.indice}`);
    }

    this.typeMessage.set('erreur');
  }

  afficherIndice(carte: Carte): string {
    if (carte.erreurs < 2) {
      return '';
    }

    return this.colonnes.find(
      colonne => colonne.id === carte.categorie
    )?.titre ?? '';
  }

  revenir(): void {
    this.retour.emit();
  }

  continuer(): void {
    if (this.termine()) {
      this.suivant.emit();
    }
  }
}
