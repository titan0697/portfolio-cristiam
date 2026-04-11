import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skill.html',
  styleUrl: './skill.scss',
})
export class Skill {
  skillCategories = [
    {
      name: 'Frontend Core',
      color: '#35c096', // Verde Esmeralda
      skills: ['Angular', 'TypeScript', 'JavaScript (ES6+)', 'RxJS']
    },
    {
      name: 'Styling & UI',
      color: '#c0357a', // Rosa/Uva
      skills: ['Tailwind CSS', 'SCSS', 'PrimeNG', 'Bento UI']
    },
    {
      name: 'Metodologías & Tools',
      color: '#357ac0', // Azul Tech
      skills: ['Scrum', 'OKR Framework', 'Git', 'Angular Material']
    }
  ];
}