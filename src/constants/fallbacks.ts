/**
 * Fallback calaberitas for when MCP service is unavailable
 * Traditional Day of the Dead verses in Spanish
 */

export const FALLBACK_CALABERITAS = {
  selection: [
    "Elige tu personaje, querido jugador,\nque el destino te sonría con favor",
    "En esta noche de muertos y flores,\n¿cuál será tu elección entre colores?",
    "Catrina, Calavera o Mariachi,\nelige bien tu suerte, ¡qué tal si!",
    "Los muertos bailan en esta ocasión,\n¿cuál será tu mejor decisión?",
    "Entre pétalos de cempasúchil,\nelige tu personaje más sutil"
  ],
  
  victory: [
    "¡Ay, querido amigo, has perdido el round,\nla máquina baila al son del sound!",
    "La computadora te ha ganado esta vez,\n¡pero no te rindas, juega otra vez!",
    "En el panteón de los derrotados,\ntu personaje ha sido sepultado",
    "La Catrina ríe con gran alegría,\n¡la computadora ganó este día!",
    "Como papel picado al viento vas,\n¡mejor suerte la próxima tendrás!",
    "Los muertos celebran la derrota,\n¡pero tu espíritu nunca se agota!",
    "En esta danza de vida y muerte,\n¡la computadora tuvo más suerte!",
    "Que no te dé pena la derrota,\n¡en el Día de Muertos todo se nota!"
  ],
  
  defeat: [
    "¡Qué victoria tan dulce has logrado,\nel destino te ha favorecido!",
    "Como flor de cempasúchil brillante,\n¡tu triunfo es elegante!",
    "La computadora llora su derrota,\n¡tu victoria se nota!",
    "En el altar de los ganadores,\ntu nombre está entre los mejores",
    "¡Viva el jugador victorioso,\nque su triunfo es glorioso!"
  ]
} as const;

/**
 * Character-specific calaberitas for selection phase
 */
export const CHARACTER_SPECIFIC_CALABERITAS = {
  catrina: [
    "La Catrina elegante te llama,\ncon su vestido púrpura y su fama",
    "Dama de la muerte tan señorial,\n¿será tu elección la ideal?",
    "Con sombrero de flores adornado,\nla Catrina te ha enamorado"
  ],
  calavera: [
    "La Calavera colorida sonríe,\ncon sus flores que nunca se marchita",
    "Cráneo festivo de tradición,\n¿será tu mejor decisión?",
    "Con pétalos de cempasúchil,\nla Calavera es muy sutil"
  ],
  mariachi: [
    "El Mariachi toca su canción,\ndesde el más allá con emoción",
    "Con guitarra y sombrero galán,\n¿será tu elección, capitán?",
    "Músico eterno del panteón,\n¿te gusta su melodía y son?"
  ]
} as const;

/**
 * Character-specific victory calaberitas when computer wins
 */
export const VICTORY_CALABERITAS = {
  catrina_wins: [
    "La Catrina baila con elegancia,\n¡tu derrota es su ganancia!",
    "Con su vestido púrpura ondea,\n¡la Catrina te vapulea!"
  ],
  calavera_wins: [
    "La Calavera ríe a carcajadas,\n¡tus esperanzas fueron nada!",
    "Con flores de cempasúchil,\n¡la Calavera fue más hábil!"
  ],
  mariachi_wins: [
    "El Mariachi toca victoria,\n¡cantando tu triste historia!",
    "Con guitarra y gran destreza,\n¡el Mariachi te da tristeza!"
  ],
  catrina_loses: [
    "La Catrina llora su derrota,\n¡pero tu victoria se nota!",
    "Elegante pero derrotada,\n¡la Catrina queda humillada!"
  ],
  calavera_loses: [
    "La Calavera pierde colores,\n¡vencida por tus valores!",
    "Sin flores de cempasúchil,\n¡la Calavera no fue sutil!"
  ],
  mariachi_loses: [
    "El Mariachi calla su canción,\n¡vencido por tu decisión!",
    "Sin guitarra que tocar,\n¡el Mariachi debe llorar!"
  ]
} as const;

/**
 * Get a random fallback calaberita for the specified context
 */
export function getRandomFallbackCalaverita(type: 'selection' | 'victory' | 'defeat', character?: string, computerCharacter?: string): string {
  // If it's a selection type and we have a character, try character-specific first
  if (type === 'selection' && character && character in CHARACTER_SPECIFIC_CALABERITAS) {
    const characterCalaberas = CHARACTER_SPECIFIC_CALABERITAS[character as keyof typeof CHARACTER_SPECIFIC_CALABERITAS];
    const randomIndex = Math.floor(Math.random() * characterCalaberas.length);
    return characterCalaberas[randomIndex];
  }
  
  // If it's a victory type and we have computer character, try character-specific victory
  if (type === 'victory' && computerCharacter) {
    const victoryKey = `${computerCharacter}_wins` as keyof typeof VICTORY_CALABERITAS;
    if (victoryKey in VICTORY_CALABERITAS) {
      const victoryCalaberas = VICTORY_CALABERITAS[victoryKey];
      const randomIndex = Math.floor(Math.random() * victoryCalaberas.length);
      return victoryCalaberas[randomIndex];
    }
  }
  
  // Fall back to general calaberitas
  const calaberitas = FALLBACK_CALABERITAS[type];
  const randomIndex = Math.floor(Math.random() * calaberitas.length);
  return calaberitas[randomIndex];
}