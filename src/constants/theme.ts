/**
 * =============================================================================
 * THEME.TS - Theme Exports for TypeScript Components
 * =============================================================================
 *
 * This file re-exports colors from colors.js for use in TypeScript components.
 * The actual color values are defined in colors.js (single source of truth).
 *
 * HOW TO USE IN COMPONENTS:
 * -------------------------
 * import { colors } from '../constants/theme';
 *
 * <View style={{ backgroundColor: colors.primary }} />
 * <Text style={{ color: colors.pink }}>Error!</Text>
 *
 * HOW TO UPDATE COLORS:
 * ---------------------
 * Edit colors.js (NOT this file) - both Tailwind and inline styles will update!
 */

// Import colors from the single source of truth (colors.js)
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { colors: importedColors } = require("./colors.js");

// =============================================================================
// COLORS - Re-exported for TypeScript type safety
// =============================================================================

export const colors: {
  primary: string;
  secondary: string;
  tertiary: string;
  white: string;
  black: string;
  grey: string;
  greyDarker: string;
  pink: string;
  green: string;
  orange: string;
  shadow: string;
  feedback: {
    lightGreen: string;
    darkGreen: string;
    lightPink: string;
    darkPink: string;
  };
} = importedColors;

// =============================================================================
// FONTS
// =============================================================================

export const fonts = {
  // Default system font - works on all devices without loading custom fonts
  // Change to "Inter" if you load the Inter font family
  family: "System",
};
