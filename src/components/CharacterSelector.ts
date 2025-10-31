/**
 * CharacterSelector Component
 * Handles character selection interface with pixel art SVGs
 * Includes click handlers and hover effects for player character selection
 */

import { Character } from '../types/index.js';
import { CHARACTERS } from '../constants/characters.js';
import { CatrinaSVG, CalaveraSVG, MariachiSVG } from './SVGCharacters.js';

export interface CharacterSelectorOptions {
  onCharacterSelect: (character: Character) => void;
  onCharacterHover?: (character: Character) => void;
  selectedCharacter?: Character | null;
  disabled?: boolean;
}

export class CharacterSelector {
  private container: HTMLElement;
  private options: CharacterSelectorOptions;
  private svgComponents: Record<Character, () => string>;

  constructor(container: HTMLElement, options: CharacterSelectorOptions) {
    this.container = container;
    this.options = options;
    this.svgComponents = {
      [Character.CATRINA]: CatrinaSVG,
      [Character.CALAVERA]: CalaveraSVG,
      [Character.MARIACHI]: MariachiSVG
    };
    
    this.render();
  }

  private render(): void {
    this.container.innerHTML = `
      <div class="character-selector">
        <h2 class="selector-title">Elige tu personaje</h2>
        <div class="character-grid">
          ${Object.values(Character).map(character => this.renderCharacterOption(character)).join('')}
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  private renderCharacterOption(character: Character): string {
    const characterInfo = CHARACTERS[character];
    const isSelected = this.options.selectedCharacter === character;
    const isDisabled = this.options.disabled || false;
    
    return `
      <div 
        class="character-option ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}"
        data-character="${character}"
        role="button"
        tabindex="${isDisabled ? -1 : 0}"
        aria-label="Seleccionar ${characterInfo.displayName}: ${characterInfo.description}"
      >
        <div class="character-svg-container">
          ${this.svgComponents[character]()}
        </div>
        <div class="character-info">
          <h3 class="character-name">${characterInfo.displayName}</h3>
          <p class="character-description">${characterInfo.description}</p>
        </div>
        <div class="selection-indicator">
          <div class="pixel-checkmark"></div>
        </div>
      </div>
    `;
  }

  private attachEventListeners(): void {
    const characterOptions = this.container.querySelectorAll('.character-option');
    
    characterOptions.forEach(option => {
      const characterElement = option as HTMLElement;
      const character = characterElement.dataset.character as Character;
      
      // Click handler
      characterElement.addEventListener('click', () => {
        if (!this.options.disabled && character) {
          this.selectCharacter(character);
        }
      });

      // Keyboard handler
      characterElement.addEventListener('keydown', (event) => {
        if ((event.key === 'Enter' || event.key === ' ') && !this.options.disabled && character) {
          event.preventDefault();
          this.selectCharacter(character);
        }
      });

      // Hover effects for visual feedback
      characterElement.addEventListener('mouseenter', () => {
        if (!this.options.disabled) {
          characterElement.classList.add('hover');
          
          // Trigger calaberita generation on hover
          if (this.options.onCharacterHover && character) {
            this.options.onCharacterHover(character);
          }
        }
      });

      characterElement.addEventListener('mouseleave', () => {
        characterElement.classList.remove('hover');
      });
    });
  }

  private selectCharacter(character: Character): void {
    // Update visual selection
    const allOptions = this.container.querySelectorAll('.character-option');
    allOptions.forEach(option => option.classList.remove('selected'));
    
    const selectedOption = this.container.querySelector(`[data-character="${character}"]`);
    selectedOption?.classList.add('selected');

    // Update internal state
    this.options.selectedCharacter = character;

    // Trigger callback
    this.options.onCharacterSelect(character);
  }

  public updateSelection(character: Character | null): void {
    this.options.selectedCharacter = character;
    
    const allOptions = this.container.querySelectorAll('.character-option');
    allOptions.forEach(option => option.classList.remove('selected'));
    
    if (character) {
      const selectedOption = this.container.querySelector(`[data-character="${character}"]`);
      selectedOption?.classList.add('selected');
    }
  }

  public setDisabled(disabled: boolean): void {
    this.options.disabled = disabled;
    
    const allOptions = this.container.querySelectorAll('.character-option');
    allOptions.forEach(option => {
      if (disabled) {
        option.classList.add('disabled');
        (option as HTMLElement).setAttribute('tabindex', '-1');
      } else {
        option.classList.remove('disabled');
        (option as HTMLElement).setAttribute('tabindex', '0');
      }
    });
  }

  public getSelectedCharacter(): Character | null {
    return this.options.selectedCharacter || null;
  }
}