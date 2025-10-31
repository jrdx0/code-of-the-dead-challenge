/**
 * HelpModal Component
 * Displays game rules and character matchups in a modal overlay
 * Shows which character beats which in the rock-paper-scissors style game
 */

import { Character } from '../types/index.js';
import { CHARACTERS } from '../constants/characters.js';
import { CatrinaSVG, CalaveraSVG, MariachiSVG } from './SVGCharacters.js';

export interface HelpModalOptions {
  onClose?: () => void;
}

export class HelpModal {
  private container: HTMLElement;
  private options: HelpModalOptions;
  private svgComponents: Record<Character, () => string>;
  private isVisible: boolean = false;

  constructor(container: HTMLElement, options: HelpModalOptions = {}) {
    this.container = container;
    this.options = options;
    this.svgComponents = {
      [Character.CATRINA]: CatrinaSVG,
      [Character.CALAVERA]: CalaveraSVG,
      [Character.MARIACHI]: MariachiSVG
    };
    
    this.render();
    this.attachEventListeners();
  }

  private render(): void {
    this.container.innerHTML = `
      <div class="help-modal-overlay" style="display: none;">
        <div class="help-modal">
          <div class="help-modal-header">
            <h2 class="help-modal-title">🎭 Reglas del Juego</h2>
            <button class="help-modal-close" aria-label="Cerrar ayuda">
              <svg width="24" height="24" viewBox="0 0 24 24" class="pixel-art">
                <rect x="6" y="6" width="2" height="12" fill="currentColor"/>
                <rect x="16" y="6" width="2" height="12" fill="currentColor"/>
                <rect x="8" y="6" width="8" height="2" fill="currentColor"/>
                <rect x="8" y="16" width="8" height="2" fill="currentColor"/>
                <rect x="6" y="8" width="2" height="8" fill="currentColor"/>
                <rect x="16" y="8" width="2" height="8" fill="currentColor"/>
                <rect x="8" y="8" width="2" height="2" fill="currentColor"/>
                <rect x="14" y="8" width="2" height="2" fill="currentColor"/>
                <rect x="8" y="14" width="2" height="2" fill="currentColor"/>
                <rect x="14" y="14" width="2" height="2" fill="currentColor"/>
              </svg>
            </button>
          </div>
          
          <div class="help-modal-content">
            <div class="help-section">
              <h3 class="help-section-title">🎮 Cómo Jugar</h3>
              <p class="help-description">
                Elige tu personaje favorito del Día de los Muertos y compite contra la computadora 
                en este clásico juego de piedra, papel o tijeras con temática mexicana.
              </p>
            </div>

            <div class="help-section">
              <h3 class="help-section-title">⚔️ Reglas de Combate</h3>
              <div class="matchup-grid">
                <div class="matchup-item">
                  <div class="matchup-winner">
                    <div class="character-icon">
                      ${this.svgComponents[Character.CATRINA]()}
                    </div>
                    <span class="character-name">${CHARACTERS[Character.CATRINA].displayName}</span>
                    <span class="character-type">(Papel)</span>
                  </div>
                  <div class="matchup-vs">
                    <span class="vs-text">VENCE A</span>
                    <div class="vs-arrow">→</div>
                  </div>
                  <div class="matchup-loser">
                    <div class="character-icon">
                      ${this.svgComponents[Character.CALAVERA]()}
                    </div>
                    <span class="character-name">${CHARACTERS[Character.CALAVERA].displayName}</span>
                    <span class="character-type">(Piedra)</span>
                  </div>
                </div>

                <div class="matchup-item">
                  <div class="matchup-winner">
                    <div class="character-icon">
                      ${this.svgComponents[Character.CALAVERA]()}
                    </div>
                    <span class="character-name">${CHARACTERS[Character.CALAVERA].displayName}</span>
                    <span class="character-type">(Piedra)</span>
                  </div>
                  <div class="matchup-vs">
                    <span class="vs-text">VENCE A</span>
                    <div class="vs-arrow">→</div>
                  </div>
                  <div class="matchup-loser">
                    <div class="character-icon">
                      ${this.svgComponents[Character.MARIACHI]()}
                    </div>
                    <span class="character-name">${CHARACTERS[Character.MARIACHI].displayName}</span>
                    <span class="character-type">(Tijeras)</span>
                  </div>
                </div>

                <div class="matchup-item">
                  <div class="matchup-winner">
                    <div class="character-icon">
                      ${this.svgComponents[Character.MARIACHI]()}
                    </div>
                    <span class="character-name">${CHARACTERS[Character.MARIACHI].displayName}</span>
                    <span class="character-type">(Tijeras)</span>
                  </div>
                  <div class="matchup-vs">
                    <span class="vs-text">VENCE A</span>
                    <div class="vs-arrow">→</div>
                  </div>
                  <div class="matchup-loser">
                    <div class="character-icon">
                      ${this.svgComponents[Character.CATRINA]()}
                    </div>
                    <span class="character-name">${CHARACTERS[Character.CATRINA].displayName}</span>
                    <span class="character-type">(Papel)</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="help-section">
              <h3 class="help-section-title">🎭 Personajes</h3>
              <div class="characters-info">
                <div class="character-info-item">
                  <div class="character-icon">
                    ${this.svgComponents[Character.CATRINA]()}
                  </div>
                  <div class="character-details">
                    <h4 class="character-info-name">${CHARACTERS[Character.CATRINA].displayName}</h4>
                    <p class="character-info-description">${CHARACTERS[Character.CATRINA].description}</p>
                  </div>
                </div>

                <div class="character-info-item">
                  <div class="character-icon">
                    ${this.svgComponents[Character.CALAVERA]()}
                  </div>
                  <div class="character-details">
                    <h4 class="character-info-name">${CHARACTERS[Character.CALAVERA].displayName}</h4>
                    <p class="character-info-description">${CHARACTERS[Character.CALAVERA].description}</p>
                  </div>
                </div>

                <div class="character-info-item">
                  <div class="character-icon">
                    ${this.svgComponents[Character.MARIACHI]()}
                  </div>
                  <div class="character-details">
                    <h4 class="character-info-name">${CHARACTERS[Character.MARIACHI].displayName}</h4>
                    <p class="character-info-description">${CHARACTERS[Character.MARIACHI].description}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="help-section">
              <h3 class="help-section-title">🌺 Sobre el Día de los Muertos</h3>
              <p class="help-description">
                El Día de los Muertos es una tradición mexicana que celebra y honra a los seres queridos 
                que han fallecido. Esta festividad combina elementos prehispánicos con tradiciones católicas, 
                creando una celebración única llena de color, música y alegría.
              </p>
            </div>
          </div>

          <div class="help-modal-footer">
            <button class="help-modal-button">
              🎮 ¡Entendido, a Jugar!
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private attachEventListeners(): void {
    const overlay = this.container.querySelector('.help-modal-overlay') as HTMLElement;
    const closeButton = this.container.querySelector('.help-modal-close') as HTMLButtonElement;
    const footerButton = this.container.querySelector('.help-modal-button') as HTMLButtonElement;

    // Close on overlay click (but not on modal content click)
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) {
        this.hide();
      }
    });

    // Close on close button click
    closeButton?.addEventListener('click', () => {
      this.hide();
    });

    // Close on footer button click
    footerButton?.addEventListener('click', () => {
      this.hide();
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isVisible) {
        this.hide();
      }
    });
  }

  public show(): void {
    const overlay = this.container.querySelector('.help-modal-overlay') as HTMLElement;
    if (overlay) {
      overlay.style.display = 'flex';
      this.isVisible = true;
      
      // Add animation class after a brief delay
      setTimeout(() => {
        overlay.classList.add('show');
      }, 10);

      // Focus management for accessibility
      const modal = overlay.querySelector('.help-modal') as HTMLElement;
      modal?.focus();

      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    }
  }

  public hide(): void {
    const overlay = this.container.querySelector('.help-modal-overlay') as HTMLElement;
    if (overlay) {
      overlay.classList.remove('show');
      
      // Hide after animation completes
      setTimeout(() => {
        overlay.style.display = 'none';
        this.isVisible = false;
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Call onClose callback
        this.options.onClose?.();
      }, 300);
    }
  }

  public toggle(): void {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  public isOpen(): boolean {
    return this.isVisible;
  }
}