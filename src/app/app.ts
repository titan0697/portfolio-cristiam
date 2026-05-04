import { Component, signal } from '@angular/core';
import { Navbar } from './core/navbar/navbar';
import { Footer } from './core/footer/footer';
import { Contact } from './pages/contact/contact';
import { Projects } from './pages/projects/projects';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Skill } from './pages/skill/skill';
import { language, toggleLanguage } from './i18n';

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, Contact, Projects, Home, About, Skill],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio-cristiam');
  readonly language = language;

  changeLanguage() {
    toggleLanguage();
  }
}
