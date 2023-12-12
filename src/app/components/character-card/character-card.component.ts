import { Component, Input } from '@angular/core';
import { Character } from '../../models/character.model';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss',
})
export class CharacterCardComponent {
  @Input() character!: Character;

  constructor() {}

  calculateAge(dateOfBirth: string): string {
    const birthDateParts = dateOfBirth.split('-').map(part => parseInt(part, 10));
    const birthDate = new Date(birthDateParts[2], birthDateParts[1] - 1, birthDateParts[0]);
    const now = new Date();
    let age = now.getFullYear() - birthDate.getFullYear();
    const months = now.getMonth() - birthDate.getMonth();
    if (months < 0 || (months === 0 && now.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString();
  }
}
