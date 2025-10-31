/**
 * GameResult Component
 * Displays game results showing player vs computer choices
 * Implements win/lose/tie result presentation with pixel art characters
 * Includes score tracking and round counter display
 */

import { Character, GameResult, type GameState } from '../types/index.js';
import { CHARACTERS } from '../constants/characters.js';
import { CatrinaSVG, CalaveraSVG, MariachiSVG } from './SVGCharacters.js';

export interface GameResultOptions {
  onPlayAgain?: () => void;
  onResetGame?: () => void;
  onResetStats?: () => void;
  showAnimations?: boolean;
}

export interface GameResultData {
  playerChoice: Character;
  computerChoice: Character;
  result: GameResult;
  gameState: GameState;
}

export class GameResultComponent {
  private container: HTMLElement;
  private options: GameResultOptions;
  private svgComponents: Record<Character, () => string>;
  private currentResult: GameResultData | null = null;

  constructor(container: HTMLElement, options: GameResultOptions = {}) {
    this.container = container;
    this.options = {
      showAnimations: true,
      ...options
    };
    this.svgComponents = {
      [Character.CATRINA]: CatrinaSVG,
      [Character.CALAVERA]: CalaveraSVG,
      [Character.MARIACHI]: MariachiSVG
    };
    
    this.render();
  }

  private render(): void {
    this.container.innerHTML = `
      <div class="game-result">
        <div class="result-header">
          <h2 class="result-title">Resultado del Duelo</h2>
          <div class="round-info">
            <span class="round-counter">Ronda: <span class="round-number">0</span></span>
          </div>
        </div>

        <div class="battle-display">
          <div class="player-section">
            <h3 class="section-title">Tu Elección</h3>
            <div class="character-display player-character">
              <div class="character-svg-wrapper">
                <!-- Player character SVG will be inserted here -->
              </div>
              <div class="character-label">
                <span class="character-name">Selecciona un personaje</span>
              </div>
            </div>
          </div>

          <div class="vs-section">
            <div class="vs-indicator">
              <span class="vs-text">VS</span>
              <div class="battle-effects">
                <span class="spark">✨</span>
                <span class="spark">⚡</span>
                <span class="spark">✨</span>
              </div>
            </div>
          </div>

          <div class="computer-section">
            <h3 class="section-title">Computadora</h3>
            <div class="character-display computer-character">
              <div class="character-svg-wrapper">
                <!-- Computer character SVG will be inserted here -->
              </div>
              <div class="character-label">
                <span class="character-name">???</span>
              </div>
            </div>
          </div>
        </div>

        <div class="result-announcement">
          <div class="result-message">
            <h3 class="result-text">¡Haz tu elección para comenzar!</h3>
            <p class="result-description">Selecciona tu personaje favorito del Día de los Muertos</p>
          </div>
          
          <div class="victory-calaberita-section" style="display: none;">
            <div class="calaberita-header">
              <h4 class="calaberita-title">Calaberita de la Victoria</h4>
              <div class="calaberita-decorations">
                <span class="decoration">💀</span>
                <span class="decoration">🌼</span>
                <span class="decoration">💀</span>
              </div>
            </div>
            <div class="calaberita-content">
              <div class="calaberita-text" role="region" aria-live="polite">
                <!-- Victory calaberita will be inserted here -->
              </div>
            </div>
          </div>
        </div>

        <div class="score-display">
          <div class="score-section">
            <div class="player-score">
              <span class="score-label">Jugador</span>
              <span class="score-value">0</span>
            </div>
            <div class="score-separator">-</div>
            <div class="computer-score">
              <span class="score-label">Computadora</span>
              <span class="score-value">0</span>
            </div>
          </div>
        </div>

        <div class="result-actions">
          <button class="play-again-button" disabled>
            🎮 Jugar de Nuevo
          </button>
          <button class="reset-game-button">
            🔄 Reiniciar Juego
          </button>
          <button class="reset-stats-button" title="Reiniciar todas las estadísticas y rachas">
            🗑️ Borrar Estadísticas
          </button>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    const playAgainButton = this.container.querySelector('.play-again-button') as HTMLButtonElement;
    const resetGameButton = this.container.querySelector('.reset-game-button') as HTMLButtonElement;
    const resetStatsButton = this.container.querySelector('.reset-stats-button') as HTMLButtonElement;

    if (playAgainButton && this.options.onPlayAgain) {
      playAgainButton.addEventListener('click', () => {
        // Add visual feedback for button click
        playAgainButton.style.transform = 'translateY(2px)';
        setTimeout(() => {
          playAgainButton.style.transform = '';
        }, 150);
        
        this.options.onPlayAgain?.();
      });
    }

    if (resetGameButton && this.options.onResetGame) {
      resetGameButton.addEventListener('click', () => {
        // Add visual feedback for button click
        resetGameButton.style.transform = 'translateY(2px)';
        setTimeout(() => {
          resetGameButton.style.transform = '';
        }, 150);
        
        this.options.onResetGame?.();
      });
    }

    if (resetStatsButton && this.options.onResetStats) {
      resetStatsButton.addEventListener('click', () => {
        // Confirm before resetting stats
        if (confirm('¿Estás seguro de que quieres borrar todas las estadísticas y rachas? Esta acción no se puede deshacer.')) {
          // Add visual feedback for button click
          resetStatsButton.style.transform = 'translateY(2px)';
          setTimeout(() => {
            resetStatsButton.style.transform = '';
          }, 150);
          
          this.options.onResetStats?.();
        }
      });
    }
  }

  public displayResult(resultData: GameResultData): void {
    this.currentResult = resultData;
    
    // Update round counter
    this.updateRoundCounter(resultData.gameState.currentRound);
    
    // Update character displays
    this.updatePlayerCharacter(resultData.playerChoice);
    this.updateComputerCharacter(resultData.computerChoice);
    
    // Update result message
    this.updateResultMessage(resultData.result, resultData.playerChoice, resultData.computerChoice);
    
    // Update scores
    this.updateScores(resultData.gameState.playerScore, resultData.gameState.computerScore);
    
    // Enable play again button
    this.enablePlayAgain();
    
    // Hide victory calaberita section initially
    this.hideVictoryCalaverita();
    
    // Trigger animations if enabled
    if (this.options.showAnimations) {
      this.playResultAnimations(resultData.result);
    }
  }

  private updateRoundCounter(round: number): void {
    const roundNumber = this.container.querySelector('.round-number') as HTMLElement;
    if (roundNumber) {
      roundNumber.textContent = round.toString();
    }
  }

  private updatePlayerCharacter(character: Character): void {
    const playerSection = this.container.querySelector('.player-character') as HTMLElement;
    const svgWrapper = playerSection.querySelector('.character-svg-wrapper') as HTMLElement;
    const characterName = playerSection.querySelector('.character-name') as HTMLElement;
    
    if (svgWrapper && characterName) {
      svgWrapper.innerHTML = this.svgComponents[character]();
      characterName.textContent = CHARACTERS[character].displayName;
      
      playerSection.classList.add('revealed');
      if (this.options.showAnimations) {
        playerSection.classList.add('animate-reveal');
      }
    }
  }

  private updateComputerCharacter(character: Character): void {
    const computerSection = this.container.querySelector('.computer-character') as HTMLElement;
    const svgWrapper = computerSection.querySelector('.character-svg-wrapper') as HTMLElement;
    const characterName = computerSection.querySelector('.character-name') as HTMLElement;
    
    if (svgWrapper && characterName) {
      // Add suspense delay for computer reveal with enhanced animation
      setTimeout(() => {
        svgWrapper.innerHTML = this.svgComponents[character]();
        characterName.textContent = CHARACTERS[character].displayName;
        
        computerSection.classList.add('revealed');
        if (this.options.showAnimations) {
          computerSection.classList.add('animate-reveal');
          
          // Add additional SVG animation
          const svg = svgWrapper.querySelector('svg');
          if (svg) {
            svg.style.animation = 'character-svg-reveal 1.2s ease-out';
          }
        }
      }, this.options.showAnimations ? 1200 : 0);
    }
  }

  private updateResultMessage(result: GameResult, playerChoice: Character, computerChoice: Character): void {
    const resultText = this.container.querySelector('.result-text') as HTMLElement;
    const resultDescription = this.container.querySelector('.result-description') as HTMLElement;
    const resultMessage = this.container.querySelector('.result-message') as HTMLElement;
    
    if (!resultText || !resultDescription || !resultMessage) return;

    let message: string;
    let description: string;
    let messageClass: string;

    switch (result) {
      case GameResult.PLAYER_WINS:
        message = '¡Felicidades! ¡Has Ganado!';
        description = `${CHARACTERS[playerChoice].displayName} vence a ${CHARACTERS[computerChoice].displayName}`;
        messageClass = 'victory';
        break;
      
      case GameResult.COMPUTER_WINS:
        message = '¡La Computadora Gana!';
        description = `${CHARACTERS[computerChoice].displayName} vence a ${CHARACTERS[playerChoice].displayName}`;
        messageClass = 'defeat';
        break;
      
      case GameResult.TIE:
        message = '¡Es un Empate!';
        description = `Ambos eligieron ${CHARACTERS[playerChoice].displayName}`;
        messageClass = 'tie';
        break;
      
      default:
        message = 'Resultado Desconocido';
        description = 'Algo salió mal...';
        messageClass = 'unknown';
    }

    resultText.textContent = message;
    resultDescription.textContent = description;
    
    // Update result styling
    resultMessage.className = `result-message ${messageClass}`;
  }

  private updateScores(playerScore: number, computerScore: number): void {
    const playerScoreElement = this.container.querySelector('.player-score .score-value') as HTMLElement;
    const computerScoreElement = this.container.querySelector('.computer-score .score-value') as HTMLElement;
    
    if (playerScoreElement) {
      playerScoreElement.textContent = playerScore.toString();
    }
    
    if (computerScoreElement) {
      computerScoreElement.textContent = computerScore.toString();
    }
  }

  private enablePlayAgain(): void {
    const playAgainButton = this.container.querySelector('.play-again-button') as HTMLButtonElement;
    if (playAgainButton) {
      playAgainButton.disabled = false;
    }
  }

  private playResultAnimations(result: GameResult): void {
    const battleDisplay = this.container.querySelector('.battle-display') as HTMLElement;
    const vsSection = this.container.querySelector('.vs-section') as HTMLElement;
    
    // Start battle animation immediately
    if (battleDisplay) {
      battleDisplay.classList.add('battle-animation');
    }
    
    if (vsSection) {
      vsSection.classList.add('battle-active');
    }

    // Add result-specific animations with proper timing
    setTimeout(() => {
      const resultMessage = this.container.querySelector('.result-message') as HTMLElement;
      if (resultMessage) {
        resultMessage.classList.add('animate-result');
        
        // Add result-specific celebration effects
        if (result === GameResult.PLAYER_WINS) {
          this.triggerVictoryCelebration();
        } else if (result === GameResult.COMPUTER_WINS) {
          this.triggerDefeatAnimation();
        } else if (result === GameResult.TIE) {
          this.triggerTieAnimation();
        }
      }
    }, 2000);
  }

  private triggerVictoryCelebration(): void {
    // Add victory sparkles around the player section
    const playerSection = this.container.querySelector('.player-section') as HTMLElement;
    if (playerSection) {
      this.addCelebrationSparkles(playerSection);
    }
    
    // Enhance VS section for victory
    const vsIndicator = this.container.querySelector('.vs-indicator') as HTMLElement;
    if (vsIndicator) {
      vsIndicator.style.background = 'linear-gradient(45deg, var(--accent-gold), var(--primary-orange))';
      vsIndicator.style.animation = 'victory-celebration 2s ease-in-out';
    }
  }

  private triggerDefeatAnimation(): void {
    // Add subtle shake to player section
    const playerSection = this.container.querySelector('.player-section') as HTMLElement;
    if (playerSection) {
      playerSection.style.animation = 'defeat-shake 1s ease-in-out';
    }
    
    // Enhance computer section for victory
    const computerSection = this.container.querySelector('.computer-section') as HTMLElement;
    if (computerSection) {
      this.addCelebrationSparkles(computerSection);
    }
  }

  private triggerTieAnimation(): void {
    // Add bounce to both sections
    const playerSection = this.container.querySelector('.player-section') as HTMLElement;
    const computerSection = this.container.querySelector('.computer-section') as HTMLElement;
    
    if (playerSection) {
      playerSection.style.animation = 'tie-bounce 1.5s ease-in-out';
    }
    
    if (computerSection) {
      computerSection.style.animation = 'tie-bounce 1.5s ease-in-out 0.2s';
    }
  }

  private addCelebrationSparkles(element: HTMLElement): void {
    // Create temporary sparkle elements
    for (let i = 0; i < 6; i++) {
      const sparkle = document.createElement('div');
      sparkle.innerHTML = ['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)];
      sparkle.style.position = 'absolute';
      sparkle.style.fontSize = '1.2rem';
      sparkle.style.pointerEvents = 'none';
      sparkle.style.zIndex = '1000';
      sparkle.style.animation = `celebration-sparkle 2s ease-out ${i * 0.2}s`;
      
      // Random position around the element
      const rect = element.getBoundingClientRect();
      sparkle.style.left = `${Math.random() * rect.width}px`;
      sparkle.style.top = `${Math.random() * rect.height}px`;
      
      element.style.position = 'relative';
      element.appendChild(sparkle);
      
      // Remove sparkle after animation
      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.parentNode.removeChild(sparkle);
        }
      }, 2200);
    }
  }

  public resetDisplay(): void {
    // Reset character displays
    const playerSection = this.container.querySelector('.player-character') as HTMLElement;
    const computerSection = this.container.querySelector('.computer-character') as HTMLElement;
    
    if (playerSection) {
      playerSection.classList.remove('revealed', 'animate-reveal');
      const svgWrapper = playerSection.querySelector('.character-svg-wrapper') as HTMLElement;
      const characterName = playerSection.querySelector('.character-name') as HTMLElement;
      if (svgWrapper) svgWrapper.innerHTML = '';
      if (characterName) characterName.textContent = 'Selecciona un personaje';
    }
    
    if (computerSection) {
      computerSection.classList.remove('revealed', 'animate-reveal');
      const svgWrapper = computerSection.querySelector('.character-svg-wrapper') as HTMLElement;
      const characterName = computerSection.querySelector('.character-name') as HTMLElement;
      if (svgWrapper) svgWrapper.innerHTML = '';
      if (characterName) characterName.textContent = '???';
    }

    // Reset result message
    const resultText = this.container.querySelector('.result-text') as HTMLElement;
    const resultDescription = this.container.querySelector('.result-description') as HTMLElement;
    const resultMessage = this.container.querySelector('.result-message') as HTMLElement;
    
    if (resultText) resultText.textContent = '¡Haz tu elección para comenzar!';
    if (resultDescription) resultDescription.textContent = 'Selecciona tu personaje favorito del Día de los Muertos';
    if (resultMessage) resultMessage.className = 'result-message';

    // Reset victory calaberita
    this.hideVictoryCalaverita();

    // Reset scores and round
    this.updateScores(0, 0);
    this.updateRoundCounter(0);

    // Disable play again button
    const playAgainButton = this.container.querySelector('.play-again-button') as HTMLButtonElement;
    if (playAgainButton) {
      playAgainButton.disabled = true;
    }

    // Remove animations
    const battleDisplay = this.container.querySelector('.battle-display') as HTMLElement;
    const vsSection = this.container.querySelector('.vs-section') as HTMLElement;
    
    if (battleDisplay) {
      battleDisplay.classList.remove('battle-animation');
    }
    
    if (vsSection) {
      vsSection.classList.remove('battle-active');
    }

    this.currentResult = null;
  }

  public getCurrentResult(): GameResultData | null {
    return this.currentResult;
  }

  public displayVictoryCalaverita(calaberita: string): void {
    const victorySection = this.container.querySelector('.victory-calaberita-section') as HTMLElement;
    const calaberitaText = this.container.querySelector('.victory-calaberita-section .calaberita-text') as HTMLElement;
    
    if (victorySection && calaberitaText) {
      // Set the calaberita text
      calaberitaText.innerHTML = this.formatCalaveritaText(calaberita);
      
      // Show the section with animation
      victorySection.style.display = 'block';
      
      // Add animation classes
      setTimeout(() => {
        victorySection.classList.add('animate-victory-calaberita');
        calaberitaText.classList.add('animate-text');
      }, 100);
    }
  }

  public hideVictoryCalaverita(): void {
    const victorySection = this.container.querySelector('.victory-calaberita-section') as HTMLElement;
    
    if (victorySection) {
      victorySection.style.display = 'none';
      victorySection.classList.remove('animate-victory-calaberita');
      
      const calaberitaText = victorySection.querySelector('.calaberita-text') as HTMLElement;
      if (calaberitaText) {
        calaberitaText.classList.remove('animate-text');
        calaberitaText.innerHTML = '';
      }
    }
  }

  private formatCalaveritaText(text: string): string {
    // Split text into lines and format for display
    const lines = text.split('\n').filter(line => line.trim());
    return lines.map(line => `<div class="verse-line">${line.trim()}</div>`).join('');
  }
}