
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { EgyptDecorations } from
    './shared/components/egypt-decorations/egypt-decorations';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, EgyptDecorations],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
