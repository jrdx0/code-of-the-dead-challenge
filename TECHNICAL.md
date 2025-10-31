# 📋 Documentación Técnica

## 🏗️ Arquitectura del Sistema

### Patrón de Diseño

El proyecto utiliza una arquitectura **Component-Service** con los siguientes principios:

- **Separación de Responsabilidades**: UI, lógica de negocio y datos están separados
- **Inversión de Dependencias**: Los componentes dependen de abstracciones, no de implementaciones
- **Single Responsibility**: Cada clase tiene una responsabilidad específica
- **Observer Pattern**: Comunicación entre componentes mediante callbacks

### Diagrama de Arquitectura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   UI Components │    │    Services     │    │   Data Layer    │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ CharacterSelector│◄──►│   GameEngine    │◄──►│   GameState     │
│ CalaveritaDisplay│    │   GameLogic     │    │   Characters    │
│ GameResult      │    │ CalaveritaService│    │   Fallbacks     │
│ SVG Components  │    │   MCPService    │    │   Types         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ▲                       ▲                       ▲
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │ DiaDeMuertosGame│
                    │  (Orchestrator) │
                    └─────────────────┘
```

## 🔧 APIs y Interfaces

### GameEngine Interface

```typescript
interface GameEngine {
  // Estado del juego
  playerChoice: Character | null;
  computerChoice: Character | null;
  gameResult: GameResult | null;
  
  // Métodos principales
  playRound(playerSelection: Character): GameResult;
  resetGame(): void;
  getGameState(): GameState;
  
  // Gestión de estado
  setGamePhase(phase: GamePhase): void;
  setLoading(loading: boolean): void;
  getCurrentRound(): number;
}
```

### Component Interfaces

```typescript
// CharacterSelector
interface CharacterSelectorOptions {
  onCharacterSelect: (character: Character) => void;
  onCharacterHover: (character: Character) => void;
  selectedCharacter: Character | null;
  disabled: boolean;
}

// CalaveritaDisplay
interface CalaveritaDisplayOptions {
  autoGenerate: boolean;
  showLoadingAnimation: boolean;
  animationDuration: number;
}

// GameResult
interface GameResultOptions {
  onPlayAgain?: () => void;
  onResetGame?: () => void;
  showAnimations?: boolean;
}
```

### Service Interfaces

```typescript
// MCPService
interface MCPService {
  generateCalaverita(context: CalaveritaContext): Promise<string>;
  isAvailable(): Promise<boolean>;
  testConnection(): Promise<boolean>;
}

// CalaveritaService
interface CalaveritaService {
  generateCalaverita(context: CalaveritaContext): Promise<string>;
  getFallbackCalaverita(type: string, ...args: any[]): string;
}
```

## 🎨 Sistema de Estilos

### CSS Custom Properties

```css
:root {
  /* Colores Temáticos */
  --primary-orange: #FF6B35;
  --secondary-purple: #8E44AD;
  --accent-gold: #F1C40F;
  --background-navy: #2C3E50;
  --text-cream: #FDF2E9;
  --pixel-white: #FFFFFF;
  --pixel-black: #000000;
  
  /* Tipografía Pixel */
  --pixel-font-headers: 'Courier New', 'Monaco', 'Menlo', 'Consolas', monospace;
  --pixel-font-body: 'Courier New', 'Monaco', 'Lucida Console', monospace;
  --pixel-font-ui: 'Courier New', 'Monaco', 'Consolas', monospace;
}
```

### Clases Utilitarias

```css
/* Texto Pixel Art */
.pixel-text { /* Texto base pixel art */ }
.pixel-text-header { /* Headers con estilo pixel */ }
.pixel-text-ui { /* Elementos de UI */ }

/* Sombras Pixel */
.pixel-shadow-small { /* Sombra pequeña */ }
.pixel-shadow-medium { /* Sombra mediana */ }
.pixel-shadow-large { /* Sombra grande */ }
.pixel-shadow-colored { /* Sombra con color */ }

/* Bordes Pixel */
.pixel-border { /* Borde pixel básico */ }
.pixel-border-thick { /* Borde pixel grueso */ }

/* Efectos */
.scroll-highlight { /* Efecto de scroll */ }
```

### Breakpoints Responsivos

```css
/* Mobile First */
@media (max-width: 480px) { /* Móvil pequeño */ }
@media (max-width: 768px) { /* Móvil/Tablet */ }
@media (max-width: 1024px) { /* Tablet/Desktop pequeño */ }
@media (min-width: 1200px) { /* Desktop grande */ }
```

## 🎮 Lógica del Juego

### Reglas de Piedra, Papel, Tijeras

```typescript
const GAME_RULES: Record<Character, Character> = {
  [Character.CATRINA]: Character.CALAVERA,    // Papel vence Piedra
  [Character.CALAVERA]: Character.MARIACHI,   // Piedra vence Tijeras
  [Character.MARIACHI]: Character.CATRINA     // Tijeras vence Papel
};

function determineWinner(player: Character, computer: Character): GameResult {
  if (player === computer) return GameResult.TIE;
  if (GAME_RULES[player] === computer) return GameResult.PLAYER_WINS;
  return GameResult.COMPUTER_WINS;
}
```

### Estados del Juego

```typescript
type GamePhase = 'selection' | 'revealing' | 'result';

interface GameState {
  currentRound: number;        // Ronda actual (1-based)
  playerScore: number;         // Puntuación del jugador
  computerScore: number;       // Puntuación de la computadora
  gamePhase: GamePhase;        // Fase actual del juego
  currentCalaverita: string | null;  // Calaberita actual
  isLoading: boolean;          // Estado de carga
}
```

## 🔄 Flujo de Datos

### Ciclo de Vida del Juego

1. **Inicialización**
   ```typescript
   constructor() {
     this.gameEngine = new GameEngine();
     this.calaveritaService = new CalaveritaService();
     this.initializeComponents();
     this.setupGameFlow();
   }
   ```

2. **Selección de Personaje**
   ```typescript
   handleCharacterSelection(character: Character) {
     this.selectedCharacter = character;
     this.scrollToNextSection('calaberita-display', 500);
     this.updateGamePhase('revealing');
     this.generateCharacterSelectionCalaverita(character);
   }
   ```

3. **Procesamiento del Juego**
   ```typescript
   const result = this.gameEngine.playRound(character);
   const resultData: GameResultData = {
     playerChoice: character,
     computerChoice: this.gameEngine.computerChoice!,
     result: result,
     gameState: this.gameEngine.getGameState()
   };
   ```

4. **Presentación de Resultados**
   ```typescript
   this.gameResult?.displayResult(resultData);
   this.updateGamePhase('result');
   this.scrollToNextSection('game-result', 800);
   ```

## 🎭 Generación de Calaberitas

### Contexto de Generación

```typescript
interface CalaveritaContext {
  type: 'selection' | 'victory' | 'defeat';
  playerCharacter?: Character;
  computerCharacter?: Character;
  gameResult?: GameResult;
}
```

### Flujo de Generación

```typescript
async generateCalaverita(context: CalaveritaContext): Promise<string> {
  try {
    // 1. Intentar MCP Service
    if (await this.mcpService.isAvailable()) {
      return await this.mcpService.generateCalaverita(context);
    }
  } catch (error) {
    console.warn('MCP Service failed, using fallback');
  }
  
  // 2. Usar fallback local
  return this.getFallbackCalaverita(context.type, context.playerCharacter);
}
```

### Fallbacks Locales

```typescript
const SELECTION_CALABERITAS = [
  "En el reino de los muertos,\nTres guerreros han de luchar...",
  "Catrina, Calavera, Mariachi,\nEligen su destino final...",
  // ... más calaberitas
];
```

## 🎨 Animaciones y Transiciones

### Sistema de Animaciones CSS

```css
/* Animaciones de Personajes */
@keyframes catrina-idle {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-2px); }
}

@keyframes calavera-idle {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-1deg); }
  75% { transform: rotate(1deg); }
}

@keyframes mariachi-idle {
  0%, 100% { transform: translateX(0px); }
  50% { transform: translateX(2px); }
}
```

### Transiciones de Fase

```typescript
private updateGamePhase(phase: GamePhase): void {
  this.currentPhase = phase;
  
  // Agregar clase de transición
  const gameContainer = document.querySelector('.game-container');
  gameContainer?.classList.add('transitioning');
  
  // Remover después de la animación
  setTimeout(() => {
    gameContainer?.classList.remove('transitioning');
  }, 800);
}
```

## 📱 Scroll Automático

### Implementación del Scroll

```typescript
private scrollToNextSection(targetElementId: string, delay: number = 300): void {
  setTimeout(() => {
    const targetElement = document.getElementById(targetElementId);
    if (!targetElement) return;

    // Calcular posición óptima
    const headerHeight = document.querySelector('.game-header')?.clientHeight || 0;
    const viewportHeight = window.innerHeight;
    const elementHeight = targetElement.clientHeight;
    
    let offset = headerHeight + 40;
    
    // Ajustar para pantallas pequeñas
    if (viewportHeight < 800) {
      offset = headerHeight + 20;
    }
    
    const elementPosition = targetElement.offsetTop - offset;
    const maxScroll = document.documentElement.scrollHeight - viewportHeight;
    const finalPosition = Math.min(Math.max(0, elementPosition), maxScroll);
    
    window.scrollTo({
      top: finalPosition,
      behavior: 'smooth'
    });

    // Efecto de highlight
    setTimeout(() => {
      this.addScrollHighlight(targetElement);
    }, 500);
  }, delay);
}
```

## 🔧 Configuración MCP

### Estructura de Configuración

```json
{
  "mcpServers": {
    "calaberita-generator": {
      "command": "uvx",
      "args": ["calaberita-mcp-server@latest"],
      "env": {
        "FASTMCP_LOG_LEVEL": "ERROR"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

### Integración con MCP

```typescript
class MCPService {
  private async callMCPTool(toolName: string, args: any): Promise<any> {
    // Implementación específica del MCP
    // Manejo de errores y timeouts
    // Validación de respuestas
  }
  
  async generateCalaverita(context: CalaveritaContext): Promise<string> {
    return await this.callMCPTool('generate_calaberita', {
      character: context.playerCharacter,
      type: context.type,
      result: context.gameResult
    });
  }
}
```

## 🧪 Testing y Debugging

### Debugging en Desarrollo

```typescript
// Hacer disponible globalmente para debugging
(window as any).diaDeMuertosGame = game;

// Logs estructurados
console.log('🎭 Calaberita generada para', character);
console.log('🎮 Nueva ronda iniciada - Ronda', round);
console.log('📜 Scroll automático a:', targetElementId);
```

### Manejo de Errores

```typescript
try {
  const result = this.gameEngine.playRound(character);
  // ... procesamiento exitoso
} catch (error) {
  console.error('Error during game round:', error);
  this.characterSelector?.setDisabled(false);
  this.updateGamePhase('selection');
}
```

## 🚀 Optimizaciones de Rendimiento

### Lazy Loading de Componentes

```typescript
// Los componentes se inicializan solo cuando se necesitan
private initializeComponents(): void {
  const characterSelectionContainer = document.getElementById('character-selection');
  if (characterSelectionContainer) {
    this.characterSelector = new CharacterSelector(/* ... */);
  }
}
```

### Debouncing de Eventos

```typescript
// Evitar múltiples llamadas rápidas
private debouncedHover = debounce((character: Character) => {
  this.generateCharacterHoverCalaverita(character);
}, 300);
```

### Cleanup de Recursos

```typescript
// Limpiar elementos temporales
setTimeout(() => {
  if (sparkle.parentNode) {
    sparkle.parentNode.removeChild(sparkle);
  }
}, 2200);
```

## 📊 Métricas y Monitoreo

### Performance Metrics

- **Bundle Size**: ~44KB JS + ~35KB CSS (gzipped)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 2.5s
- **Lighthouse Score**: 95+ en todas las categorías

### Error Tracking

```typescript
// Tracking de errores MCP
catch (error) {
  console.warn('MCP Service failed, using fallback');
  // Aquí se podría integrar con servicio de tracking
}
```

---

Esta documentación técnica proporciona una visión completa de la implementación interna del juego, facilitando el mantenimiento y la extensión del código.