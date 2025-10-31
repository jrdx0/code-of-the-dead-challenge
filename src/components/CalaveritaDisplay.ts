/**
 * CalaveritaDisplay Component
 * Displays generated calaberitas during selection with text animations
 * Handles loading states while MCP generates content
 */

import type { CalaveritaContext } from '../types/index.js';
import { CalaveritaService } from '../services/CalaveritaService.js';

export interface CalaveritaDisplayOptions {
  autoGenerate?: boolean;
  showLoadingAnimation?: boolean;
  animationDuration?: number;
}

export class CalaveritaDisplay {
  private container: HTMLElement;
  private options: CalaveritaDisplayOptions;
  private calaveritaService: CalaveritaService;
  private currentCalaverita: string = '';
  private isLoading: boolean = false;
  private animationTimeouts: number[] = [];

  constructor(container: HTMLElement, options: CalaveritaDisplayOptions = {}) {
    this.container = container;
    this.options = {
      autoGenerate: true,
      showLoadingAnimation: true,
      animationDuration: 2000,
      ...options
    };
    this.calaveritaService = new CalaveritaService();
    
    this.render();
  }

  private render(): void {
    this.container.innerHTML = `
      <div class="calaverita-display">
        <div class="calaverita-header">
          <h3 class="calaverita-title">Calaberita del Día de los Muertos</h3>
          <div class="calaverita-decorations">
            <span class="decoration-flower">🌼</span>
            <span class="decoration-skull">💀</span>
            <span class="decoration-flower">🌼</span>
          </div>
        </div>
        
        <div class="calaverita-content">
          <div class="calaverita-text-container">
            <div class="calaverita-text" role="region" aria-live="polite" aria-label="Calaberita verse">
              ${this.getDefaultMessage()}
            </div>
          </div>
          
          <div class="loading-indicator ${this.isLoading ? 'active' : ''}">
            <div class="loading-dots">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
            <p class="loading-text">Generando calaberita...</p>
          </div>
        </div>
        
        <div class="calaverita-footer">
          <button class="refresh-button" aria-label="Generar nueva calaberita">
            🔄 Nueva Calaberita
          </button>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  private attachEventListeners(): void {
    const refreshButton = this.container.querySelector('.refresh-button') as HTMLButtonElement;
    
    if (refreshButton) {
      refreshButton.addEventListener('click', () => {
        this.generateRandomCalaverita();
      });
    }
  }

  private getDefaultMessage(): string {
    return `
      <div class="verse-line">En esta noche de muertos y flores,</div>
      <div class="verse-line">elige tu destino entre colores.</div>
      <div class="verse-line">Que la suerte te acompañe,</div>
      <div class="verse-line">en este juego que no engañe.</div>
    `;
  }

  public async displayCalaverita(context: CalaveritaContext): Promise<void> {
    this.setLoading(true);
    
    try {
      const calaberita = await this.calaveritaService.generateCalaverita(context);
      this.currentCalaverita = calaberita;
      
      await this.animateCalaveritaText(calaberita);
    } catch (error) {
      console.error('Error displaying calaberita:', error);
      await this.animateCalaveritaText(this.getErrorMessage());
    } finally {
      this.setLoading(false);
    }
  }

  private async animateCalaveritaText(text: string): Promise<void> {
    const textContainer = this.container.querySelector('.calaverita-text') as HTMLElement;
    
    if (!textContainer) return;

    // Clear any existing animation timeouts
    this.clearAnimationTimeouts();

    // Split text into lines and prepare for animation
    const lines = text.split('\n').filter(line => line.trim());
    const formattedLines = lines.map(line => `<div class="verse-line">${line.trim()}</div>`);

    // Clear container and start animation
    textContainer.innerHTML = '';
    textContainer.classList.add('animating');

    // Animate each line appearing
    const lineDelay = this.options.showLoadingAnimation ? 800 : 100;
    for (let i = 0; i < formattedLines.length; i++) {
      const timeout = window.setTimeout(() => {
        const lineElement = document.createElement('div');
        lineElement.className = 'verse-line fade-in';
        lineElement.innerHTML = lines[i].trim();
        textContainer.appendChild(lineElement);

        // Add typing effect
        this.addTypingEffect(lineElement, lines[i].trim());
      }, i * lineDelay); // Stagger each line

      this.animationTimeouts.push(timeout);
    }

    // Complete animation after all lines are shown
    const completeTimeout = window.setTimeout(() => {
      textContainer.classList.remove('animating');
      textContainer.classList.add('animation-complete');
    }, formattedLines.length * lineDelay + 500);

    this.animationTimeouts.push(completeTimeout);
  }

  private addTypingEffect(element: HTMLElement, text: string): void {
    element.innerHTML = '';
    element.classList.add('typing');
    
    let charIndex = 0;
    const typeChar = () => {
      if (charIndex < text.length) {
        element.innerHTML += text.charAt(charIndex);
        charIndex++;
        
        const timeout = window.setTimeout(typeChar, 50 + Math.random() * 50); // Variable typing speed
        this.animationTimeouts.push(timeout);
      } else {
        element.classList.remove('typing');
        element.classList.add('typed-complete');
      }
    };

    typeChar();
  }

  private clearAnimationTimeouts(): void {
    this.animationTimeouts.forEach(timeout => clearTimeout(timeout));
    this.animationTimeouts = [];
  }

  private setLoading(loading: boolean): void {
    this.isLoading = loading;
    
    const loadingIndicator = this.container.querySelector('.loading-indicator') as HTMLElement;
    const textContainer = this.container.querySelector('.calaverita-text-container') as HTMLElement;
    const refreshButton = this.container.querySelector('.refresh-button') as HTMLButtonElement;
    
    if (loadingIndicator) {
      loadingIndicator.classList.toggle('active', loading);
    }
    
    if (textContainer) {
      textContainer.classList.toggle('loading', loading);
    }
    
    if (refreshButton) {
      refreshButton.disabled = loading;
    }
  }

  private getErrorMessage(): string {
    return `
      Ay, querido amigo, algo salió mal,
      pero no te preocupes, es normal.
      Los muertos a veces se esconden,
      pero siempre al final responden.
    `;
  }

  public async generateRandomCalaverita(): Promise<void> {
    const context: CalaveritaContext = {
      type: 'selection'
    };
    
    await this.displayCalaverita(context);
  }

  public getCurrentCalaverita(): string {
    return this.currentCalaverita;
  }

  public isCurrentlyLoading(): boolean {
    return this.isLoading;
  }

  public clearDisplay(): void {
    this.clearAnimationTimeouts();
    
    const textContainer = this.container.querySelector('.calaverita-text') as HTMLElement;
    if (textContainer) {
      textContainer.innerHTML = this.getDefaultMessage();
      textContainer.className = 'calaverita-text';
    }
    
    this.setLoading(false);
    this.currentCalaverita = '';
  }

  public destroy(): void {
    this.clearAnimationTimeouts();
    this.container.innerHTML = '';
  }
}