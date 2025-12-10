import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './core/navbar/navbar';
import { Footer } from './core/footer/footer';
import { ParticlesBackground } from './core/particles-background/particles-background';
import { Contact } from './pages/contact/contact';
import { Projects } from './pages/projects/projects';
import { Home } from './pages/home/home';

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, ParticlesBackground, Contact, Projects, Home],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio-cristiam');
}
