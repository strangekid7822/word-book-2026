/**
 * =============================================================================
 * TAILWIND.CONFIG.JS - Tailwind CSS Configuration
 * =============================================================================
 *
 * This file configures Tailwind CSS for use with NativeWind in React Native.
 *
 * WHAT THIS FILE DOES:
 * --------------------
 * - Tells Tailwind which files to scan for class names
 * - Imports colors from colors.js (single source of truth)
 * - Enables NativeWind preset for React Native compatibility
 *
 * HOW TAILWIND CLASSES WORK:
 * --------------------------
 * You can use these classes in your components:
 *   <View className="bg-primary" />        // Primary blue background
 *   <Text className="text-secondary" />    // Secondary blue text
 *   <View className="bg-tertiary" />       // Light background
 *
 * HOW TO UPDATE COLORS:
 * ---------------------
 * Edit src/constants/colors.js - this file imports from there automatically!
 */

// Import colors from the single source of truth
const { tailwindColors } = require("./src/constants/colors.js");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // ---------------------------------------------------------------------------
  // Content - Tell Tailwind which files to scan for class names
  // ---------------------------------------------------------------------------
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],

  // ---------------------------------------------------------------------------
  // Presets - Use NativeWind preset for React Native compatibility
  // ---------------------------------------------------------------------------
  presets: [require("nativewind/preset")],

  // ---------------------------------------------------------------------------
  // Theme - Customize colors, fonts, spacing, etc.
  // ---------------------------------------------------------------------------
  theme: {
    extend: {
      // Colors imported from colors.js (single source of truth)
      colors: tailwindColors,

      // Font family - use "font-inter" class to apply
      fontFamily: {
        inter: ["Inter", "System"],
      },
    },
  },

  // ---------------------------------------------------------------------------
  // Plugins - Add extra Tailwind features (none currently)
  // ---------------------------------------------------------------------------
  plugins: [],
};
