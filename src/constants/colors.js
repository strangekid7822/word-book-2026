/**
 * =============================================================================
 * COLORS.JS - The TRUE Single Source of Colors
 * =============================================================================
 *
 * WHY THIS FILE EXISTS:
 * ---------------------
 * - tailwind.config.js can only import JavaScript files (not TypeScript)
 * - So we define colors here in plain JavaScript
 * - Both tailwind.config.js and theme.ts import from this file
 * - This ensures ONE source of truth for all colors!
 *
 * HOW TO UPDATE COLORS:
 * ---------------------
 * 1. Edit this file (colors.js)
 * 2. That's it! Both Tailwind and inline styles will use the new values
 */

// Colors for inline styles (camelCase - JavaScript convention)
const colors = {
  primary: "#00AAF9",
  secondary: "#87D9FF",
  tertiary: "#F3FBFF",
  white: "#FFFFFF",
  black: "#000000",
  grey: "#D9D9D9",
  greyDarker: "#9B9B9B",
  pink: "#FF7787",
  green: "#95FF87",
  orange: "#FF5900",
  shadow: "rgba(0, 170, 249, 0.3)",
  feedback: {
    lightGreen: "rgba(34, 197, 94, 0.4)",
    darkGreen: "rgba(34, 197, 94, 0.9)",
    lightPink: "rgba(236, 72, 153, 0.4)",
    darkPink: "rgba(236, 72, 153, 0.9)",
  },
};

// Colors for Tailwind (kebab-case - Tailwind convention)
const tailwindColors = {
  primary: colors.primary,
  secondary: colors.secondary,
  tertiary: colors.tertiary,
  grey: colors.grey,
  "grey-darker": colors.greyDarker,
  pink: colors.pink,
  green: colors.green,
  orange: colors.orange,
  shadow: colors.shadow,
  feedback: {
    "light-green": colors.feedback.lightGreen,
    "dark-green": colors.feedback.darkGreen,
    "light-pink": colors.feedback.lightPink,
    "dark-pink": colors.feedback.darkPink,
  },
};

module.exports = { colors, tailwindColors };
