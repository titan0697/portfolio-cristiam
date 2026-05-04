import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { language, t } from '../../i18n';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  readonly language = language;
  readonly t = t;

  projectList = [
    {
      title: {
        en: 'Judicial Process Manager',
        es: 'Gestor de Procesos Judiciales'
      },
      year: '2026',
      stack: ['Angular', 'Tailwind', 'PrimeNG', 'Firebase'],
      description: {
        en: 'A comprehensive system for managing administrative approvals and documentation flow for legal processes.',
        es: 'Sistema integral para gestionar aprobaciones administrativas y el flujo documental de procesos legales.'
      },
      img: 'assets/project1.jpg'
    },
    {
      title: {
        en: 'E-Commerce Platform',
        es: 'Plataforma de Comercio Electrónico'
      },
      year: '2025',
      stack: ['Angular', 'NgRx', 'GSAP', 'Stripe'],
      description: {
        en: 'Dynamic shopping experience with real-time inventory, smooth animations, and high-end glassmorphism UI.',
        es: 'Experiencia de compra dinámica con inventario en tiempo real, animaciones suaves y UI glassmorphism premium.'
      },
      img: 'assets/project2.jpg'
    },
    {
      title: {
        en: 'AI Portfolio Builder',
        es: 'Creador de Portafolios con IA'
      },
      year: '2024',
      stack: ['React', 'Next.js', 'OpenAI', 'PostgreSQL'],
      description: {
        en: 'Platform that helps developers generate stunning portfolios using generative AI for content and layout.',
        es: 'Plataforma que ayuda a desarrolladores a generar portafolios impactantes usando IA generativa para contenido y diseño.'
      },
      img: 'assets/project3.jpg'
    }
  ];
}