/**
 * La Calavera SVG Component - Pixel Art Style
 * Colorful decorated sugar skull with geometric patterns
 * Size: 128x128px (perfect square) for consistent pixel grid
 */

export function CalaveraSVG(): string {
  return `
    <svg 
      width="128" 
      height="128" 
      viewBox="0 0 128 128" 
      xmlns="http://www.w3.org/2000/svg"
      shape-rendering="crispEdges"
      class="calavera-svg pixel-art"
    >
      <!-- Main skull base -->
      <rect x="16" y="16" width="96" height="96" fill="#FDF2E9"/>
      
      <!-- Skull outline -->
      <rect x="12" y="20" width="4" height="88" fill="#FF6B35"/>
      <rect x="112" y="20" width="4" height="88" fill="#FF6B35"/>
      <rect x="16" y="12" width="96" height="4" fill="#FF6B35"/>
      <rect x="16" y="112" width="96" height="4" fill="#FF6B35"/>
      
      <!-- Square eye sockets -->
      <rect x="32" y="32" width="16" height="16" fill="#2C3E50"/>
      <rect x="80" y="32" width="16" height="16" fill="#2C3E50"/>
      
      <!-- Eye decorations -->
      <rect x="28" y="28" width="8" height="8" fill="#8E44AD"/>
      <rect x="92" y="28" width="8" height="8" fill="#8E44AD"/>
      <rect x="28" y="48" width="8" height="8" fill="#8E44AD"/>
      <rect x="92" y="48" width="8" height="8" fill="#8E44AD"/>
      
      <!-- Nasal cavity -->
      <rect x="56" y="56" width="16" height="20" fill="#2C3E50"/>
      <rect x="60" y="52" width="8" height="4" fill="#2C3E50"/>
      
      <!-- Mouth with teeth -->
      <rect x="40" y="84" width="48" height="16" fill="#2C3E50"/>
      <!-- Teeth -->
      <rect x="44" y="88" width="4" height="8" fill="#FDF2E9"/>
      <rect x="52" y="88" width="4" height="8" fill="#FDF2E9"/>
      <rect x="60" y="88" width="4" height="8" fill="#FDF2E9"/>
      <rect x="68" y="88" width="4" height="8" fill="#FDF2E9"/>
      <rect x="76" y="88" width="4" height="8" fill="#FDF2E9"/>
      
      <!-- Geometric floral patterns (8x8 pixel flowers) -->
      <!-- Top center flower -->
      <rect x="60" y="20" width="8" height="8" fill="#FF6B35"/>
      <rect x="56" y="24" width="4" height="4" fill="#8E44AD"/>
      <rect x="68" y="24" width="4" height="4" fill="#8E44AD"/>
      
      <!-- Left side decorations -->
      <rect x="24" y="60" width="8" height="8" fill="#FF6B35"/>
      <rect x="20" y="64" width="4" height="4" fill="#8E44AD"/>
      
      <!-- Right side decorations -->
      <rect x="96" y="60" width="8" height="8" fill="#FF6B35"/>
      <rect x="104" y="64" width="4" height="4" fill="#8E44AD"/>
      
      <!-- Forehead decorations (4x4 pixel geometric patterns) -->
      <rect x="40" y="24" width="4" height="4" fill="#F1C40F"/>
      <rect x="48" y="28" width="4" height="4" fill="#F1C40F"/>
      <rect x="76" y="28" width="4" height="4" fill="#F1C40F"/>
      <rect x="84" y="24" width="4" height="4" fill="#F1C40F"/>
      
      <!-- Cheek decorations -->
      <rect x="24" y="72" width="4" height="4" fill="#8E44AD"/>
      <rect x="100" y="72" width="4" height="4" fill="#8E44AD"/>
      
      <!-- Bottom decorative elements -->
      <rect x="32" y="104" width="8" height="4" fill="#FF6B35"/>
      <rect x="48" y="108" width="8" height="4" fill="#FF6B35"/>
      <rect x="72" y="108" width="8" height="4" fill="#FF6B35"/>
      <rect x="88" y="104" width="8" height="4" fill="#FF6B35"/>
      
      <!-- Additional geometric patterns -->
      <rect x="52" y="40" width="4" height="4" fill="#F1C40F"/>
      <rect x="72" y="40" width="4" height="4" fill="#F1C40F"/>
      <rect x="44" y="76" width="4" height="4" fill="#8E44AD"/>
      <rect x="80" y="76" width="4" height="4" fill="#8E44AD"/>
    </svg>
  `;
}