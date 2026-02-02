/**
 * =============================================================================
 * METRO.CONFIG.JS - Metro Bundler Configuration
 * =============================================================================
 *
 * Metro is the JavaScript bundler for React Native. It takes all your code
 * and packages it into a bundle that can run on iOS/Android.
 *
 * WHAT THIS FILE DOES:
 * --------------------
 * - Gets the default Expo Metro configuration
 * - Adds NativeWind support using withNativeWind wrapper
 * - Points to global.css as the input for Tailwind styles
 *
 * YOU USUALLY DON'T NEED TO EDIT THIS FILE
 * unless you're adding custom Metro configurations.
 */

// Get the default Expo Metro configuration
const { getDefaultConfig } = require("expo/metro-config");

// NativeWind wrapper to enable Tailwind CSS support
const { withNativeWind } = require("nativewind/metro");

// Get the default config for this project
const config = getDefaultConfig(__dirname);

// Export the config wrapped with NativeWind
// "input" points to the CSS file that contains Tailwind directives
module.exports = withNativeWind(config, { input: "./global.css" });
