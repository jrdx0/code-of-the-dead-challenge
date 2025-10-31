/**
 * El Mariachi Muerto SVG Component - Pixel Art Style
 * Skeleton musician with mariachi outfit and guitar
 * Size: 128x192px matching Catrina proportions
 */

export function MariachiSVG(): string {
  return `
    <svg 
      width="128" 
      height="192" 
      viewBox="0 0 128 192" 
      xmlns="http://www.w3.org/2000/svg"
      shape-rendering="crispEdges"
      class="mariachi-svg pixel-art"
    >
      <!-- Square sombrero (16x16 pixel sombrero) -->
      <rect x="24" y="8" width="80" height="8" fill="#2C3E50"/>
      <rect x="16" y="16" width="96" height="8" fill="#2C3E50"/>
      <rect x="48" y="24" width="32" height="16" fill="#2C3E50"/>
      
      <!-- Sombrero decorations -->
      <rect x="52" y="28" width="8" height="4" fill="#F1C40F"/>
      <rect x="68" y="28" width="8" height="4" fill="#F1C40F"/>
      <rect x="60" y="32" width="8" height="4" fill="#E74C3C"/>
      
      <!-- Skull/Face -->
      <rect x="40" y="40" width="48" height="40" fill="#FDF2E9"/>
      
      <!-- Eye sockets -->
      <rect x="48" y="48" width="8" height="8" fill="#2C3E50"/>
      <rect x="72" y="48" width="8" height="8" fill="#2C3E50"/>
      
      <!-- Mustache -->
      <rect x="52" y="60" width="24" height="4" fill="#2C3E50"/>
      <rect x="48" y="64" width="8" height="4" fill="#2C3E50"/>
      <rect x="72" y="64" width="8" height="4" fill="#2C3E50"/>
      
      <!-- Mouth -->
      <rect x="56" y="72" width="16" height="4" fill="#2C3E50"/>
      
      <!-- Neck -->
      <rect x="52" y="80" width="24" height="12" fill="#FDF2E9"/>
      
      <!-- Bow tie -->
      <rect x="56" y="88" width="16" height="8" fill="#E74C3C"/>
      <rect x="60" y="92" width="8" height="4" fill="#F1C40F"/>
      
      <!-- Charro suit jacket -->
      <rect x="32" y="96" width="64" height="40" fill="#2C3E50"/>
      
      <!-- Gold trim on jacket -->
      <rect x="32" y="96" width="64" height="4" fill="#F1C40F"/>
      <rect x="32" y="108" width="4" height="28" fill="#F1C40F"/>
      <rect x="92" y="108" width="4" height="28" fill="#F1C40F"/>
      <rect x="60" y="100" width="8" height="32" fill="#F1C40F"/>
      
      <!-- Jacket buttons -->
      <rect x="62" y="104" width="4" height="4" fill="#F1C40F"/>
      <rect x="62" y="116" width="4" height="4" fill="#F1C40F"/>
      <rect x="62" y="128" width="4" height="4" fill="#F1C40F"/>
      
      <!-- Arms -->
      <rect x="16" y="104" width="16" height="24" fill="#2C3E50"/>
      <rect x="96" y="104" width="16" height="24" fill="#2C3E50"/>
      
      <!-- Hands -->
      <rect x="20" y="128" width="8" height="12" fill="#FDF2E9"/>
      <rect x="100" y="128" width="8" height="12" fill="#FDF2E9"/>
      
      <!-- Pants -->
      <rect x="40" y="136" width="48" height="40" fill="#2C3E50"/>
      
      <!-- Pants decorative side stripes -->
      <rect x="40" y="136" width="4" height="40" fill="#F1C40F"/>
      <rect x="84" y="136" width="4" height="40" fill="#F1C40F"/>
      
      <!-- Boots -->
      <rect x="44" y="176" width="16" height="16" fill="#2C3E50"/>
      <rect x="68" y="176" width="16" height="16" fill="#2C3E50"/>
      
      <!-- Boot spurs -->
      <rect x="40" y="184" width="4" height="4" fill="#F1C40F"/>
      <rect x="84" y="184" width="4" height="4" fill="#F1C40F"/>
      
      <!-- Guitar (rectangular body) -->
      <rect x="4" y="140" width="20" height="32" fill="#8B4513"/>
      
      <!-- Guitar sound hole -->
      <rect x="10" y="152" width="8" height="8" fill="#2C3E50"/>
      
      <!-- Guitar neck -->
      <rect x="8" y="132" width="12" height="8" fill="#8B4513"/>
      
      <!-- Guitar strings -->
      <rect x="10" y="134" width="1" height="30" fill="#F1C40F"/>
      <rect x="12" y="134" width="1" height="30" fill="#F1C40F"/>
      <rect x="14" y="134" width="1" height="30" fill="#F1C40F"/>
      <rect x="16" y="134" width="1" height="30" fill="#F1C40F"/>
      
      <!-- Guitar decorative elements -->
      <rect x="6" y="148" width="4" height="4" fill="#E74C3C"/>
      <rect x="18" y="164" width="4" height="4" fill="#E74C3C"/>
    </svg>
  `;
}