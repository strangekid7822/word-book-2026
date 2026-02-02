/**
 * =============================================================================
 * APP.TSX - The Root Component of the Entire Application
 * =============================================================================
 *
 * This is where everything starts. When the app launches, this file runs first.
 *
 * WHAT THIS FILE DOES:
 * --------------------
 * 1. Imports global.css (required for NativeWind/Tailwind to work)
 * 2. Renders the AppNavigator (which handles all screen navigation)
 * 3. Shows the StatusBar (the bar at top with time, battery, etc.)
 *
 * YOU USUALLY DON'T NEED TO EDIT THIS FILE
 * Most changes happen in:
 * - src/screens/ (for new screens)
 * - src/navigation/AppNavigator.tsx (for navigation changes)
 * - src/constants/colors.js (for color changes)
 */

// Import global CSS - REQUIRED for NativeWind (Tailwind) to work
import "./global.css";

// StatusBar controls the top bar appearance (light/dark mode)
import { StatusBar } from "expo-status-bar";

// AppNavigator handles all the screen routing
import AppNavigator from "./src/navigation/AppNavigator";

// =============================================================================
// ROOT APP COMPONENT
// =============================================================================

export default function App() {
  return (
    <>
      {/* AppNavigator renders the current screen based on navigation state */}
      <AppNavigator />

      {/* StatusBar with "auto" adapts to light/dark mode automatically */}
      <StatusBar style="auto" />
    </>
  );
}
