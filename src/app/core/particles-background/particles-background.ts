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
  private mouse = { x: -1000, y: -1000, prevX: -1000, prevY: -1000, speed: 0 }; // Posición inicial fuera del canvas

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // Escuchar el mouse
    window.addEventListener('mousemove', (e) => {
      this.mouse.prevX = this.mouse.x;
      this.mouse.prevY = this.mouse.y;
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      // Calcular velocidad del mouse
      if (this.mouse.prevX !== -1000) {
        const dx = this.mouse.x - this.mouse.prevX;
        const dy = this.mouse.y - this.mouse.prevY;
        this.mouse.speed = Math.hypot(dx, dy);
      }
    });
    window.addEventListener('mouseleave', () => {
      this.mouse.x = -1000; // Fuera de la pantalla
      this.mouse.y = -1000;
      this.mouse.speed = 0;
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
      // Movimiento más dinámico pero suave
      vx: (Math.random() - 0.5) * 1.0,
      vy: (Math.random() - 0.5) * 1.0,
      size: 8 + Math.random() * 8,
      color: '#FFFFFF',
      originalVx: 0,
      originalVy: 0
    }));
  }

  private animate() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar partículas
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Repulsión entre partículas
      for (let j = 0; j < this.particles.length; j++) {
        if (i !== j) {
          const other = this.particles[j];
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 0 && dist < 50) { // Radio de repulsión
            const force = (50 - dist) / 50 * 0.1; // Fuerza repulsiva
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }
      }

      // Atracción suave al centro para distribución
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const distToCenter = Math.hypot(p.x - centerX, p.y - centerY);
      if (distToCenter > 200) { // Si está lejos del centro, atraer suavemente
        const force = (distToCenter - 200) / 1000;
        p.vx -= (p.x - centerX) / distToCenter * force;
        p.vy -= (p.y - centerY) / distToCenter * force;
      }

      // Atracción inteligente al mouse (reducida)
      if (this.mouse.x !== -1000 && this.mouse.y !== -1000) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 100) { // Solo atraer si está lejos
          const baseForce = Math.min(0.2, 50 / dist);
          const speedMultiplier = 1 + this.mouse.speed * 0.005; // Reducido
          const force = baseForce * speedMultiplier;
          p.vx += (dx / dist) * force * 0.005;
          p.vy += (dy / dist) * force * 0.005;
        }
      }

      // Amortiguación para movimiento suave
      p.vx *= 0.98;
      p.vy *= 0.98;

      // Limitar velocidad máxima
      const maxSpeed = 2;
      const speed = Math.hypot(p.vx, p.vy);
      if (speed > maxSpeed) {
        p.vx = (p.vx / speed) * maxSpeed;
        p.vy = (p.vy / speed) * maxSpeed;
      }

      p.x += p.vx;
      p.y += p.vy;

      // Rebote en bordes con márgenes
      const margin = 20;
      if (p.x < margin || p.x > canvas.width - margin) {
        p.vx *= -0.8;
        p.x = Math.max(margin, Math.min(canvas.width - margin, p.x));
      }
      if (p.y < margin || p.y > canvas.height - margin) {
        p.vy *= -0.8;
        p.y = Math.max(margin, Math.min(canvas.height - margin, p.y));
      }

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
  originalVx?: number;
  originalVy?: number;
}
