import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import gsap from 'gsap';
import { CommonModule } from '@angular/common';
import LeaderLine from 'leader-line-new';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit {

  @ViewChild('centerCircle') centerCircle!: ElementRef;
  @ViewChild('orbitArea') orbitArea!: ElementRef;

  nodes = [
    { id: 'projects', label: 'Projects', x: 80, y: 25, route: 'proyectos' },
    { id: 'about', label: 'About', x: 20, y: 20, route: '' },
    { id: 'contact', label: 'Contact', x: 80, y: 75, route: 'contacto' },
    { id: 'skills', label: 'Skills', x: 20, y: 75, route: '' }
  ];

  lines: any[] = [];

  ngAfterViewInit() {
    this.connectNodes();
  }

  connectNodes() {
    const center = this.centerCircle.nativeElement;

    this.lines = this.nodes.map(n => {
      const nodeEl = document.querySelector(`[data-id="${n.id}"]`) as HTMLElement;

      return new LeaderLine(
        center,
        nodeEl,
        {
          color: '#8A8F99',   // ← FLECHA BLANCA SIEMPRE POR DEFECTO
          size: 3,
          startPlug: 'disc',
          endPlug: 'arrow1',
          path: 'fluid'
        }
      );
    });
  }

  /** Hover con animación bonita */
  onHover(id: string) {
    const index = this.nodes.findIndex(n => n.id === id);
    if (index >= 0) {
      const line = this.lines[index];

      // ANIMACIÓN de la línea → blanco a naranja
      gsap.to(line, {
        duration: 0.3,
        onUpdate: () => {
          line.setOptions({
            color: "#5562EA",
            size: 5
          });
        }
      });
    }
  }

  /** Reset de todas las flechas a blanco */
  onLeave() {
    this.lines.forEach(line => {
      gsap.to(line, {
        duration: 0.3,
        onUpdate: () => {
          line.setOptions({
            color: "#8A8F99", 
            size: 3
          });
        }
      });
    });
  }


}