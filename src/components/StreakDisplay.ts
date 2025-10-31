/**
 * StreakDisplay Component
 * Shows current streak information and celebrations
 * Displays streak levels, progress, and achievements
 */

import { getStreakLevel, getNextStreakLevel, type StreakLevel } from '../constants/streaks.js';

export interface StreakDisplayOptions {
  showAnimations?: boolean;
  onStreakAchieved?: (level: StreakLevel) => void;
}

export interface StreakData {
  currentStreak: number;
  bestStreak: number;
  isActive: boolean;
  isNewLevel?: boolean;
  totalGames?: number;
  totalWins?: number;
  winRate?: number;
}

export class StreakDisplay {
  private container: HTMLElement;
  private options: StreakDisplayOptions;
  private currentStreak: number = 0;
  private isVisible: boolean = false;

  constructor(container: HTMLElement, options: StreakDisplayOptions = {}) {
    this.container = container;
    this.options = {
      showAnimations: true,
      ...options
    };
    
    this.render();
  }

  private render(): void {
    this.container.innerHTML = `
      <div class="streak-display" style="display: none;">
        <div class="streak-header">
          <div class="streak-icon">
            <span class="streak-emoji">🔥</span>
          </div>
          <div class="streak-info">
            <h3 class="streak-title">Racha de Victorias</h3>
            <div class="streak-counter">
              <span class="streak-number">0</span>
              <span class="streak-label">victorias seguidas</span>
            </div>
          </div>
        </div>

        <div class="streak-progress">
          <div class="progress-bar">
            <div class="progress-fill"></div>
          </div>
          <div class="progress-info">
            <span class="progress-current">0</span>
            <span class="progress-separator">/</span>
            <span class="progress-next">3</span>
            <span class="progress-label">para siguiente nivel</span>
          </div>
        </div>

        <div class="streak-level">
          <div class="level-badge">
            <span class="level-emoji">🔥</span>
            <span class="level-name">Racha Caliente</span>
          </div>
          <div class="level-description">
            ¡3 victorias seguidas! Los espíritus te sonríen
          </div>
        </div>

        <div class="streak-best">
          <span class="best-label">Mejor racha:</span>
          <span class="best-number">0</span>
          <span class="best-emoji">👑</span>
        </div>

        <div class="streak-stats">
          <div class="stat-item">
            <span class="stat-label">Partidas:</span>
            <span class="stat-value total-games">0</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Victorias:</span>
            <span class="stat-value total-wins">0</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">% Éxito:</span>
            <span class="stat-value win-rate">0%</span>
          </div>
        </div>
      </div>
    `;
  }

  public updateStreak(data: StreakData): void {
    const streakDisplay = this.container.querySelector('.streak-display') as HTMLElement;
    const streakNumber = this.container.querySelector('.streak-number') as HTMLElement;
    const streakEmoji = this.container.querySelector('.streak-emoji') as HTMLElement;
    const bestNumber = this.container.querySelector('.best-number') as HTMLElement;

    if (!streakDisplay || !streakNumber || !streakEmoji || !bestNumber) return;

    this.currentStreak = data.currentStreak;

    // Update streak counter
    streakNumber.textContent = data.currentStreak.toString();
    bestNumber.textContent = data.bestStreak.toString();

    // Update persistent statistics
    this.updateStats(data);

    // Always show streak display if there are any games played
    const hasPlayedGames = (data.totalGames && data.totalGames > 0) || data.bestStreak > 0;
    
    if (hasPlayedGames) {
      this.show();
      
      if (data.isActive && data.currentStreak > 0) {
        this.updateStreakLevel(data.currentStreak);
        this.updateProgress(data.currentStreak);
        
        // Trigger celebration if new level achieved
        if (data.isNewLevel && this.options.showAnimations) {
          this.triggerCelebration();
        }
      } else {
        // Show default state when no active streak
        this.updateStreakLevel(0);
        this.updateProgress(0);
      }
    } else {
      this.hide();
    }

    // Update animations
    if (this.options.showAnimations && data.isActive) {
      this.addStreakAnimation();
    }
  }

  private updateStats(data: StreakData): void {
    const totalGamesElement = this.container.querySelector('.total-games') as HTMLElement;
    const totalWinsElement = this.container.querySelector('.total-wins') as HTMLElement;
    const winRateElement = this.container.querySelector('.win-rate') as HTMLElement;

    if (totalGamesElement && data.totalGames !== undefined) {
      totalGamesElement.textContent = data.totalGames.toString();
    }

    if (totalWinsElement && data.totalWins !== undefined) {
      totalWinsElement.textContent = data.totalWins.toString();
    }

    if (winRateElement && data.winRate !== undefined) {
      winRateElement.textContent = `${data.winRate}%`;
    }
  }

  private updateStreakLevel(streak: number): void {
    const levelBadge = this.container.querySelector('.level-badge') as HTMLElement;
    const levelEmoji = this.container.querySelector('.level-emoji') as HTMLElement;
    const levelName = this.container.querySelector('.level-name') as HTMLElement;
    const levelDescription = this.container.querySelector('.level-description') as HTMLElement;
    const streakEmoji = this.container.querySelector('.streak-emoji') as HTMLElement;

    const currentLevel = getStreakLevel(streak);
    
    if (currentLevel && levelEmoji && levelName && levelDescription && streakEmoji) {
      levelEmoji.textContent = currentLevel.emoji;
      levelName.textContent = currentLevel.displayName;
      levelDescription.textContent = currentLevel.description;
      streakEmoji.textContent = currentLevel.emoji;
      
      // Update colors
      if (levelBadge) {
        levelBadge.style.borderColor = currentLevel.color;
        levelBadge.style.color = currentLevel.color;
      }
    } else {
      // Default level (no streak level achieved yet)
      if (levelEmoji) levelEmoji.textContent = '🔥';
      if (levelName) levelName.textContent = 'Construyendo Racha';
      if (levelDescription) levelDescription.textContent = 'Sigue ganando para desbloquear niveles';
      if (streakEmoji) streakEmoji.textContent = '🔥';
    }
  }

  private updateProgress(streak: number): void {
    const progressFill = this.container.querySelector('.progress-fill') as HTMLElement;
    const progressCurrent = this.container.querySelector('.progress-current') as HTMLElement;
    const progressNext = this.container.querySelector('.progress-next') as HTMLElement;

    const nextLevel = getNextStreakLevel(streak);
    
    if (nextLevel && progressFill && progressCurrent && progressNext) {
      const progress = (streak / nextLevel.threshold) * 100;
      progressFill.style.width = `${Math.min(progress, 100)}%`;
      progressCurrent.textContent = streak.toString();
      progressNext.textContent = nextLevel.threshold.toString();
    } else {
      // Max level reached
      if (progressFill) progressFill.style.width = '100%';
      if (progressCurrent) progressCurrent.textContent = streak.toString();
      if (progressNext) progressNext.textContent = '∞';
    }
  }

  private show(): void {
    const streakDisplay = this.container.querySelector('.streak-display') as HTMLElement;
    if (streakDisplay && !this.isVisible) {
      streakDisplay.style.display = 'block';
      this.isVisible = true;
      
      if (this.options.showAnimations) {
        setTimeout(() => {
          streakDisplay.classList.add('show');
        }, 10);
      } else {
        streakDisplay.classList.add('show');
      }
    }
  }

  private hide(): void {
    const streakDisplay = this.container.querySelector('.streak-display') as HTMLElement;
    if (streakDisplay && this.isVisible) {
      streakDisplay.classList.remove('show');
      
      setTimeout(() => {
        streakDisplay.style.display = 'none';
        this.isVisible = false;
      }, 300);
    }
  }

  private addStreakAnimation(): void {
    const streakNumber = this.container.querySelector('.streak-number') as HTMLElement;
    const streakEmoji = this.container.querySelector('.streak-emoji') as HTMLElement;
    
    if (streakNumber) {
      streakNumber.classList.add('animate-count');
      setTimeout(() => {
        streakNumber.classList.remove('animate-count');
      }, 600);
    }
    
    if (streakEmoji) {
      streakEmoji.classList.add('animate-bounce');
      setTimeout(() => {
        streakEmoji.classList.remove('animate-bounce');
      }, 600);
    }
  }

  private triggerCelebration(): void {
    const streakDisplay = this.container.querySelector('.streak-display') as HTMLElement;
    const currentLevel = getStreakLevel(this.currentStreak);
    
    if (streakDisplay && currentLevel) {
      // Add celebration class
      streakDisplay.classList.add('celebrating');
      
      // Create celebration particles
      this.createCelebrationParticles();
      
      // Call callback
      this.options.onStreakAchieved?.(currentLevel);
      
      // Remove celebration class after animation
      setTimeout(() => {
        streakDisplay.classList.remove('celebrating');
      }, 2000);
    }
  }

  private createCelebrationParticles(): void {
    const streakDisplay = this.container.querySelector('.streak-display') as HTMLElement;
    if (!streakDisplay) return;

    const particles = ['✨', '⭐', '💫', '🌟', '🎉'];
    
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div');
      particle.className = 'celebration-particle';
      particle.textContent = particles[Math.floor(Math.random() * particles.length)];
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${i * 0.1}s`;
      
      streakDisplay.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 2000);
    }
  }

  public reset(): void {
    this.currentStreak = 0;
    this.hide();
  }

  public getCurrentStreak(): number {
    return this.currentStreak;
  }

  public isDisplayVisible(): boolean {
    return this.isVisible;
  }
}