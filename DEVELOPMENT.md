# 🛠️ Guía de Desarrollo

## 🚀 Configuración del Entorno de Desarrollo

### Instalación de Bun

Bun es el runtime JavaScript recomendado para este proyecto debido a su velocidad superior.

#### macOS/Linux
```bash
curl -fsSL https://bun.sh/install | bash
```

#### Windows
```bash
powershell -c "irm bun.sh/install.ps1 | iex"
```

#### Verificar Instalación
```bash
bun --version
```

### Configuración del Proyecto

```bash
# Clonar el repositorio
git clone <repository-url>
cd code-of-the-dead-challenge

# Instalar dependencias con Bun
bun install

# Ejecutar en modo desarrollo
bun run dev
```

## 🔧 Scripts de Desarrollo

### Scripts Principales

```bash
# Desarrollo con hot reload
bun run dev

# Build de producción
bun run build

# Preview de build
bun run preview

# Linting TypeScript
bun x tsc --noEmit
```

### Scripts Personalizados

```bash
# Limpiar directorio dist
bun run clean
# Equivale a: rm -rf dist

# Análisis de bundle
bun run analyze
# Equivale a: bun run build && bun x vite-bundle-analyzer

# Formateo de código
bun run format
# Equivale a: bun x prettier --write src/
```

## 🏗️ Estructura de Desarrollo

### Configuración TypeScript

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "types": ["vite/client"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
```

### Hot Module Replacement (HMR)

Vite proporciona HMR automático para:
- **TypeScript**: Recompilación instantánea
- **CSS**: Inyección de estilos sin reload
- **Assets**: Actualización automática de recursos

## 🎨 Desarrollo de Componentes

### Estructura de Componente

```typescript
export class ComponentName {
  private container: HTMLElement;
  private options: ComponentOptions;
  
  constructor(container: HTMLElement, options: ComponentOptions = {}) {
    this.container = container;
    this.options = { ...defaultOptions, ...options };
    this.render();
    this.attachEventListeners();
  }
  
  private render(): void {
    this.container.innerHTML = `<!-- HTML template -->`;
  }
  
  private attachEventListeners(): void {
    // Event listeners
  }
  
  public updateState(newState: any): void {
    // Update component state
  }
}
```

### Convenciones de Naming

- **Clases**: PascalCase (`DiaDeMuertosGame`)
- **Métodos**: camelCase (`handleCharacterSelection`)
- **Constantes**: UPPER_SNAKE_CASE (`GAME_RULES`)
- **Archivos**: camelCase (`gameEngine.ts`)
- **CSS Classes**: kebab-case (`character-selector`)

## 🎭 Desarrollo de Personajes

### Crear Nuevo Personaje

1. **Definir en Types**
```typescript
export const Character = {
  CATRINA: 'catrina',
  CALAVERA: 'calavera', 
  MARIACHI: 'mariachi',
  NUEVO_PERSONAJE: 'nuevo_personaje' // Agregar aquí
} as const;
```

2. **Crear SVG Component**
```typescript
// src/components/NuevoPersonajeSVG.ts
export function NuevoPersonajeSVG(): string {
  return `
    <svg width="96" height="144" viewBox="0 0 96 144" class="pixel-art nuevo-personaje-svg">
      <!-- SVG content -->
    </svg>
  `;
}
```

3. **Agregar a Constants**
```typescript
// src/constants/characters.ts
[Character.NUEVO_PERSONAJE]: {
  name: 'nuevo_personaje',
  displayName: 'Nuevo Personaje',
  description: 'Descripción del nuevo personaje',
  svgComponent: 'NuevoPersonajeSVG',
  beats: Character.OTRO_PERSONAJE
}
```

4. **Agregar Animaciones CSS**
```css
.nuevo-personaje-svg {
  animation: nuevo-personaje-idle 2s ease-in-out infinite;
}

@keyframes nuevo-personaje-idle {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
}
```

## 📜 Desarrollo de Calaberitas

### Agregar Nuevas Calaberitas

```typescript
// src/constants/fallbacks.ts
const NUEVAS_CALABERITAS = [
  "Nueva calaberita aquí,\nCon rimas del más allá...",
  "Otra calaberita más,\nPara celebrar la tradición..."
];

export function getRandomFallbackCalaverita(
  type: string, 
  character?: Character
): string {
  const calaberitas = FALLBACK_CALABERITAS[type] || NUEVAS_CALABERITAS;
  return calaberitas[Math.floor(Math.random() * calaberitas.length)];
}
```

### Integración MCP Personalizada

```typescript
// src/services/CustomMCPService.ts
export class CustomMCPService implements MCPService {
  async generateCalaverita(context: CalaveritaContext): Promise<string> {
    const prompt = this.buildPrompt(context);
    const response = await this.callCustomAPI(prompt);
    return this.formatResponse(response);
  }
  
  private buildPrompt(context: CalaveritaContext): string {
    return `Genera una calaberita para ${context.playerCharacter}...`;
  }
}
```

## 🎨 Desarrollo de Estilos

### Metodología CSS

- **Mobile First**: Diseño desde móvil hacia desktop
- **Pixel Art**: Mantener estética retro consistente
- **Custom Properties**: Usar variables CSS para temas
- **BEM-like**: Nomenclatura clara y consistente

### Agregar Nuevos Estilos

```css
/* Nuevo componente */
.nuevo-componente {
  /* Estilos base */
  font-family: var(--pixel-font-body);
  color: var(--text-cream);
  
  /* Pixel art rendering */
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: unset;
  text-rendering: geometricPrecision;
}

.nuevo-componente__elemento {
  /* Elemento hijo */
}

.nuevo-componente--modificador {
  /* Variante del componente */
}
```

### Responsive Design

```css
/* Mobile First */
.componente {
  /* Estilos base para móvil */
}

@media (min-width: 768px) {
  .componente {
    /* Estilos para tablet */
  }
}

@media (min-width: 1024px) {
  .componente {
    /* Estilos para desktop */
  }
}
```

## 🧪 Testing y Debugging

### Debugging en Navegador

```typescript
// Acceso global para debugging
(window as any).game = game;

// En consola del navegador:
// game.getCurrentPhase()
// game.getGameState()
// game.getSelectedCharacter()
```

### Logs Estructurados

```typescript
// Usar emojis para categorizar logs
console.log('🎭', 'Character selection:', character);
console.log('🎮', 'Game state:', gameState);
console.log('📜', 'Calaberita generated:', calaberita);
console.log('🚨', 'Error occurred:', error);
```

### Performance Profiling

```typescript
// Medir rendimiento de funciones
console.time('generateCalaverita');
await this.generateCalaverita(context);
console.timeEnd('generateCalaverita');
```

## 🔧 Herramientas de Desarrollo

### Extensiones VS Code Recomendadas

```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-json",
    "formulahendry.auto-rename-tag"
  ]
}
```

### Configuración Prettier

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### Configuración ESLint

```json
{
  "extends": [
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "prefer-const": "error"
  }
}
```

## 🚀 Optimización de Build

### Análisis de Bundle

```bash
# Instalar analizador
bun add -d vite-bundle-analyzer

# Analizar bundle
bun run build
bun x vite-bundle-analyzer
```

### Optimizaciones Vite

```typescript
// vite.config.ts (si se necesita)
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['typescript'],
          components: ['./src/components/index.ts']
        }
      }
    }
  }
});
```

## 📦 Gestión de Dependencias

### Actualizar Dependencias

```bash
# Ver dependencias desactualizadas
bun outdated

# Actualizar todas las dependencias
bun update

# Actualizar dependencia específica
bun update typescript
```

### Agregar Nueva Dependencia

```bash
# Dependencia de producción
bun add nueva-dependencia

# Dependencia de desarrollo
bun add -d nueva-dev-dependencia

# Dependencia global
bun add -g herramienta-global
```

## 🔄 Workflow de Git

### Branches

- `main`: Código de producción
- `develop`: Desarrollo activo
- `feature/*`: Nuevas características
- `bugfix/*`: Corrección de bugs
- `hotfix/*`: Correcciones urgentes

### Commits Convencionales

```bash
# Nuevas características
git commit -m "feat: agregar nuevo personaje Azteca"

# Correcciones
git commit -m "fix: corregir animación de scroll en móvil"

# Documentación
git commit -m "docs: actualizar README con instrucciones Bun"

# Estilos
git commit -m "style: mejorar espaciado en componente selector"

# Refactoring
git commit -m "refactor: extraer lógica de scroll a utilidad"
```

## 🚀 Despliegue

### Build de Producción

```bash
# Build optimizado
bun run build

# Verificar build localmente
bun run preview
```

### Variables de Entorno

```bash
# .env.local (no commitear)
VITE_MCP_SERVICE_URL=http://localhost:3000
VITE_DEBUG_MODE=true

# .env.production
VITE_MCP_SERVICE_URL=https://api.production.com
VITE_DEBUG_MODE=false
```

---

Esta guía proporciona todo lo necesario para desarrollar y mantener el proyecto de manera eficiente usando Bun como runtime principal.