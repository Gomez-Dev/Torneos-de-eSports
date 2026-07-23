/**
 * Estados y categorías permitidas para los torneos de eSports.
 */
export const EVENT_STATUS = Object.freeze({
  UPCOMING: 'UPCOMING',
  ONGOING: 'ONGOING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
});

export const EVENT_CATEGORIES = Object.freeze({
  FPS: 'FPS',          // CS2, Valorant
  MOBA: 'MOBA',        // League of Legends, Dota 2
  SPORTS: 'SPORTS',    // FIFA, NBA 2K
  FIGHTING: 'FIGHTING',// Street Fighter, Tekken
  STRATEGY: 'STRATEGY',// Age of Empires, StarCraft
});
