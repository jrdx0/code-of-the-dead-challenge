// Core game types and interfaces

export const Character = {
  CATRINA: 'catrina',
  CALAVERA: 'calavera', 
  MARIACHI: 'mariachi'
} as const;

export type Character = typeof Character[keyof typeof Character];

export const GameResult = {
  PLAYER_WINS: 'player_wins',
  COMPUTER_WINS: 'computer_wins',
  TIE: 'tie'
} as const;

export type GameResult = typeof GameResult[keyof typeof GameResult];

export interface CharacterInfo {
  name: string;
  displayName: string;
  description: string;
  svgComponent: string;
  beats: Character;
}

export interface GameState {
  currentRound: number;
  playerScore: number;
  computerScore: number;
  gamePhase: 'selection' | 'revealing' | 'result' | 'calaberita';
  currentCalaverita: string | null;
  isLoading: boolean;
}

export interface GameEngine {
  playerChoice: Character | null;
  computerChoice: Character | null;
  gameResult: GameResult | null;
  playRound(playerSelection: Character): GameResult;
  resetGame(): void;
}

export interface CalaveritaContext {
  type: 'selection' | 'victory' | 'defeat';
  playerCharacter?: Character;
  computerCharacter?: Character;
  gameResult?: GameResult;
}

export interface MCPService {
  generateCalaverita(context: CalaveritaContext): Promise<string>;
  isAvailable(): Promise<boolean>;
}