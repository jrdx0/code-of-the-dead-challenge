import { Character, GameResult } from '../types/index.js';
import type { GameState, GameEngine as IGameEngine } from '../types/index.js';
import { compareCharacters, generateComputerChoice } from './GameLogic.js';
import { getStreakLevel, isNewStreakLevel } from '../constants/streaks.js';
import { StorageService, type StreakData as StoredStreakData } from './StorageService.js';

export class GameEngine implements IGameEngine {
  public playerChoice: Character | null = null;
  public computerChoice: Character | null = null;
  public gameResult: GameResult | null = null;
  
  private gameState: GameState;
  private persistentData: StoredStreakData;

  constructor() {
    // Load persistent data from localStorage
    this.persistentData = StorageService.loadStreakData();
    
    // Initialize game state with persistent streak data
    this.gameState = {
      currentRound: 0,
      playerScore: 0,
      computerScore: 0,
      gamePhase: 'selection',
      currentCalaverita: null,
      isLoading: false,
      currentStreak: this.persistentData.currentStreak,
      bestStreak: this.persistentData.bestStreak,
      streakType: this.persistentData.streakType
    };

    console.log('🎮 GameEngine inicializado con datos persistentes:', {
      currentStreak: this.persistentData.currentStreak,
      bestStreak: this.persistentData.bestStreak,
      totalGames: this.persistentData.totalGamesPlayed
    });
  }

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
    // Update round scores
    if (result === GameResult.PLAYER_WINS) {
      this.gameState.playerScore++;
    } else if (result === GameResult.COMPUTER_WINS) {
      this.gameState.computerScore++;
    }

    // Determine game result for storage
    let gameResultForStorage: 'win' | 'loss' | 'tie';
    let newStreak = 0;
    let newStreakType: 'player' | 'computer' | 'none' = 'none';
    let achievedLevel: string | undefined;

    if (result === GameResult.PLAYER_WINS) {
      gameResultForStorage = 'win';
      
      // Update player streak
      if (this.gameState.streakType === 'player') {
        newStreak = this.gameState.currentStreak + 1;
      } else {
        newStreak = 1;
      }
      newStreakType = 'player';
      
      // Check if new streak level achieved
      if (isNewStreakLevel(newStreak)) {
        const level = getStreakLevel(newStreak);
        if (level) {
          achievedLevel = level.name;
          console.log(`🏆 ¡Nuevo nivel de racha alcanzado: ${level.displayName}!`);
        }
      }
      
    } else if (result === GameResult.COMPUTER_WINS) {
      gameResultForStorage = 'loss';
      
      // Computer win breaks player streak
      if (this.gameState.streakType === 'computer') {
        newStreak = this.gameState.currentStreak + 1;
      } else {
        newStreak = 1;
      }
      newStreakType = 'computer';
      
    } else {
      gameResultForStorage = 'tie';
      // Tie breaks any streak
      newStreak = 0;
      newStreakType = 'none';
    }

    // Update persistent data and save to localStorage
    this.persistentData = StorageService.updateStreakData(
      this.persistentData,
      gameResultForStorage,
      newStreak,
      newStreakType,
      achievedLevel
    );

    // Update game state with new values
    this.gameState.currentStreak = this.persistentData.currentStreak;
    this.gameState.bestStreak = this.persistentData.bestStreak;
    this.gameState.streakType = this.persistentData.streakType;

    console.log('📊 Estadísticas actualizadas:', {
      result: gameResultForStorage,
      currentStreak: this.gameState.currentStreak,
      bestStreak: this.gameState.bestStreak,
      totalGames: this.persistentData.totalGamesPlayed
    });
  }

  /**
   * Resets the game to initial state (preserves persistent data)
   */
  resetGame(): void {
    this.playerChoice = null;
    this.computerChoice = null;
    this.gameResult = null;
    
    // Reset only the current game session, keep persistent streak data
    this.gameState = {
      currentRound: 0,
      playerScore: 0,
      computerScore: 0,
      gamePhase: 'selection',
      currentCalaverita: null,
      isLoading: false,
      currentStreak: this.persistentData.currentStreak,
      bestStreak: this.persistentData.bestStreak,
      streakType: this.persistentData.streakType
    };

    console.log('🔄 Juego reiniciado (datos persistentes conservados)');
  }

  /**
   * Completely resets all streak data (including persistent data)
   */
  resetAllData(): void {
    this.persistentData = StorageService.resetStreakData(true);
    
    this.gameState = {
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

    console.log('🗑️ Todos los datos de racha reiniciados');
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

  /**
   * Gets persistent game statistics
   */
  getGameStats() {
    return StorageService.getGameStats();
  }

  /**
   * Gets all persistent streak data
   */
  getPersistentData(): StoredStreakData {
    return { ...this.persistentData };
  }

  /**
   * Gets achieved streak levels
   */
  getAchievedLevels(): string[] {
    return [...this.persistentData.achievedLevels];
  }

  /**
   * Checks if a specific level has been achieved
   */
  hasAchievedLevel(levelName: string): boolean {
    return this.persistentData.achievedLevels.includes(levelName);
  }

  /**
   * Gets total games played
   */
  getTotalGamesPlayed(): number {
    return this.persistentData.totalGamesPlayed;
  }

  /**
   * Gets win rate percentage
   */
  getWinRate(): number {
    if (this.persistentData.totalGamesPlayed === 0) return 0;
    return Math.round((this.persistentData.totalWins / this.persistentData.totalGamesPlayed) * 100);
  }
}