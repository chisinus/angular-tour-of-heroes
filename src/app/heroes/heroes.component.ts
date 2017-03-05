import { Component, OnInit } from '@angular/core';
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

  constructor(private heroService : HeroService) { };

  getHeroes(): void
  {
      this.heroService.getHeroes().then(heroes=>this.heroes = heroes);
  }

  ngOnInit(): void
  {
      this.getHeroes();
  };

  onSelect(hero2: Hero) : void {
    this.selectedHero = hero2;
  }
}
