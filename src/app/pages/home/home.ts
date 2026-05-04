import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { language, t } from '../../i18n';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  readonly language = language;
  readonly t = t;
}