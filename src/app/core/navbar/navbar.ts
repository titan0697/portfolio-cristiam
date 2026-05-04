import { Component, AfterViewInit } from '@angular/core';
import { language, t, toggleLanguage } from '../../i18n';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar implements AfterViewInit {
  readonly language = language;
  readonly t = t;

  ngAfterViewInit() {
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');

    if (menuBtn && navLinks) {
      menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
      });
    }

    // Agregar scroll suave a los enlaces
    const links = document.querySelectorAll<HTMLAnchorElement>('.nav-links a');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.dataset['target']; // <-- corregido aquí
        if (targetId) {
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  changeLanguage() {
    toggleLanguage();
  }
}
