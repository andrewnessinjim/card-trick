export const DEFAULT_CARD_HEIGHT_DESKTOP = 160;
export const DEFAULT_CARD_HEIGHT_MOBILE = 80;

export const CARD_MOVE_STAGGER_DELAY = 0.1;

const BREAKPOINTS = {
  tabletMax: 950,
  phoneMax: 600,
};

export const MEDIA_QUERIES = {
  tabletAndBelow: `(max-width: ${BREAKPOINTS.tabletMax / 16}rem)`,
  phoneAndBelow: `(max-width: ${BREAKPOINTS.phoneMax / 16}rem)`,
};
