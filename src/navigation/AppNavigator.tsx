/**
 * =============================================================================
 * APP NAVIGATOR - Controls Which Screens Users See
 * =============================================================================
 *
 * This file sets up the navigation system for the entire app.
 * Think of it as a "traffic controller" that decides which screen to show.
 *
 * HOW NAVIGATION WORKS:
 * ---------------------
 * 1. NavigationContainer wraps everything (required by React Navigation)
 * 2. Stack.Navigator creates a "stack" of screens (like a deck of cards)
 * 3. Stack.Screen registers each screen with a name
 *
 * TO ADD A NEW SCREEN:
 * --------------------
 * 1. Create the screen component in src/screens/
 * 2. Import it here
 * 3. Add a new Stack.Screen entry
 *
 * Example:
 *   import HomeScreen from '../screens/HomeScreen';
 *   <Stack.Screen name="Home" component={HomeScreen} />
 *
 * TO NAVIGATE BETWEEN SCREENS:
 * ----------------------------
 * In any screen component, use:
 *   navigation.navigate('ScreenName')
 *   navigation.navigate('ScreenName', { data: 'to pass' })
 */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import all screens
import WelcomeScreen from "../screens/WelcomeScreen";
// import HomeScreen from '../screens/HomeScreen';  // Add when created

// =============================================================================
// STACK NAVIGATOR SETUP
// =============================================================================

// Create the stack navigator instance
// "Stack" navigation means screens stack on top of each other
// Going to a new screen = pushing a card on the stack
// Going back = removing the top card
const Stack = createNativeStackNavigator();

// =============================================================================
// MAIN NAVIGATOR COMPONENT
// =============================================================================

export default function AppNavigator() {
  return (
    // NavigationContainer is the root - must wrap everything
    <NavigationContainer>
      {/* Stack.Navigator holds all our screens */}
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Hide the default header bar on all screens
        }}
      >
        {/* ================================================================= */}
        {/* WELCOME SCREEN - First screen users see (phone input) */}
        {/* ================================================================= */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />

        {/* ================================================================= */}
        {/* ADD MORE SCREENS HERE */}
        {/* ================================================================= */}
        {/* Example:
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
