import { Character, type CharacterInfo } from '../types/index.js';

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