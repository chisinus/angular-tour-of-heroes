import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../shared/hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  hero: Hero  = { id : 1, name : 'Windstorm'}
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService : HeroService, 
              private router : Router) { };

  getHeroes(): void {
      this.heroService.getHeroes().then(heroes=>this.heroes = heroes);
  }

  ngOnInit(): void {
      this.getHeroes();
  };

  onSelect(hero2: Hero): void {
    this.selectedHero = hero2;
  };

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }

    this.heroService.create(name)
        .then(hero => {
          this.heroes.push(hero);
          this.selectedHero = null;
        });
  }

  delete(hero: Hero): void {
    console.error(hero.name);
    this.heroService.delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h.id !== hero.id);
        if (this.selectedHero === hero) { this.selectedHero = null;};
      });
  }
}
