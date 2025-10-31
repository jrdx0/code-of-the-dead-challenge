/**
 * StorageService
 * Handles persistent storage for game data using localStorage
 * Manages streak data, achievements, and game statistics
 */

export interface StreakData {
  currentStreak: number;
  bestStreak: number;
  streakType: 'player' | 'computer' | 'none';
  totalGamesPlayed: number;
  totalWins: number;
  totalLosses: number;
  totalTies: number;
  achievedLevels: string[];
  lastPlayedDate: string;
}

export interface GameStats {
  totalGamesPlayed: number;
  totalWins: number;
  totalLosses: number;
  totalTies: number;
  winRate: number;
  favoriteCharacter?: string;
  characterStats: Record<string, number>;
}

export class StorageService {
  private static readonly STORAGE_KEY = 'dia-de-muertos-game-data';
  private static readonly VERSION = '1.0.0';

  /**
   * Gets the default streak data structure
   */
  private static getDefaultStreakData(): StreakData {
    return {
      currentStreak: 0,
      bestStreak: 0,
      streakType: 'none',
      totalGamesPlayed: 0,
      totalWins: 0,
      totalLosses: 0,
      totalTies: 0,
      achievedLevels: [],
      lastPlayedDate: new Date().toISOString()
    };
  }

  /**
   * Checks if localStorage is available
   */
  private static isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Loads streak data from localStorage
   */
  public static loadStreakData(): StreakData {
    if (!this.isStorageAvailable()) {
      console.warn('localStorage not available, using default streak data');
      return this.getDefaultStreakData();
    }

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) {
        return this.getDefaultStreakData();
      }

      const data = JSON.parse(stored);
      
      // Validate data structure and migrate if necessary
      const validatedData = this.validateAndMigrateData(data);
      
      console.log('🎮 Datos de racha cargados desde localStorage:', validatedData);
      return validatedData;
      
    } catch (error) {
      console.error('Error loading streak data from localStorage:', error);
      return this.getDefaultStreakData();
    }
  }

  /**
   * Saves streak data to localStorage
   */
  public static saveStreakData(data: StreakData): void {
    if (!this.isStorageAvailable()) {
      console.warn('localStorage not available, cannot save streak data');
      return;
    }

    try {
      // Update last played date
      data.lastPlayedDate = new Date().toISOString();
      
      // Add version for future migrations
      const dataWithVersion = {
        ...data,
        version: this.VERSION
      };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(dataWithVersion));
      console.log('💾 Datos de racha guardados en localStorage');
      
    } catch (error) {
      console.error('Error saving streak data to localStorage:', error);
    }
  }

  /**
   * Validates and migrates data from older versions
   */
  private static validateAndMigrateData(data: any): StreakData {
    const defaultData = this.getDefaultStreakData();
    
    // If no version, assume it's old data and migrate
    if (!data.version) {
      console.log('🔄 Migrando datos de versión anterior');
      data = this.migrateFromV0(data);
    }

    // Ensure all required fields exist with proper types
    const validatedData: StreakData = {
      currentStreak: typeof data.currentStreak === 'number' ? data.currentStreak : defaultData.currentStreak,
      bestStreak: typeof data.bestStreak === 'number' ? data.bestStreak : defaultData.bestStreak,
      streakType: ['player', 'computer', 'none'].includes(data.streakType) ? data.streakType : defaultData.streakType,
      totalGamesPlayed: typeof data.totalGamesPlayed === 'number' ? data.totalGamesPlayed : defaultData.totalGamesPlayed,
      totalWins: typeof data.totalWins === 'number' ? data.totalWins : defaultData.totalWins,
      totalLosses: typeof data.totalLosses === 'number' ? data.totalLosses : defaultData.totalLosses,
      totalTies: typeof data.totalTies === 'number' ? data.totalTies : defaultData.totalTies,
      achievedLevels: Array.isArray(data.achievedLevels) ? data.achievedLevels : defaultData.achievedLevels,
      lastPlayedDate: typeof data.lastPlayedDate === 'string' ? data.lastPlayedDate : defaultData.lastPlayedDate
    };

    return validatedData;
  }

  /**
   * Migrates data from version 0 (no version field)
   */
  private static migrateFromV0(oldData: any): any {
    return {
      currentStreak: oldData.currentStreak || 0,
      bestStreak: oldData.bestStreak || 0,
      streakType: oldData.streakType || 'none',
      totalGamesPlayed: oldData.totalGamesPlayed || 0,
      totalWins: oldData.totalWins || 0,
      totalLosses: oldData.totalLosses || 0,
      totalTies: oldData.totalTies || 0,
      achievedLevels: oldData.achievedLevels || [],
      lastPlayedDate: new Date().toISOString(),
      version: this.VERSION
    };
  }

  /**
   * Updates streak data with new game result
   */
  public static updateStreakData(
    currentData: StreakData,
    gameResult: 'win' | 'loss' | 'tie',
    newStreak: number,
    streakType: 'player' | 'computer' | 'none',
    achievedLevel?: string
  ): StreakData {
    const updatedData: StreakData = {
      ...currentData,
      currentStreak: streakType === 'player' ? newStreak : 0,
      bestStreak: Math.max(currentData.bestStreak, streakType === 'player' ? newStreak : 0),
      streakType: streakType,
      totalGamesPlayed: currentData.totalGamesPlayed + 1,
      totalWins: currentData.totalWins + (gameResult === 'win' ? 1 : 0),
      totalLosses: currentData.totalLosses + (gameResult === 'loss' ? 1 : 0),
      totalTies: currentData.totalTies + (gameResult === 'tie' ? 1 : 0),
      achievedLevels: achievedLevel && !currentData.achievedLevels.includes(achievedLevel) 
        ? [...currentData.achievedLevels, achievedLevel]
        : currentData.achievedLevels,
      lastPlayedDate: new Date().toISOString()
    };

    // Save immediately after update
    this.saveStreakData(updatedData);
    
    return updatedData;
  }

  /**
   * Gets game statistics
   */
  public static getGameStats(): GameStats {
    const data = this.loadStreakData();
    
    const winRate = data.totalGamesPlayed > 0 
      ? Math.round((data.totalWins / data.totalGamesPlayed) * 100) 
      : 0;

    return {
      totalGamesPlayed: data.totalGamesPlayed,
      totalWins: data.totalWins,
      totalLosses: data.totalLosses,
      totalTies: data.totalTies,
      winRate: winRate,
      characterStats: {} // TODO: Implement character-specific stats
    };
  }

  /**
   * Resets all streak data (keeps total games stats)
   */
  public static resetStreakData(keepStats: boolean = true): StreakData {
    const currentData = this.loadStreakData();
    
    const resetData: StreakData = keepStats ? {
      currentStreak: 0,
      bestStreak: 0,
      streakType: 'none',
      totalGamesPlayed: currentData.totalGamesPlayed,
      totalWins: currentData.totalWins,
      totalLosses: currentData.totalLosses,
      totalTies: currentData.totalTies,
      achievedLevels: currentData.achievedLevels, // Keep achievements
      lastPlayedDate: new Date().toISOString()
    } : this.getDefaultStreakData();

    this.saveStreakData(resetData);
    console.log('🔄 Datos de racha reiniciados');
    
    return resetData;
  }

  /**
   * Completely clears all stored data
   */
  public static clearAllData(): void {
    if (!this.isStorageAvailable()) {
      return;
    }

    try {
      localStorage.removeItem(this.STORAGE_KEY);
      console.log('🗑️ Todos los datos eliminados del localStorage');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  /**
   * Exports data for backup
   */
  public static exportData(): string {
    const data = this.loadStreakData();
    return JSON.stringify(data, null, 2);
  }

  /**
   * Imports data from backup
   */
  public static importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      const validatedData = this.validateAndMigrateData(data);
      this.saveStreakData(validatedData);
      console.log('📥 Datos importados exitosamente');
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  /**
   * Gets storage usage information
   */
  public static getStorageInfo(): { used: number; available: boolean } {
    if (!this.isStorageAvailable()) {
      return { used: 0, available: false };
    }

    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      const used = data ? new Blob([data]).size : 0;
      return { used, available: true };
    } catch {
      return { used: 0, available: false };
    }
  }
}