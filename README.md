# 🎭 Día de los Muertos: Piedra, Papel o Tijeras

Un juego interactivo de piedra, papel o tijeras con temática del Día de los Muertos mexicano, que combina la tradición cultural con tecnología moderna y arte pixel.

![Día de los Muertos Game](https://img.shields.io/badge/Día%20de%20los%20Muertos-Game-orange?style=for-the-badge&logo=game&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white)

## 🌟 Características Principales

- **🎨 Arte Pixel Auténtico**: Personajes del Día de los Muertos renderizados en estilo pixel art
- **🎭 Personajes Únicos**: Catrina, Calavera y Mariachi con animaciones personalizadas
- **📜 Calaberitas Dinámicas**: Poemas generados dinámicamente usando IA (MCP)
- **🎮 Experiencia Fluida**: Scroll automático y transiciones suaves entre fases del juego
- **❓ Modal de Ayuda Interactivo**: Botón de ayuda con reglas del juego y explicación de personajes
- **📱 Diseño Responsivo**: Optimizado para desktop, tablet y móvil
- **🎵 Temática Cultural**: Celebra la rica tradición mexicana del Día de los Muertos

## 🚀 Inicio Rápido

### Prerrequisitos

- **Bun** (recomendado) o Node.js 18+
- Navegador web moderno con soporte ES2022

### Instalación con Bun

```bash
# Clonar el repositorio
git clone <repository-url>
cd code-of-the-dead-challenge

# Instalar dependencias con Bun
bun install

# Ejecutar en modo desarrollo
bun run dev

# Construir para producción
bun run build

# Vista previa de la build de producción
bun run preview
```

### Instalación con npm/yarn (alternativa)

```bash
# Instalar dependencias
npm install
# o
yarn install

# Ejecutar comandos
npm run dev
npm run build
npm run preview
```

## 🏗️ Arquitectura del Proyecto

### Estructura de Directorios

```
code-of-the-dead-challenge/
├── src/
│   ├── components/          # Componentes de UI
│   │   ├── CharacterSelector.ts
│   │   ├── CalaveritaDisplay.ts
│   │   ├── GameResult.ts
│   │   ├── HelpButton.ts
│   │   ├── HelpModal.ts
│   │   ├── CatrinaSVG.ts
│   │   ├── CalaveraSVG.ts
│   │   └── MariachiSVG.ts
│   ├── services/           # Lógica de negocio
│   │   ├── GameEngine.ts
│   │   ├── GameLogic.ts
│   │   ├── CalaveritaService.ts
│   │   └── MCPService.ts
│   ├── constants/          # Constantes y datos
│   │   ├── characters.ts
│   │   └── fallbacks.ts
│   ├── types/              # Definiciones TypeScript
│   │   └── index.ts
│   ├── main.ts            # Punto de entrada principal
│   └── style.css          # Estilos pixel art
├── public/                # Archivos estáticos
├── .kiro/                # Configuración de Kiro IDE
│   ├── specs/            # Especificaciones del proyecto
│   └── settings/         # Configuración MCP
├── dist/                 # Build de producción
├── index.html           # HTML principal
├── package.json         # Dependencias y scripts
├── tsconfig.json        # Configuración TypeScript
└── bun.lock            # Lock file de Bun
```

### Componentes Principales

#### 🎮 DiaDeMuertosGame (main.ts)
Clase principal que orquesta todo el juego:
- Gestiona el flujo entre fases (selección → revelación → resultado)
- Coordina componentes y servicios
- Maneja scroll automático y transiciones
- Integra generación de calaberitas

#### 🎭 CharacterSelector
Componente para selección de personajes:
- Renderiza los tres personajes con arte pixel
- Maneja interacciones de hover y selección
- Animaciones temáticas para cada personaje
- Estados visual para selección y deshabilitado

#### 📜 CalaveritaDisplay
Muestra calaberitas (poemas) dinámicas:
- Integración con servicio MCP para generación de IA
- Animaciones de escritura tipo máquina de escribir
- Fallbacks locales cuando MCP no está disponible
- Estados de carga con indicadores visuales

#### 🏆 GameResult
Presenta resultados de cada ronda:
- Animaciones de revelación para elección de computadora
- Efectos de celebración para victorias
- Seguimiento de puntuación y rondas
- Botones para nueva ronda o reinicio

### Servicios

#### 🎯 GameEngine
Motor principal del juego:
- Implementa lógica de piedra, papel, tijeras
- Gestiona estado del juego y puntuaciones
- Determina ganadores según reglas tradicionales
- Maneja fases del juego

#### 🤖 MCPService
Integración con Model Context Protocol:
- Conecta con servicios de IA externos
- Genera calaberitas contextuales
- Manejo de errores y fallbacks
- Configuración flexible

#### 📝 CalaveritaService
Servicio de generación de poemas:
- Orquesta entre MCP y fallbacks locales
- Contextualiza según personajes y resultados
- Caché y optimización de requests
- Formato y validación de contenido

## 🎨 Sistema de Diseño

### Paleta de Colores (Día de los Muertos)

```css
--primary-orange: #FF6B35    /* Flores de cempasúchil */
--secondary-purple: #8E44AD  /* Tradicional Día de los Muertos */
--accent-gold: #F1C40F       /* Celebración y festividad */
--background-navy: #2C3E50   /* Cielo nocturno */
--text-cream: #FDF2E9        /* Papel picado */
--pixel-white: #FFFFFF       /* Blanco puro para contraste pixel */
--pixel-black: #000000       /* Negro puro para contornos pixel */
```

### Tipografía Pixel Art

- **Headers**: Courier New, Monaco, Menlo, Consolas (monospace)
- **Body**: Courier New, Monaco, Lucida Console (monospace)
- **UI**: Courier New, Monaco, Consolas (monospace)

### Características Pixel Art

- `image-rendering: pixelated` para gráficos nítidos
- `text-rendering: geometricPrecision` para texto preciso
- `-webkit-font-smoothing: none` para desactivar suavizado
- Sombras de texto en capas para profundidad
- Bordes y esquinas nítidas (border-radius: 0)

## 🎭 Personajes del Juego

### La Catrina 👸
- **Tipo**: Papel (vence a Piedra)
- **Descripción**: Elegante dama de la muerte, símbolo icónico del Día de los Muertos
- **Animación**: Movimiento vertical suave con rotación sutil

### El Calavera 💀
- **Tipo**: Piedra (vence a Tijeras)
- **Descripción**: Cráneo tradicional decorado, representa la memoria de los ancestros
- **Animación**: Rotación oscilatoria con cambios de escala

### El Mariachi 🎵
- **Tipo**: Tijeras (vence a Papel)
- **Descripción**: Músico tradicional que celebra la vida y la muerte
- **Animación**: Movimiento horizontal con efectos de escala

## 🔧 Configuración y Personalización

### MCP (Model Context Protocol)

El juego puede integrarse con servicios de IA para generar calaberitas dinámicas:

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

### Variables de Entorno

```bash
# Opcional: URL del servicio MCP personalizado
VITE_MCP_SERVICE_URL=http://localhost:3000

# Opcional: Habilitar modo debug
VITE_DEBUG_MODE=true
```

## 🎮 Flujo del Juego

1. **Selección de Personaje**
   - Usuario elige entre Catrina, Calavera o Mariachi
   - Scroll automático a sección de calaberita
   - Generación de poema contextual

2. **Fase de Revelación**
   - Animación de "batalla" entre personajes
   - Revelación dramática de elección de computadora
   - Scroll automático a resultados

3. **Presentación de Resultados**
   - Animaciones de victoria/derrota/empate
   - Actualización de puntuaciones
   - Opción de nueva ronda o reinicio

4. **Calaberitas Especiales**
   - Poemas únicos para victorias de computadora
   - Integración con temática del Día de los Muertos
   - Fallbacks locales garantizan experiencia completa

## 🚀 Despliegue

### Build de Producción

```bash
# Con Bun (recomendado)
bun run build

# Con npm
npm run build
```

### Archivos Generados

- `dist/index.html` - HTML principal optimizado
- `dist/assets/` - CSS y JS minificados y con hash
- Todos los assets están optimizados para producción

### Despliegue en Vercel/Netlify

El proyecto está configurado para despliegue automático:

1. Conectar repositorio
2. Configurar comando de build: `bun run build`
3. Directorio de salida: `dist`
4. ¡Listo!

## 🧪 Desarrollo

### Comandos Disponibles

```bash
# Desarrollo con hot reload
bun run dev

# Build de producción
bun run build

# Preview de build local
bun run preview

# Linting TypeScript
bun run tsc --noEmit
```

### Estructura de Desarrollo

- **Hot Reload**: Cambios instantáneos durante desarrollo
- **TypeScript Strict**: Tipado estricto para mayor robustez
- **ES Modules**: Sintaxis moderna de módulos
- **Vite**: Build tool rápido y optimizado

## 🎯 Características Técnicas

### Rendimiento
- **Lazy Loading**: Componentes cargados bajo demanda
- **Tree Shaking**: Eliminación de código no utilizado
- **Asset Optimization**: Imágenes y CSS optimizados
- **Minimal Bundle**: ~44KB JS + ~35KB CSS (gzipped)

### Accesibilidad
- **ARIA Labels**: Etiquetas para lectores de pantalla
- **Keyboard Navigation**: Navegación completa por teclado
- **Focus Management**: Gestión inteligente del foco
- **Reduced Motion**: Respeta preferencias de animación

### Compatibilidad
- **Navegadores Modernos**: Chrome 90+, Firefox 88+, Safari 14+
- **Móviles**: iOS Safari 14+, Chrome Mobile 90+
- **Responsive**: Breakpoints para móvil, tablet y desktop

## 🤝 Contribución

### Guías de Desarrollo

1. **Fork** el repositorio
2. **Crear** rama feature (`git checkout -b feature/nueva-caracteristica`)
3. **Commit** cambios (`git commit -am 'Agregar nueva característica'`)
4. **Push** a la rama (`git push origin feature/nueva-caracteristica`)
5. **Crear** Pull Request

### Estándares de Código

- **TypeScript Strict**: Todos los tipos deben estar definidos
- **ESLint**: Seguir reglas de linting configuradas
- **Pixel Art**: Mantener estética pixel art consistente
- **Temática Cultural**: Respetar tradiciones del Día de los Muertos

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Reconocimientos

- **Día de los Muertos**: Tradición cultural mexicana
- **Arte Pixel**: Inspirado en juegos retro de los 80s-90s
- **Vite**: Por el excelente tooling de desarrollo
- **Bun**: Por el runtime JavaScript ultrarrápido
- **TypeScript**: Por el sistema de tipos robusto

---

**¡Celebra la vida y la muerte con este juego tradicional mexicano! 🎭💀🌺**