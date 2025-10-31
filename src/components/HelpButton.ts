/**
 * HelpButton Component
 * Floating help button that shows game rules and instructions
 * Positioned in the top-right corner of the screen
 */

export interface HelpButtonOptions {
  onClick?: () => void;
}

export class HelpButton {
  private container: HTMLElement;
  private options: HelpButtonOptions;

  constructor(container: HTMLElement, options: HelpButtonOptions = {}) {
    this.container = container;
    this.options = options;
    
    this.render();
    this.attachEventListeners();
  }

  private render(): void {
    this.container.innerHTML = `
      <button class="help-button" aria-label="Mostrar ayuda y reglas del juego" title="Reglas del juego">
        <svg width="32" height="32" viewBox="0 0 32 32" class="help-icon pixel-art">
          <!-- Círculo exterior -->
          <rect x="8" y="4" width="16" height="2" fill="currentColor"/>
          <rect x="6" y="6" width="2" height="4" fill="currentColor"/>
          <rect x="24" y="6" width="2" height="4" fill="currentColor"/>
          <rect x="4" y="10" width="2" height="12" fill="currentColor"/>
          <rect x="26" y="10" width="2" height="12" fill="currentColor"/>
          <rect x="6" y="22" width="2" height="4" fill="currentColor"/>
          <rect x="24" y="22" width="2" height="4" fill="currentColor"/>
          <rect x="8" y="26" width="16" height="2" fill="currentColor"/>
          
          <!-- Signo de interrogación -->
          <!-- Parte superior del ? -->
          <rect x="12" y="10" width="8" height="2" fill="currentColor"/>
          <rect x="10" y="12" width="2" height="2" fill="currentColor"/>
          <rect x="20" y="12" width="2" height="2" fill="currentColor"/>
          <rect x="18" y="14" width="2" height="2" fill="currentColor"/>
          <rect x="16" y="16" width="2" height="2" fill="currentColor"/>
          
          <!-- Punto del ? -->
          <rect x="14" y="20" width="4" height="2" fill="currentColor"/>
        </svg>
        <span class="help-button-text">Ayuda</span>
      </button>
    `;
  }

  private attachEventListeners(): void {
    const button = this.container.querySelector('.help-button') as HTMLButtonElement;
    
    if (button) {
      button.addEventListener('click', () => {
        // Add click animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
          button.style.transform = '';
        }, 150);
        
        // Call onClick callback
        this.options.onClick?.();
      });

      // Add hover effects
      button.addEventListener('mouseenter', () => {
        button.classList.add('hover');
      });

      button.addEventListener('mouseleave', () => {
        button.classList.remove('hover');
      });
    }
  }

  public setVisible(visible: boolean): void {
    const button = this.container.querySelector('.help-button') as HTMLElement;
    if (button) {
      button.style.display = visible ? 'flex' : 'none';
    }
  }

  public updatePosition(top?: string, right?: string): void {
    const button = this.container.querySelector('.help-button') as HTMLElement;
    if (button) {
      if (top) button.style.top = top;
      if (right) button.style.right = right;
    }
  }
}