/**
 * =============================================================================
 * BABEL.CONFIG.JS - JavaScript Compiler Configuration
 * =============================================================================
 *
 * Babel transforms modern JavaScript/TypeScript into code that can run
 * on all devices. Think of it as a "translator" for your code.
 *
 * WHAT THIS FILE DOES:
 * --------------------
 * - Uses "babel-preset-expo" to handle Expo-specific transformations
 * - Configures "jsxImportSource: nativewind" so Tailwind classes work
 *
 * YOU USUALLY DON'T NEED TO EDIT THIS FILE
 * unless you're adding new Babel plugins.
 */

module.exports = function (api) {
  // Cache the configuration for better performance
  api.cache(true);

  return {
    presets: [
      // babel-preset-expo handles all the Expo/React Native transformations
      // jsxImportSource: "nativewind" enables Tailwind className support
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
    ],
  };
};
