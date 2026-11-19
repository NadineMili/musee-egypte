import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

export interface SignePouvoir {
  id: number;
  titre: string;
  sousTitre: string;
  explication: string;
  positionX: number;
  positionY: number;
}

@Component({
  selector: 'app-lire-pouvoir',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lire-pouvoir.html',
  styleUrl: './lire-pouvoir.scss'
})
export class LirePouvoir {

  @Output() retour = new EventEmitter<void>();
  @Output() suivant = new EventEmitter<void>();

  signes: SignePouvoir[] = [
    {
      id: 1,
      titre: "L’échelle",
      sousTitre: 'Pylônes, colosses, grandes salles',
      explication:
        'Les dimensions monumentales des pylônes, des statues et des grandes salles expriment la puissance du pharaon.',
      positionX: 7.5,
      positionY: 70
    },
    {
      id: 2,
      titre: 'Le matériau',
      sousTitre: 'Pierre pour durer, brique pour vivre',
      explication:
        'La pierre est utilisée pour les monuments destinés à durer, tandis que la brique sert souvent aux constructions quotidiennes.',
      positionX: 27.8,
      positionY: 75.5
    },
    {
      id: 3,
      titre: 'Axes et processions',
      sousTitre: 'Avenue des sphinx, voies sacrées',
      explication:
        'Les axes monumentaux organisent les déplacements et les processions religieuses. Ils mettent en scène le pouvoir.',
      positionX: 50,
      positionY: 91
    },
    {
      id: 4,
      titre: 'Images et textes',
      sousTitre: 'Scènes de victoire, titres, cartouches',
      explication:
        'Les murs sont des messages : le roi triomphe des ennemis et garde l’ordre (Maât) contre le chaos.',
      positionX: 78,
      positionY: 42.5
    },
    {
      id: 5,
      titre: "Contrôle de l’accès",
      sousTitre: "Enceintes, portes, fenêtre d’apparition",
      explication:
        'L’architecture contrôle les déplacements. Certaines portes et certains espaces sont réservés au roi, aux prêtres ou à des personnes autorisées.',
      positionX: 50,
      positionY: 65.5
    }
  ];

  signeActif: SignePouvoir | null = null;

  signesDecouverts = new Set<number>();

  get nombreDecouverts(): number {
    return this.signesDecouverts.size;
  }

  get progression(): number {
    return (this.nombreDecouverts / this.signes.length) * 100;
  }

  get peutContinuer(): boolean {
    return this.nombreDecouverts >= 3;
  }

  estDecouvert(id: number): boolean {
    return this.signesDecouverts.has(id);
  }

  selectionnerSigne(signe: SignePouvoir): void {
    this.signeActif = signe;
    this.signesDecouverts.add(signe.id);
  }

  fermerExplication(): void {
    this.signeActif = null;
  }

  retourTemple(): void {
    this.retour.emit();
  }

  continuer(): void {
    if (this.peutContinuer) {
      this.suivant.emit();
    }
  }
}
