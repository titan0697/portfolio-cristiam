import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { language, t } from '../../i18n';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  readonly language = language;
  readonly t = t;
}
