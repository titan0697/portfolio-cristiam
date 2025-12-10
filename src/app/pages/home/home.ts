import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
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
  _raf: number = 0;
  @ViewChildren('nodeEl') nodeElements!: QueryList<ElementRef>;

  nodes = [
    { id: 'projects', label: 'Projects', x: 80, y: 25, route: 'proyectos' },
    { id: 'about', label: 'About', x: 20, y: 20, route: '' },
    { id: 'contact', label: 'Contact', x: 80, y: 75, route: 'contacto' },
    { id: 'skills', label: 'Skills', x: 20, y: 75, route: '' }
  ];

  lines: any[] = [];

  waitFrames(frames: number = 2): Promise<void> {
    return new Promise(resolve => {
      const step = () => {
        if (frames <= 0) resolve();
        else {
          frames--;
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    });
  }
  resizeTimer: any = null;

  ngAfterViewInit() {
    this.setResponsiveNodePositions();
    this.placeNodes();

    requestAnimationFrame(() => this.connectNodes());

    window.addEventListener('resize', () => {
      clearTimeout(this.resizeTimer);

      this.resizeTimer = setTimeout(async () => {
        this.setResponsiveNodePositions();
        this.placeNodes();
        await this.refreshLines();
      }, 150); 
    });
  }

connectNodes() {
  const center = this.centerCircle.nativeElement;

  this.lines = this.nodes.map(n => {
    const nodeEl = document.querySelector(`[data-id="${n.id}"]`) as HTMLElement;
    if (!nodeEl) return null; // evita undefined

    return new LeaderLine(center, nodeEl, {
      color: '#6B7A99',
      size: 3,
      startPlug: 'disc',
      endPlug: 'arrow1',
      path: 'fluid'
    });
  }).filter(Boolean); // elimina nulls
}


  onHover(id: string) {
    const index = this.nodes.findIndex(n => n.id === id);
    if (index >= 0) {
      const line = this.lines[index];

      gsap.to(line, {
        duration: 0.3,
        onUpdate: () => {
          line.setOptions({
            color: "#915e67ff",
            size: 5
          });
        }
      });
    }
  }

  onLeave() {
    this.lines.forEach(line => {
      gsap.to(line, {
        duration: 0.3,
        onUpdate: () => {
          line.setOptions({
            color: "#6B7A99",
            size: 3
          });
        }
      });
    });
  }

  setResponsiveNodePositions() {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      this.nodes[0].x = 15; this.nodes[0].y = 15;
      this.nodes[1].x = 55; this.nodes[1].y = 15;
      this.nodes[2].x = 15; this.nodes[2].y = 85;
      this.nodes[3].x = 55; this.nodes[3].y = 85;
    } else {
      this.nodes[0].x = 80; this.nodes[0].y = 25;
      this.nodes[1].x = 20; this.nodes[1].y = 20;
      this.nodes[2].x = 80; this.nodes[2].y = 75;
      this.nodes[3].x = 20; this.nodes[3].y = 75;
    }
  }

  placeNodes() {
    this.nodes.forEach(n => {
      const el = document.querySelector(`[data-id="${n.id}"]`) as HTMLElement;
      if (el) {
        el.style.left = `${n.x}%`;
        el.style.top = `${n.y}%`;
      }
    });
  }

  async refreshLines() {
    // 1. Eliminar todas las líneas visualmente
    this.lines.forEach(l => l.remove());
    this.lines = [];

    // 2. Esperar a que LeaderLine limpie sus SVG internos
    await this.waitFrames(4);

    // 3. Crear nuevas líneas
    this.connectNodes();

    // 4. Esperar a que Angular y el navegador terminen layout/reflow
    await this.waitFrames(4);

    // 5. Primer reposicionamiento
    this.lines.forEach(line => line.position());

    // 6. Esperar un frame más para asegurar repaint NO se interponga
    await this.waitFrames(4);

    // 7. Segundo reposicionamiento (esto arregla 100% el problema)
    this.lines.forEach(line => line.position());
  }


}