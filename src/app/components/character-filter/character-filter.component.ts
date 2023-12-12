import { Component } from '@angular/core';
import { Character } from '../../models/character.model';
import { CharactersService } from '../../services/characters/characters.service';

@Component({
  selector: 'app-character-filter',
  templateUrl: './character-filter.component.html',
  styleUrl: './character-filter.component.scss',
})
export class CharacterFilterComponent {
  private characters: Character[] = [];
  houses: string[] = [
    'Gryffindor',
    'Slytherin',
    'Ravenclaw',
    'Hufflepuff',
  ];

  constructor(private charactersService: CharactersService) {
    this.charactersService.getCharacters().subscribe((characters) => {
      this.characters = characters;
    });
  }

  applyFilters(name: string, house: string) {
    let filteredCharacters = this.characters;
    if (name !== '') {
      filteredCharacters = filteredCharacters.filter((character) =>
        character.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    if (house) {
      filteredCharacters = filteredCharacters.filter(
        (character) => character.house === house
      );
    }

    this.charactersService.setFilteredCharacters(filteredCharacters);
  }
}
