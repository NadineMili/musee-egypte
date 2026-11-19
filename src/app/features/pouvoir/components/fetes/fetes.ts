
import {
  Component,
  EventEmitter,
  Output,
  OnDestroy,
  afterNextRender,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';

type TypeFete = 'opet' | 'vallee';

interface Fete {
  id: TypeFete;
  nom: string;
  description: string;
}

@Component({
  selector: 'app-fetes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fetes.html',
  styleUrl: './fetes.scss'
})
export class Fetes implements OnDestroy {

  @Output() retour = new EventEmitter<void>();
  @Output() suivant = new EventEmitter<void>();

  readonly fetes: Fete[] = [
    {
      id: 'opet',
      nom: "Fête d’Opet",
      description:
        "La statue d’Amon, de Mout et de Khonsou va de Karnak à Louxor, le long de l’avenue des sphinx. La fête renouvelle aussi le pouvoir du roi. La population suit la procession."
    },
    {
      id: 'vallee',
      nom: 'Belle Fête de la Vallée',
      description:
        "La statue d’Amon traverse le Nil et visite les temples funéraires. Les familles se rendent aux tombes de leurs proches."
    }
  ];

  readonly feteActive = signal<TypeFete>('opet');
  readonly progression = signal(0);
  readonly enCours = signal(false);
  readonly terminee = signal(false);

  private animationTimer: ReturnType<typeof setInterval> | null = null;
  private readonly dureeAnimation = 7000;
  private readonly intervalle = 40;

  constructor() {
    afterNextRender(() => {
      this.demarrerAnimation();
    });
  }

  get feteSelectionnee(): Fete {
    return this.fetes.find(
      fete => fete.id === this.feteActive()
    )!;
  }

  get progressionPourcentage(): number {
    return Math.round(this.progression() * 100);
  }

  get soleilPosition(): number {
    return 10 + this.progression() * 80;
  }

  // Coordonnées de la barque dans la carte.
  get positionBarqueX(): number {
    const p = this.progression();

    if (this.feteActive() === 'opet') {
      return 80;
    }

    // Traversée de la rive est vers la rive ouest.
    return 80 - p * 57;
  }

  get positionBarqueY(): number {
    const p = this.progression();

    if (this.feteActive() === 'opet') {
      return 27 + p * 63;
    }

    return 46 + p * 16;
  }

  get traceOpet(): number {
    return this.progression() * 100;
  }

  get traceVallee(): number {
    return this.progression() * 100;
  }

  choisirFete(type: TypeFete): void {
    this.feteActive.set(type);
    this.demarrerAnimation();
  }

  rejouer(): void {
    this.demarrerAnimation();
  }

  private arreterTimer(): void {
    if (this.animationTimer !== null) {
      clearInterval(this.animationTimer);
      this.animationTimer = null;
    }
  }

  demarrerAnimation(): void {
    this.arreterTimer();

    this.progression.set(0);
    this.terminee.set(false);
    this.enCours.set(true);

    const nombreEtapes =
      this.dureeAnimation / this.intervalle;

    let etape = 0;

    this.animationTimer = setInterval(() => {
      etape++;

      const valeur = Math.min(
        etape / nombreEtapes,
        1
      );

      this.progression.set(valeur);

      if (valeur >= 1) {
        this.arreterTimer();
        this.enCours.set(false);
        this.terminee.set(true);
      }
    }, this.intervalle);
  }

  allerComparateur(): void {
    this.arreterTimer();
    this.suivant.emit();
  }

  retourLecture(): void {
    this.arreterTimer();
    this.retour.emit();
  }

  ngOnDestroy(): void {
    this.arreterTimer();
  }
}
