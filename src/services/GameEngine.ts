import { Character, GameResult } from '../types/index.js';
import type { GameState, GameEngine as IGameEngine } from '../types/index.js';
import { compareCharacters, generateComputerChoice } from './GameLogic.js';
import { getStreakLevel, isNewStreakLevel } from '../constants/streaks.js';

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
    isLoading: false,
    currentStreak: 0,
    bestStreak: 0,
    streakType: 'none'
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
    
    // Update scores and streaks
    this.updateScoresAndStreaks(this.gameResult);
    
    return this.gameResult;
  }

  /**
   * Updates scores and streak system based on game result
   */
  private updateScoresAndStreaks(result: GameResult): void {
    if (result === GameResult.PLAYER_WINS) {
      this.gameState.playerScore++;
      
      // Update player streak
      if (this.gameState.streakType === 'player') {
        this.gameState.currentStreak++;
      } else {
        this.gameState.currentStreak = 1;
        this.gameState.streakType = 'player';
      }
      
      // Update best streak if current is higher
      if (this.gameState.currentStreak > this.gameState.bestStreak) {
        this.gameState.bestStreak = this.gameState.currentStreak;
      }
      
    } else if (result === GameResult.COMPUTER_WINS) {
      this.gameState.computerScore++;
      
      // Update computer streak (breaks player streak)
      if (this.gameState.streakType === 'computer') {
        this.gameState.currentStreak++;
      } else {
        this.gameState.currentStreak = 1;
        this.gameState.streakType = 'computer';
      }
      
    } else {
      // Tie breaks any streak
      this.gameState.currentStreak = 0;
      this.gameState.streakType = 'none';
    }
  }

  /**
   * Resets the game to initial state
   */
  resetGame(): void {
    this.playerChoice = null;
    this.computerChoice = null;
    this.gameResult = null;
    
    // Preserve best streak across game resets
    const bestStreak = this.gameState.bestStreak;
    
    this.gameState = {
      currentRound: 0,
      playerScore: 0,
      computerScore: 0,
      gamePhase: 'selection',
      currentCalaverita: null,
      isLoading: false,
      currentStreak: 0,
      bestStreak: bestStreak,
      streakType: 'none'
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

  /**
   * Gets the current player streak
   */
  getCurrentStreak(): number {
    return this.gameState.streakType === 'player' ? this.gameState.currentStreak : 0;
  }

  /**
   * Gets the best streak achieved
   */
  getBestStreak(): number {
    return this.gameState.bestStreak;
  }

  /**
   * Checks if the current result achieved a new streak level
   */
  isNewStreakLevel(): boolean {
    if (this.gameState.streakType !== 'player') return false;
    return isNewStreakLevel(this.gameState.currentStreak);
  }

  /**
   * Gets the current streak level information
   */
  getCurrentStreakLevel() {
    if (this.gameState.streakType !== 'player') return null;
    return getStreakLevel(this.gameState.currentStreak);
  }

  /**
   * Checks if player has an active streak
   */
  hasActiveStreak(): boolean {
    return this.gameState.streakType === 'player' && this.gameState.currentStreak > 0;
  }
}