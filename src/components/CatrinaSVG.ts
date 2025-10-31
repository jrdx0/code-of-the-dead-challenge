/**
 * La Catrina SVG Component - Pixel Art Style
 * Elegant skeletal figure in Victorian dress with decorative hat
 * Size: 128x192px (4:3 ratio) for pixel-perfect scaling
 */

export function CatrinaSVG(): string {
  return `
    <svg 
      width="128" 
      height="192" 
      viewBox="0 0 128 192" 
      xmlns="http://www.w3.org/2000/svg"
      shape-rendering="crispEdges"
      class="catrina-svg pixel-art"
    >
      <!-- Hat brim (32px wide) -->
      <rect x="32" y="8" width="64" height="8" fill="#2C3E50"/>
      <rect x="24" y="16" width="80" height="8" fill="#2C3E50"/>
      
      <!-- Hat crown -->
      <rect x="40" y="24" width="48" height="24" fill="#2C3E50"/>
      
      <!-- Hat decorative flowers (pixelated) -->
      <rect x="48" y="32" width="8" height="8" fill="#F1C40F"/>
      <rect x="72" y="32" width="8" height="8" fill="#F1C40F"/>
      <rect x="56" y="28" width="16" height="4" fill="#FF6B35"/>
      
      <!-- Skull/Face -->
      <rect x="40" y="48" width="48" height="40" fill="#FDF2E9"/>
      
      <!-- Eye sockets -->
      <rect x="48" y="56" width="8" height="8" fill="#2C3E50"/>
      <rect x="72" y="56" width="8" height="8" fill="#2C3E50"/>
      
      <!-- Nasal cavity -->
      <rect x="60" y="68" width="8" height="12" fill="#2C3E50"/>
      
      <!-- Mouth -->
      <rect x="52" y="80" width="24" height="4" fill="#2C3E50"/>
      
      <!-- Neck -->
      <rect x="52" y="88" width="24" height="16" fill="#FDF2E9"/>
      
      <!-- Dress bodice -->
      <rect x="32" y="104" width="64" height="32" fill="#8E44AD"/>
      
      <!-- Dress sleeves -->
      <rect x="16" y="112" width="16" height="24" fill="#8E44AD"/>
      <rect x="96" y="112" width="16" height="24" fill="#8E44AD"/>
      
      <!-- Arms/hands -->
      <rect x="20" y="136" width="8" height="16" fill="#FDF2E9"/>
      <rect x="100" y="136" width="8" height="16" fill="#FDF2E9"/>
      
      <!-- Dress skirt (rectangular) -->
      <rect x="24" y="136" width="80" height="48" fill="#8E44AD"/>
      
      <!-- Gold dress trim -->
      <rect x="24" y="136" width="80" height="4" fill="#F1C40F"/>
      <rect x="24" y="148" width="80" height="4" fill="#F1C40F"/>
      <rect x="24" y="160" width="80" height="4" fill="#F1C40F"/>
      <rect x="24" y="172" width="80" height="4" fill="#F1C40F"/>
      
      <!-- Dress decorative pattern -->
      <rect x="40" y="140" width="8" height="8" fill="#F1C40F"/>
      <rect x="56" y="152" width="8" height="8" fill="#F1C40F"/>
      <rect x="72" y="164" width="8" height="8" fill="#F1C40F"/>
      <rect x="48" y="176" width="8" height="8" fill="#F1C40F"/>
      
      <!-- Feet -->
      <rect x="40" y="184" width="16" height="8" fill="#2C3E50"/>
      <rect x="72" y="184" width="16" height="8" fill="#2C3E50"/>
    </svg>
  `;
}