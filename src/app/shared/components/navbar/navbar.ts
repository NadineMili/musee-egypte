
import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import {
  RouterLink,
  RouterLinkActive,
} from '@angular/router';

interface NavigationItem {
  readonly label: string;
  readonly path: string;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {

  readonly navigation: readonly NavigationItem[] = [
    { label: '1 Territoire', path: '/etape-1' },
    { label: '2 Villes', path: '/etape-2' },
    { label: '3 Dans la ville', path: '/etape-3' },
    { label: '4 Pouvoir', path: '/etape-4' },
    { label: '5 Défi', path: '/etape-5' },
  ];

}
