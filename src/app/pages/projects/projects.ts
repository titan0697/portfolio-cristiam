import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  projectList = [
    {
      title: 'Judicial Process Manager',
      year: '2026',
      stack: ['Angular', 'Tailwind', 'PrimeNG', 'Firebase'],
      description: 'A comprehensive system for managing administrative approvals and documentation flow for legal processes.',
      img: 'assets/project1.jpg'
    },
    {
      title: 'E-Commerce Platform',
      year: '2025',
      stack: ['Angular', 'NgRx', 'GSAP', 'Stripe'],
      description: 'Dynamic shopping experience with real-time inventory, smooth animations, and high-end glassmorphism UI.',
      img: 'assets/project2.jpg'
    },
    {
      title: 'AI Portfolio Builder',
      year: '2024',
      stack: ['React', 'Next.js', 'OpenAI', 'PostgreSQL'],
      description: 'Platform that helps developers generate stunning portfolios using generative AI for content and layout.',
      img: 'assets/project3.jpg'
    }
  ];
}