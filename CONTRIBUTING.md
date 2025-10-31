# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir al proyecto **Día de los Muertos: Piedra, Papel o Tijeras**! 

## 🎭 Valores del Proyecto

Este proyecto celebra la rica tradición cultural mexicana del Día de los Muertos. Todas las contribuciones deben:

- **Respetar la cultura mexicana** y las tradiciones del Día de los Muertos
- **Mantener la autenticidad** de los elementos culturales
- **Promover la educación** sobre esta hermosa tradición
- **Ser inclusivas y respetuosas** con todas las comunidades

## 🚀 Cómo Contribuir

### 1. Fork y Clone

```bash
# Fork el repositorio en GitHub
# Luego clona tu fork
git clone https://github.com/tu-usuario/code-of-the-dead-challenge.git
cd code-of-the-dead-challenge

# Configura el upstream
git remote add upstream https://github.com/original-repo/code-of-the-dead-challenge.git
```

### 2. Configuración del Entorno

```bash
# Instala Bun si no lo tienes
curl -fsSL https://bun.sh/install | bash

# Instala dependencias
bun install

# Ejecuta en modo desarrollo
bun run dev
```

### 3. Crear una Rama

```bash
# Actualiza tu main
git checkout main
git pull upstream main

# Crea una nueva rama
git checkout -b feature/nueva-caracteristica
# o
git checkout -b bugfix/correccion-bug
```

## 📝 Tipos de Contribuciones

### 🎨 Arte y Diseño
- **Nuevos personajes** del folclore mexicano
- **Mejoras en pixel art** existente
- **Animaciones adicionales** temáticas
- **Paletas de colores** alternativas

### 🎮 Funcionalidades
- **Nuevos modos de juego**
- **Características de accesibilidad**
- **Optimizaciones de rendimiento**
- **Integración con APIs externas**

### 📜 Contenido Cultural
- **Nuevas calaberitas** auténticas
- **Información educativa** sobre tradiciones
- **Traducciones** a otros idiomas
- **Contexto histórico** adicional

### 🐛 Correcciones
- **Bugs de funcionalidad**
- **Problemas de rendimiento**
- **Errores de tipado**
- **Issues de accesibilidad**

### 📚 Documentación
- **Mejoras en README**
- **Ejemplos de código**
- **Guías de usuario**
- **Documentación técnica**

## 🎯 Estándares de Código

### TypeScript
```typescript
// ✅ Bueno: Tipado explícito
interface CharacterOptions {
  name: string;
  displayName: string;
  description: string;
}

// ❌ Malo: Uso de any
function handleCharacter(character: any) { }

// ✅ Bueno: Función tipada
function handleCharacter(character: Character): GameResult { }
```

### CSS/Estilos
```css
/* ✅ Bueno: Nomenclatura clara */
.character-selector__option {
  /* Estilos pixel art */
  -webkit-font-smoothing: none;
  text-rendering: geometricPrecision;
}

/* ❌ Malo: Nombres genéricos */
.item { }
.thing { }
```

### Commits
```bash
# ✅ Bueno: Commits descriptivos
git commit -m "feat: agregar personaje Azteca con animaciones"
git commit -m "fix: corregir scroll en dispositivos móviles"
git commit -m "docs: actualizar guía de instalación con Bun"

# ❌ Malo: Commits vagos
git commit -m "cambios"
git commit -m "fix"
```

## 🎨 Guías de Diseño

### Pixel Art
- **Resolución**: Múltiplos de 16px para consistencia
- **Colores**: Usar paleta definida en CSS custom properties
- **Renderizado**: Siempre usar `image-rendering: pixelated`
- **Animaciones**: Suaves pero manteniendo estética pixel

### Tipografía
- **Headers**: Fuentes monospace con text-shadow pixel
- **Body**: Courier New o equivalente monospace
- **UI**: Consistente con el resto del juego
- **Tamaños**: Múltiplos de 8px cuando sea posible

### Colores
```css
/* Usar variables CSS existentes */
color: var(--primary-orange);    /* Cempasúchil */
color: var(--secondary-purple);  /* Tradicional */
color: var(--accent-gold);       /* Celebración */
color: var(--text-cream);        /* Papel picado */
```

## 🧪 Testing

### Antes de Enviar PR
```bash
# Verificar tipos
bun run type-check

# Formatear código
bun run format

# Build de producción
bun run build

# Probar localmente
bun run preview
```

### Testing Manual
- **Probar en múltiples navegadores** (Chrome, Firefox, Safari)
- **Verificar responsividad** (móvil, tablet, desktop)
- **Comprobar accesibilidad** (navegación por teclado, lectores de pantalla)
- **Validar rendimiento** (Lighthouse, DevTools)

## 📋 Proceso de Pull Request

### 1. Preparar el PR
```bash
# Asegúrate de que tu rama esté actualizada
git checkout main
git pull upstream main
git checkout tu-rama
git rebase main

# Push de tu rama
git push origin tu-rama
```

### 2. Crear Pull Request
- **Título descriptivo**: `feat: agregar modo multijugador local`
- **Descripción detallada**: Explica qué cambios haces y por qué
- **Screenshots**: Si hay cambios visuales, incluye capturas
- **Testing**: Describe cómo probaste los cambios

### 3. Template de PR
```markdown
## 📝 Descripción
Breve descripción de los cambios realizados.

## 🎯 Tipo de Cambio
- [ ] 🐛 Bug fix
- [ ] ✨ Nueva característica
- [ ] 💥 Breaking change
- [ ] 📚 Documentación
- [ ] 🎨 Estilos/UI

## 🧪 Testing
- [ ] Probado en Chrome
- [ ] Probado en Firefox
- [ ] Probado en móvil
- [ ] Build de producción exitoso

## 📸 Screenshots
(Si aplica)

## 📋 Checklist
- [ ] Código sigue las convenciones del proyecto
- [ ] Cambios respetan la temática cultural
- [ ] Documentación actualizada si es necesario
- [ ] No hay console.logs olvidados
```

## 🎭 Consideraciones Culturales

### Elementos Permitidos
- **Símbolos tradicionales**: Calaveras, flores de cempasúchil, papel picado
- **Personajes folclóricos**: Catrina, mariachis, figuras tradicionales
- **Colores tradicionales**: Naranjas, morados, dorados, blancos
- **Elementos decorativos**: Patrones mexicanos, motivos florales

### Elementos a Evitar
- **Estereotipos negativos** sobre la cultura mexicana
- **Apropiación cultural** sin contexto educativo
- **Elementos no relacionados** con el Día de los Muertos
- **Representaciones irrespetuosas** de tradiciones sagradas

### Investigación Recomendada
- **Historia del Día de los Muertos**
- **Significado de los símbolos** utilizados
- **Tradiciones regionales** mexicanas
- **Arte popular mexicano**

## 🚀 Roadmap de Contribuciones

### Prioridad Alta
- [ ] **Accesibilidad mejorada** (ARIA labels, navegación por teclado)
- [ ] **Optimización móvil** (gestos, rendimiento)
- [ ] **Nuevas calaberitas** auténticas
- [ ] **Modo offline** completo

### Prioridad Media
- [ ] **Nuevos personajes** (Azteca, Adelita, etc.)
- [ ] **Efectos de sonido** temáticos
- [ ] **Modo multijugador** local
- [ ] **Estadísticas de juego**

### Prioridad Baja
- [ ] **Temas alternativos** (otras festividades mexicanas)
- [ ] **Personalización avanzada**
- [ ] **Integración con redes sociales**
- [ ] **Modo torneo**

## 🆘 Obtener Ayuda

### Canales de Comunicación
- **Issues de GitHub**: Para bugs y solicitudes de características
- **Discussions**: Para preguntas generales y ideas
- **Email**: Para temas sensibles culturales

### Recursos Útiles
- [Documentación de Bun](https://bun.sh/docs)
- [Guía de TypeScript](https://www.typescriptlang.org/docs/)
- [Información sobre Día de los Muertos](https://www.mexicanist.com/l/dia-de-los-muertos/)
- [Pixel Art Tutorials](https://blog.studiominiboss.com/pixelart)

## 🙏 Reconocimientos

Todas las contribuciones serán reconocidas en:
- **README principal** del proyecto
- **Sección de contribuidores** en la documentación
- **Changelog** de versiones
- **Créditos** en el juego (para contribuciones significativas)

---

**¡Gracias por ayudar a preservar y celebrar la hermosa tradición del Día de los Muertos a través de la tecnología! 🎭💀🌺**