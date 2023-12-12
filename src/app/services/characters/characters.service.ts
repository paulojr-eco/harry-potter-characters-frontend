import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Character } from '../../models/character.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  constructor(private http: HttpClient) {}

  private characters = new BehaviorSubject<Character[]>([]);
  private filteredCharacters = new BehaviorSubject<Character[]>([]);

  getData() {
    return this.http
      .get<Character[]>(`${environment.apiUrl}`, {
        observe: 'response',
      })
      .pipe(
        tap((response) => {
          this.characters.next(response.body || []);
          this.filteredCharacters.next(response.body || []);
        })
      );
  }

  setCharacters(characters: Character[]) {
    this.characters.next(characters);
  }

  getCharacters() {
    return this.characters.asObservable();
  }

  setFilteredCharacters(characters: Character[]) {
    this.filteredCharacters.next(characters);
  }

  getFilteredCharacters() {
    return this.filteredCharacters.asObservable();
  }
}
