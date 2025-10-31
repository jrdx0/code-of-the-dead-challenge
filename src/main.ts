import './style.css';
import { Character, GameResult, type CalaveritaContext } from './types/index.js';
import { CharacterSelector } from './components/CharacterSelector.js';
import { CalaveritaDisplay } from './components/CalaveritaDisplay.js';
import { GameResultComponent, type GameResultData } from './components/GameResult.js';
import { HelpButton } from './components/HelpButton.js';
import { HelpModal } from './components/HelpModal.js';
import { StreakDisplay, type StreakData } from './components/StreakDisplay.js';
import { GameEngine } from './services/GameEngine.js';
import { CalaveritaService } from './services/CalaveritaService.js';
import { getRandomFallbackCalaverita } from './constants/fallbacks.js';


/**
 * Main Game Interface
 * Integrates all components into a cohesive game experience
 * Handles game flow and component communication
 */
class DiaDeMuertosGame {
  private gameEngine: GameEngine;
  private calaveritaService: CalaveritaService;
  private characterSelector: CharacterSelector | null = null;
  private calaveritaDisplay: CalaveritaDisplay | null = null;
  private gameResult: GameResultComponent | null = null;
  private helpButton: HelpButton | null = null;
  private helpModal: HelpModal | null = null;
  private streakDisplay: StreakDisplay | null = null;
  
  private currentPhase: 'selection' | 'revealing' | 'result' = 'selection';
  private selectedCharacter: Character | null = null;

  constructor() {
    this.gameEngine = new GameEngine();
    this.calaveritaService = new CalaveritaService();
    
    this.initializeComponents();
    this.setupGameFlow();
  }

  private initializeComponents(): void {
    // Initialize Character Selector
    const characterSelectionContainer = document.getElementById('character-selection');
    if (characterSelectionContainer) {
      this.characterSelector = new CharacterSelector(characterSelectionContainer, {
        onCharacterSelect: (character: Character) => this.handleCharacterSelection(character),
        onCharacterHover: (character: Character) => this.handleCharacterHover(character),
        selectedCharacter: null,
        disabled: false
      });
    }

    // Initialize Calaverita Display
    const calaveritaContainer = document.getElementById('calaberita-display');
    if (calaveritaContainer) {
      this.calaveritaDisplay = new CalaveritaDisplay(calaveritaContainer, {
        autoGenerate: true,
        showLoadingAnimation: true,
        animationDuration: 2000
      });
    }

    // Initialize Game Result
    const gameResultContainer = document.getElementById('game-result');
    if (gameResultContainer) {
      this.gameResult = new GameResultComponent(gameResultContainer, {
        onPlayAgain: () => this.startNewRound(),
        onResetGame: () => this.resetGame(),
        onResetStats: () => this.resetAllStats(),
        showAnimations: true
      });
    }

    // Initialize Help Modal
    const helpModalContainer = document.getElementById('help-modal-container');
    if (helpModalContainer) {
      this.helpModal = new HelpModal(helpModalContainer, {
        onClose: () => {
          console.log('🎭 Modal de ayuda cerrado');
        }
      });
    }

    // Initialize Help Button
    const helpButtonContainer = document.getElementById('help-button-container');
    if (helpButtonContainer) {
      this.helpButton = new HelpButton(helpButtonContainer, {
        onClick: () => {
          console.log('🎭 Botón de ayuda presionado');
          this.helpModal?.show();
        }
      });
    }

    // Initialize Streak Display
    const streakContainer = document.getElementById('streak-display');
    if (streakContainer) {
      this.streakDisplay = new StreakDisplay(streakContainer, {
        showAnimations: true,
        onStreakAchieved: (level) => {
          console.log(`🔥 ¡Nuevo nivel de racha alcanzado: ${level.displayName}!`);
          // Aquí se podría mostrar una notificación especial
        }
      });
      
      // Show initial streak display with persistent data
      this.updateStreakDisplay();
    }
  }

  private setupGameFlow(): void {
    // Generate initial calaberita for selection phase
    this.generateSelectionCalaverita();
    
    // Update UI to reflect initial state
    this.updateGamePhase('selection');
    
    console.log('🎭 Día de los Muertos: Piedra, Papel o Tijeras - ¡Juego iniciado!');
  }

  private async handleCharacterSelection(character: Character): Promise<void> {
    if (this.currentPhase !== 'selection') return;
    
    this.selectedCharacter = character;
    
    // Scroll to calaberita section after a brief delay to let selection animation complete
    this.scrollToNextSection('calaberita-display', 500);
    
    this.updateGamePhase('revealing');
    
    // Disable character selector during game processing
    this.characterSelector?.setDisabled(true);
    
    // Generate calaberita for the selected character during selection
    await this.generateCharacterSelectionCalaverita(character);
    
    try {
      // Play the round
      const result = this.gameEngine.playRound(character);
      
      // Prepare result data
      const resultData: GameResultData = {
        playerChoice: character,
        computerChoice: this.gameEngine.computerChoice!,
        result: result,
        gameState: this.gameEngine.getGameState()
      };
      
      // Display result with animation delay and scroll to results
      setTimeout(() => {
        this.gameResult?.displayResult(resultData);
        this.updateGamePhase('result');
        
        // Update streak display
        this.updateStreakDisplay();
        
        // Scroll to appropriate section based on streak status
        const hasActiveStreak = this.gameEngine.hasActiveStreak();
        if (hasActiveStreak) {
          this.scrollToNextSection('streak-display', 600);
        } else {
          this.scrollToNextSection('game-result', 800);
        }
        
        // Generate victory/defeat calaberita if computer wins
        if (result === GameResult.COMPUTER_WINS) {
          this.generateVictoryCalaverita(character, this.gameEngine.computerChoice!);
        }
      }, 1000);
      
    } catch (error) {
      console.error('Error during game round:', error);
      this.characterSelector?.setDisabled(false);
      this.updateGamePhase('selection');
    }
  }

  private async generateSelectionCalaverita(): Promise<void> {
    if (!this.calaveritaDisplay) return;
    
    const context: CalaveritaContext = {
      type: 'selection'
    };
    
    try {
      await this.calaveritaDisplay.displayCalaverita(context);
    } catch (error) {
      console.warn('Failed to generate selection calaberita:', error);
    }
  }

  private async generateCharacterSelectionCalaverita(character: Character): Promise<void> {
    if (!this.calaveritaDisplay) return;
    
    const context: CalaveritaContext = {
      type: 'selection',
      playerCharacter: character
    };
    
    try {
      // Set loading state in game engine
      this.gameEngine.setLoading(true);
      
      // Generate calaberita specific to the selected character
      await this.calaveritaDisplay.displayCalaverita(context);
      
      console.log(`🎭 Calaberita generada para ${character}`);
    } catch (error) {
      console.warn('Failed to generate character selection calaberita:', error);
    } finally {
      // Clear loading state
      this.gameEngine.setLoading(false);
    }
  }

  private handleCharacterHover(character: Character): void {
    // Only generate calaberita on hover during selection phase
    if (this.currentPhase !== 'selection') return;
    
    // Generate calaberita for hovered character (fire and forget)
    this.generateCharacterHoverCalaverita(character);
  }

  private async generateCharacterHoverCalaverita(character: Character): Promise<void> {
    if (!this.calaveritaDisplay) return;
    
    const context: CalaveritaContext = {
      type: 'selection',
      playerCharacter: character
    };
    
    try {
      // Generate calaberita for the hovered character
      await this.calaveritaDisplay.displayCalaverita(context);
      
      console.log(`🎭 Calaberita de hover generada para ${character}`);
    } catch (error) {
      console.debug('Failed to generate hover calaberita (expected):', error);
    }
  }

  private async generateVictoryCalaverita(playerChoice: Character, computerChoice: Character): Promise<void> {
    const context: CalaveritaContext = {
      type: 'victory',
      playerCharacter: playerChoice,
      computerCharacter: computerChoice,
      gameResult: GameResult.COMPUTER_WINS
    };
    
    try {
      // Generate calaberita using the service
      const calaberita = await this.calaveritaService.generateCalaverita(context);
      
      // Display in both the main calaberita display and the game result
      setTimeout(() => {
        // Display in main calaberita area
        this.calaveritaDisplay?.displayCalaverita(context);
        
        // Display prominently in game result
        this.gameResult?.displayVictoryCalaverita(calaberita);
        
        console.log('🎭 Calaberita de victoria generada y mostrada');
      }, 2000);
      
    } catch (error) {
      console.warn('Failed to generate victory calaberita:', error);
      
      // Use fallback calaberita
      const fallbackCalaverita = this.getFallbackVictoryCalaverita(playerChoice, computerChoice);
      setTimeout(() => {
        this.gameResult?.displayVictoryCalaverita(fallbackCalaverita);
      }, 2000);
    }
  }

  private getFallbackVictoryCalaverita(playerChoice?: Character, computerChoice?: Character): string {
    return getRandomFallbackCalaverita('victory', playerChoice, computerChoice);
  }

  private startNewRound(): void {
    // Reset for new round
    this.selectedCharacter = null;
    this.updateGamePhase('selection');
    
    // Re-enable character selector
    this.characterSelector?.setDisabled(false);
    this.characterSelector?.updateSelection(null);
    
    // Generate new selection calaberita
    this.generateSelectionCalaverita();
    
    // Update streak display (in case streak was broken)
    this.updateStreakDisplay();
    
    // Scroll back to character selection for new round
    this.scrollToNextSection('character-selection', 200);
    
    console.log(`🎮 Nueva ronda iniciada - Ronda ${this.gameEngine.getCurrentRound() + 1}`);
  }

  private resetGame(): void {
    // Reset game engine
    this.gameEngine.resetGame();
    
    // Reset all components
    this.characterSelector?.updateSelection(null);
    this.characterSelector?.setDisabled(false);
    this.calaveritaDisplay?.clearDisplay();
    this.gameResult?.resetDisplay();
    this.streakDisplay?.reset();
    
    // Reset game state
    this.selectedCharacter = null;
    this.updateGamePhase('selection');
    
    // Generate initial calaberita
    this.generateSelectionCalaverita();
    
    // Update streak display to show reset state
    this.updateStreakDisplay();
    
    // Scroll back to the top/character selection
    this.scrollToNextSection('character-selection', 200);
    
    console.log('🔄 Juego reiniciado');
  }

  private updateGamePhase(phase: 'selection' | 'revealing' | 'result'): void {
    this.currentPhase = phase;
    
    // Update game engine phase
    this.gameEngine.setGamePhase(phase);
    
    // Add transition class for smooth animations
    const gameContainer = document.querySelector('.game-container') as HTMLElement;
    const appContainer = document.getElementById('app');
    
    if (gameContainer) {
      gameContainer.classList.add('transitioning');
      
      // Remove transition class after animation completes
      setTimeout(() => {
        gameContainer.classList.remove('transitioning');
      }, 800);
    }
    
    // Update UI classes for styling with smooth transition
    if (appContainer) {
      appContainer.className = `game-phase-${phase}`;
    }
    
    // Update component states based on phase with appropriate delays
    switch (phase) {
      case 'selection':
        setTimeout(() => {
          this.characterSelector?.setDisabled(false);
        }, 200);
        break;
      case 'revealing':
        this.characterSelector?.setDisabled(true);
        this.addPhaseTransitionEffect('revealing');
        break;
      case 'result':
        setTimeout(() => {
          this.characterSelector?.setDisabled(false);
        }, 400);
        this.addPhaseTransitionEffect('result');
        break;
    }
  }

  private addPhaseTransitionEffect(phase: 'revealing' | 'result'): void {
    const gameContainer = document.querySelector('.game-container') as HTMLElement;
    if (!gameContainer) return;
    
    // Add phase-specific transition effects
    if (phase === 'revealing') {
      // Highlight calaberita section during revealing phase
      const calaveritaSection = document.getElementById('calaberita-display');
      if (calaveritaSection) {
        calaveritaSection.style.transform = 'scale(1.02)';
        calaveritaSection.style.boxShadow = '0 0 25px rgba(241, 196, 15, 0.4)';
        
        setTimeout(() => {
          calaveritaSection.style.transform = '';
          calaveritaSection.style.boxShadow = '';
        }, 2000);
      }
    } else if (phase === 'result') {
      // Animate result section entrance
      const resultSection = document.getElementById('game-result');
      if (resultSection) {
        resultSection.style.animation = 'result-section-reveal 1s ease-out';
      }
    }
  }

  /**
   * Smoothly scrolls to the next section of the game
   * @param targetElementId - The ID of the element to scroll to
   * @param delay - Optional delay before scrolling (in milliseconds)
   */
  private scrollToNextSection(targetElementId: string, delay: number = 300): void {
    setTimeout(() => {
      const targetElement = document.getElementById(targetElementId);
      if (!targetElement) {
        console.warn(`Element with ID '${targetElementId}' not found for scrolling`);
        return;
      }

      // Calculate the optimal scroll position
      const headerHeight = document.querySelector('.game-header')?.clientHeight || 0;
      const viewportHeight = window.innerHeight;
      const elementHeight = targetElement.clientHeight;
      
      // Calculate offset to center the element in the viewport when possible
      let offset = headerHeight + 40; // Base padding
      
      // On smaller screens, use less offset to show more content
      if (viewportHeight < 800) {
        offset = headerHeight + 20;
      }
      
      // If the element is very tall, position it at the top instead of centering
      if (elementHeight > viewportHeight * 0.7) {
        offset = headerHeight + 10;
      }

      const elementPosition = targetElement.offsetTop - offset;
      
      // Ensure we don't scroll past the bottom of the page
      const maxScroll = document.documentElement.scrollHeight - viewportHeight;
      const finalPosition = Math.min(Math.max(0, elementPosition), maxScroll);
      
      // Smooth scroll to the target element
      window.scrollTo({
        top: finalPosition,
        behavior: 'smooth'
      });

      // Add a subtle highlight effect to the target section
      setTimeout(() => {
        this.addScrollHighlight(targetElement);
      }, 500); // Delay highlight until scroll is mostly complete
      
      console.log(`📜 Scroll automático a: ${targetElementId}`);
    }, delay);
  }

  /**
   * Adds a subtle highlight effect to the scrolled-to element
   * @param element - The element to highlight
   */
  private addScrollHighlight(element: HTMLElement): void {
    // Add highlight class
    element.classList.add('scroll-highlight');
    
    // Remove highlight after animation
    setTimeout(() => {
      element.classList.remove('scroll-highlight');
    }, 1500);
  }

  // Public methods for external control if needed
  public getCurrentPhase(): string {
    return this.currentPhase;
  }

  public getGameState() {
    return this.gameEngine.getGameState();
  }

  public getSelectedCharacter(): Character | null {
    return this.selectedCharacter;
  }

  public getHelpModal(): HelpModal | null {
    return this.helpModal;
  }

  public getHelpButton(): HelpButton | null {
    return this.helpButton;
  }

  /**
   * Resets all statistics and streak data
   */
  private resetAllStats(): void {
    // Reset all data in the game engine
    this.gameEngine.resetAllData();
    
    // Reset all components
    this.characterSelector?.updateSelection(null);
    this.characterSelector?.setDisabled(false);
    this.calaveritaDisplay?.clearDisplay();
    this.gameResult?.resetDisplay();
    this.streakDisplay?.reset();
    
    // Reset game state
    this.selectedCharacter = null;
    this.updateGamePhase('selection');
    
    // Generate initial calaberita
    this.generateSelectionCalaverita();
    
    // Update streak display to show reset state
    this.updateStreakDisplay();
    
    // Scroll back to character selection
    this.scrollToNextSection('character-selection', 200);
    
    console.log('🗑️ Todas las estadísticas han sido reiniciadas');
  }

  /**
   * Updates the streak display with current game state
   */
  private updateStreakDisplay(): void {
    if (!this.streakDisplay) return;

    const gameStats = this.gameEngine.getGameStats();
    const streakData: StreakData = {
      currentStreak: this.gameEngine.getCurrentStreak(),
      bestStreak: this.gameEngine.getBestStreak(),
      isActive: this.gameEngine.hasActiveStreak(),
      isNewLevel: this.gameEngine.isNewStreakLevel(),
      totalGames: gameStats.totalGamesPlayed,
      totalWins: gameStats.totalWins,
      winRate: gameStats.winRate
    };

    this.streakDisplay.updateStreak(streakData);

    // Log streak achievements
    if (streakData.isNewLevel && streakData.isActive) {
      const level = this.gameEngine.getCurrentStreakLevel();
      if (level) {
        console.log(`🔥 ¡Nuevo nivel de racha! ${level.displayName} - ${streakData.currentStreak} victorias seguidas`);
      }
    }
  }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎭 Día de los Muertos: Piedra, Papel o Tijeras - Iniciando juego...');
  
  try {
    // Create and start the game
    const game = new DiaDeMuertosGame();
    
    // Make game instance available globally for debugging
    (window as any).diaDeMuertosGame = game;
    
    console.log('✅ Juego inicializado correctamente');
  } catch (error) {
    console.error('❌ Error al inicializar el juego:', error);
    
    // Show error message to user
    const appContainer = document.getElementById('app');
    if (appContainer) {
      appContainer.innerHTML = `
        <div class="error-container">
          <h2>Error al cargar el juego</h2>
          <p>Ha ocurrido un error al inicializar el juego. Por favor, recarga la página.</p>
          <button onclick="window.location.reload()">Recargar Página</button>
        </div>
      `;
    }
  }
});
