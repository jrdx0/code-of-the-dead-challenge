import { Character, GameResult } from '../types/index.js';
import type { GameState, GameEngine as IGameEngine } from '../types/index.js';
import { compareCharacters, generateComputerChoice } from './GameLogic.js';

export class GameEngine implements IGameEngine {
  public playerChoice: Character | null = null;
  public computerChoice: Character | null = null;
  public gameResult: GameResult | null = null;
  
  private gameState: GameState = {
    currentRound: 0,
    playerScore: 0,
    computerScore: 0,
    gamePhase: 'selection',
    currentCalaverita: null,
    isLoading: false
  };

  /**
   * Plays a round of the game with the player's selection
   */
  playRound(playerSelection: Character): GameResult {
    // Set player choice
    this.playerChoice = playerSelection;
    
    // Generate computer choice
    this.computerChoice = generateComputerChoice();
    
    // Determine game result
    this.gameResult = compareCharacters(playerSelection, this.computerChoice);
    
    // Update game state
    this.gameState.currentRound++;
    this.gameState.gamePhase = 'result';
    
    // Update scores
    if (this.gameResult === GameResult.PLAYER_WINS) {
      this.gameState.playerScore++;
    } else if (this.gameResult === GameResult.COMPUTER_WINS) {
      this.gameState.computerScore++;
    }
    
    return this.gameResult;
  }

  /**
   * Resets the game to initial state
   */
  resetGame(): void {
    this.playerChoice = null;
    this.computerChoice = null;
    this.gameResult = null;
    
    this.gameState = {
      currentRound: 0,
      playerScore: 0,
      computerScore: 0,
      gamePhase: 'selection',
      currentCalaverita: null,
      isLoading: false
    };
  }

  /**
   * Gets the current game state
   */
  getGameState(): GameState {
    return { ...this.gameState };
  }

  /**
   * Gets the current player score
   */
  getPlayerScore(): number {
    return this.gameState.playerScore;
  }

  /**
   * Gets the current computer score
   */
  getComputerScore(): number {
    return this.gameState.computerScore;
  }

  /**
   * Gets the current round number
   */
  getCurrentRound(): number {
    return this.gameState.currentRound;
  }

  /**
   * Sets the game phase
   */
  setGamePhase(phase: GameState['gamePhase']): void {
    this.gameState.gamePhase = phase;
  }

  /**
   * Sets the loading state
   */
  setLoading(isLoading: boolean): void {
    this.gameState.isLoading = isLoading;
  }

  /**
   * Sets the current calaberita
   */
  setCurrentCalaverita(calaberita: string | null): void {
    this.gameState.currentCalaverita = calaberita;
  }
}