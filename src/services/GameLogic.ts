import { Character, GameResult } from '../types/index.js';
import type { CharacterInfo } from '../types/index.js';

// Character information with game rules
export const CHARACTERS: Record<Character, CharacterInfo> = {
  [Character.CATRINA]: {
    name: 'catrina',
    displayName: 'La Catrina',
    description: 'Elegante dama de la muerte',
    svgComponent: 'CatrinaSVG',
    beats: Character.CALAVERA
  },
  [Character.CALAVERA]: {
    name: 'calavera',
    displayName: 'La Calavera',
    description: 'Cráneo festivo y colorido',
    svgComponent: 'CalaveraSVG',
    beats: Character.MARIACHI
  },
  [Character.MARIACHI]: {
    name: 'mariachi',
    displayName: 'El Mariachi Muerto',
    description: 'Músico del más allá',
    svgComponent: 'MariachiSVG',
    beats: Character.CATRINA
  }
};

/**
 * Determines the winner between two characters based on game rules
 * Catrina beats Calavera, Calavera beats Mariachi, Mariachi beats Catrina
 */
export function compareCharacters(player: Character, computer: Character): GameResult {
  if (player === computer) {
    return GameResult.TIE;
  }
  
  if (CHARACTERS[player].beats === computer) {
    return GameResult.PLAYER_WINS;
  }
  
  return GameResult.COMPUTER_WINS;
}

/**
 * Generates a random character choice for the computer
 */
export function generateComputerChoice(): Character {
  const characters = [Character.CATRINA, Character.CALAVERA, Character.MARIACHI];
  const randomIndex = Math.floor(Math.random() * characters.length);
  return characters[randomIndex];
}

/**
 * Validates if a given string is a valid character
 */
export function isValidCharacter(character: string): character is Character {
  return character === Character.CATRINA || 
         character === Character.CALAVERA || 
         character === Character.MARIACHI;
}