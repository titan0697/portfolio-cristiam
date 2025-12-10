import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-particles-background',
  template: `<canvas #canvas></canvas>`,
  styles: [`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 0;
      pointer-events: none;
    }
    canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
  `]
})
export class ParticlesBackground implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private linksDistance = 150;
  private mouse = { x: -1000, y: -1000 }; // Posición inicial fuera del canvas

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // Escuchar el mouse
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
      this.mouse.x = -1000; // Fuera de la pantalla
      this.mouse.y = -1000;
    });

    this.initParticles(50);
    requestAnimationFrame(() => this.animate());
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private initParticles(count: number) {
    const canvas = this.canvasRef.nativeElement;
    this.particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      size: 10 + Math.random() * 10,
      color: '#FFFFFF'
    }));
  }

  private animate() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar partículas
    for (let p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }

    // Dibujar enlaces entre partículas
    const allParticles = [...this.particles, { x: this.mouse.x, y: this.mouse.y }]; // incluir mouse
    for (let i = 0; i < allParticles.length; i++) {
      for (let j = i + 1; j < allParticles.length; j++) {
        const p1 = allParticles[i];
        const p2 = allParticles[j];
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
        if (dist < this.linksDistance) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = '#37467bff';
          ctx.globalAlpha = 1 - dist / this.linksDistance;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}
