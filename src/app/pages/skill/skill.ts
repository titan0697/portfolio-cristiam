import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCode, faDatabase, faPalette, faCogs, faSync, faBook, faCodeBranch, faTasks, faBullseye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './skill.html',
  styleUrl: './skill.scss',
})
export class Skill {
  constructor(library: FaIconLibrary) {
    library.addIcons(faCode, faDatabase, faPalette, faCogs, faSync, faBook, faCodeBranch, faTasks, faBullseye);
  }

  skills = [
    { name: 'Angular', level: 95, color: '#DD0031', icon: faCode },
    { name: 'TypeScript', level: 90, color: '#3178C6', icon: faCode },
    { name: 'JavaScript', level: 88, color: '#F7DF1E', icon: faCode },
    { name: 'RxJS', level: 85, color: '#B7178C', icon: faSync },
    { name: 'Tailwind CSS', level: 92, color: '#06B6D4', icon: faPalette },
    { name: 'SCSS', level: 90, color: '#CC6699', icon: faPalette },
    { name: 'PrimeNG', level: 80, color: '#D4AF37', icon: faBook },
    { name: 'Git', level: 88, color: '#F05032', icon: faCodeBranch },
    { name: 'Scrum', level: 85, color: '#6DB33F', icon: faTasks },
    { name: 'OKR Framework', level: 82, color: '#FF6B35', icon: faBullseye },
  ];

  getLevelDots(level: number): { filled: boolean }[] {
    const totalDots = 5;
    const filledDots = Math.round((level / 100) * totalDots);
    return Array.from({ length: totalDots }, (_, i) => ({ filled: i < filledDots }));
  }
}