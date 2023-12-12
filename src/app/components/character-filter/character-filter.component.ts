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
  houses: string[] = ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff'];
  ageOrders: string[] = ['Crescente', 'Decrescente'];

  constructor(private charactersService: CharactersService) {
    this.charactersService.getCharacters().subscribe((characters) => {
      this.characters = characters;
    });
  }

  applyFilters(name: string, house: string, ageOrder: string) {
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
    if (ageOrder === 'Crescente') {
      filteredCharacters = filteredCharacters.sort((a, b) => {
        if (!a.dateOfBirth) return 1;
        if (!b.dateOfBirth) return -1;
        const aBirthDateParts = a.dateOfBirth
          .split('-')
          .map((part) => parseInt(part, 10));
        const aBirthDate = new Date(
          aBirthDateParts[2],
          aBirthDateParts[1] - 1,
          aBirthDateParts[0]
        );
        const bBirthDateParts = b.dateOfBirth
          .split('-')
          .map((part) => parseInt(part, 10));
        const bBirthDate = new Date(
          bBirthDateParts[2],
          bBirthDateParts[1] - 1,
          bBirthDateParts[0]
        );
        return bBirthDate.getTime() - aBirthDate.getTime();
      });
    }
    if (ageOrder === 'Decrescente') {
      filteredCharacters = filteredCharacters.sort((a, b) => {
        if (!a.dateOfBirth) return 1;
        if (!b.dateOfBirth) return -1;
        const aBirthDateParts = a.dateOfBirth
          .split('-')
          .map((part) => parseInt(part, 10));
        const aBirthDate = new Date(
          aBirthDateParts[2],
          aBirthDateParts[1] - 1,
          aBirthDateParts[0]
        );
        const bBirthDateParts = b.dateOfBirth
          .split('-')
          .map((part) => parseInt(part, 10));
        const bBirthDate = new Date(
          bBirthDateParts[2],
          bBirthDateParts[1] - 1,
          bBirthDateParts[0]
        );
        return aBirthDate.getTime() - bBirthDate.getTime();
      });
    }

    this.charactersService.setFilteredCharacters(filteredCharacters);
  }
}
