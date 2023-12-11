import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../../services/characters/characters.service';
import { SpinnerService } from '../../services/spinner/spinner.service';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];

  constructor(
    private charactersService: CharactersService,
    private spinnerService: SpinnerService
  ) {
    this.charactersService.getFilteredCharacters().subscribe((characters) => {
      this.characters = characters;
    });
  }

  ngOnInit() {
    this.spinnerService.show();
    this.charactersService.getData().subscribe(() => {
      this.spinnerService.hide();
    });
  }
}
