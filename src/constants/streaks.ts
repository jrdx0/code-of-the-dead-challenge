/**
 * Streak System Constants
 * Defines streak levels, rewards, and messages for the game
 */

export interface StreakLevel {
  threshold: number;
  name: string;
  displayName: string;
  description: string;
  emoji: string;
  color: string;
  celebration: boolean;
}

export const STREAK_LEVELS: StreakLevel[] = [
  {
    threshold: 3,
    name: 'hot_streak',
    displayName: 'Racha Caliente',
    description: '¡3 victorias seguidas! Los espíritus te sonríen',
    emoji: '🔥',
    color: 'var(--primary-orange)',
    celebration: true
  },
  {
    threshold: 5,
    name: 'blazing_streak',
    displayName: 'Racha Ardiente',
    description: '¡5 victorias seguidas! Eres imparable como La Catrina',
    emoji: '⚡',
    color: 'var(--accent-gold)',
    celebration: true
  },
  {
    threshold: 7,
    name: 'legendary_streak',
    displayName: 'Racha Legendaria',
    description: '¡7 victorias seguidas! Los ancestros celebran contigo',
    emoji: '👑',
    color: 'var(--secondary-purple)',
    celebration: true
  },
  {
    threshold: 10,
    name: 'mythical_streak',
    displayName: 'Racha Mítica',
    description: '¡10 victorias seguidas! Eres una leyenda del Día de los Muertos',
    emoji: '💀',
    color: 'var(--pixel-white)',
    celebration: true
  },
  {
    threshold: 15,
    name: 'eternal_streak',
    displayName: 'Racha Eterna',
    description: '¡15 victorias seguidas! Tu espíritu trasciende la muerte',
    emoji: '🌟',
    color: 'var(--accent-gold)',
    celebration: true
  }
];

export const STREAK_MESSAGES = {
  start: [
    '¡Comienza tu racha de victorias!',
    '¡Los espíritus te acompañan!',
    '¡Que inicie la celebración!'
  ],
  continue: [
    '¡Sigue así, guerrero!',
    '¡La racha continúa!',
    '¡Los ancestros están orgullosos!'
  ],
  broken: [
    'La racha se ha roto, pero el espíritu permanece',
    'Cada final es un nuevo comienzo',
    'Los espíritus esperan tu regreso'
  ]
};

export function getStreakLevel(streak: number): StreakLevel | null {
  // Find the highest streak level that the current streak meets
  let currentLevel: StreakLevel | null = null;
  
  for (const level of STREAK_LEVELS) {
    if (streak >= level.threshold) {
      currentLevel = level;
    } else {
      break;
    }
  }
  
  return currentLevel;
}

export function getNextStreakLevel(streak: number): StreakLevel | null {
  for (const level of STREAK_LEVELS) {
    if (streak < level.threshold) {
      return level;
    }
  }
  return null; // Already at max level
}

export function isNewStreakLevel(streak: number): boolean {
  return STREAK_LEVELS.some(level => level.threshold === streak);
}

export function getRandomStreakMessage(type: keyof typeof STREAK_MESSAGES): string {
  const messages = STREAK_MESSAGES[type];
  return messages[Math.floor(Math.random() * messages.length)];
}