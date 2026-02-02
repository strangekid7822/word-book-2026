/**
 * =============================================================================
 * WELCOME SCREEN - The First Screen Users See
 * =============================================================================
 *
 * This is the app's landing page where users enter their phone number to start.
 *
 * FEATURES:
 * ---------
 * - App logo with glowing effect
 * - App title "单词王者"
 * - Phone number input field
 * - Animated send button (appears when user types)
 * - Phone validation (must be 11 digits)
 *
 * NAVIGATION:
 * -----------
 * After entering valid phone → navigates to Home screen
 */

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Animated,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Import colors from our theme (single source of truth)
import { colors } from "../constants/theme";

// =============================================================================
// COMPONENT
// =============================================================================

export default function WelcomeScreen({ navigation }: any) {
  // ---------------------------------------------------------------------------
  // STATE - Data that can change and triggers re-render
  // ---------------------------------------------------------------------------
  const [phone, setPhone] = useState(""); // User's phone number input
  const [error, setError] = useState(""); // Error message (if validation fails)
  const [isFocused, setIsFocused] = useState(false); // Is input field focused?

  // ---------------------------------------------------------------------------
  // ANIMATION VALUES - For the animated send button
  // ---------------------------------------------------------------------------
  // These values control the button's scale (size) and opacity (visibility)
  const buttonScale = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  // ---------------------------------------------------------------------------
  // ANIMATION EFFECT - Show/hide button based on input
  // ---------------------------------------------------------------------------
  // When phone input changes, animate the button in or out
  React.useEffect(() => {
    if (phone.length > 0) {
      // Phone has text → animate button IN (scale up, fade in)
      Animated.parallel([
        Animated.timing(buttonScale, {
          toValue: 1, // Full size
          duration: 300, // 300 milliseconds
          useNativeDriver: true, // Better performance
        }),
        Animated.timing(buttonOpacity, {
          toValue: 1, // Fully visible
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Phone is empty → animate button OUT (scale down, fade out)
      Animated.parallel([
        Animated.timing(buttonScale, {
          toValue: 0, // Zero size
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(buttonOpacity, {
          toValue: 0, // Invisible
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [phone]); // Run this effect whenever 'phone' changes

  // ---------------------------------------------------------------------------
  // HANDLERS - Functions that respond to user actions
  // ---------------------------------------------------------------------------

  /**
   * Called when user taps the "发送" (Send) button
   * Validates phone number and navigates to Home if valid
   */
  const handleSend = () => {
    // Check if phone is exactly 11 digits (Chinese phone number format)
    if (phone.length !== 11) {
      setError("请输入11位手机号码"); // "Please enter 11-digit phone number"
      return;
    }

    // Phone is valid → clear error and navigate to Home screen
    setError("");
    navigation.navigate("Home", { phone }); // Pass phone number to Home screen
  };

  // ---------------------------------------------------------------------------
  // RENDER - What the user sees
  // ---------------------------------------------------------------------------
  return (
    // KeyboardAvoidingView prevents keyboard from covering the input
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {/* ================================================================= */}
        {/* TOP GRADIENT - Creates the blue glow at top of screen */}
        {/* ================================================================= */}
        <LinearGradient
          colors={[colors.shadow, "rgba(0, 170, 249, 0)"]} // Blue → transparent
          style={styles.topShadow}
          pointerEvents="none" // Don't block touches
        />

        {/* ================================================================= */}
        {/* LOGO SECTION - Avatar with glowing effect */}
        {/* ================================================================= */}
        {/* Outer glow layer */}
        <View style={styles.logoGlowOuter}>
          {/* Inner glow layer */}
          <View style={styles.logoGlowInner}>
            {/* Actual logo container */}
            <View style={styles.logoContainer}>
              <Image
                source={require("../../assets/wolfe_avatar.png")}
                style={styles.logoImage}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>

        {/* ================================================================= */}
        {/* TITLE - App name */}
        {/* ================================================================= */}
        <Text style={styles.title}>单词王者</Text>

        {/* ================================================================= */}
        {/* ERROR MESSAGE - Shows when phone validation fails */}
        {/* ================================================================= */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* ================================================================= */}
        {/* PHONE INPUT SECTION - Input field with send button inside */}
        {/* ================================================================= */}
        <View
          style={[
            styles.inputContainer,
            // Change border color when focused
            { borderColor: isFocused ? colors.primary : "#E8F4FD" },
          ]}
        >
          {/* Phone number input field */}
          <TextInput
            placeholder="输入电话开始学习" // "Enter phone to start learning"
            placeholderTextColor="#A0AEC0"
            keyboardType="phone-pad" // Show number keyboard
            value={phone}
            onChangeText={(text) => {
              // Only allow numbers (remove any non-digit characters)
              setPhone(text.replace(/[^0-9]/g, ""));
              setError(""); // Clear error when user types
            }}
            onFocus={() => setIsFocused(true)} // Track focus state
            onBlur={() => setIsFocused(false)}
            style={[
              styles.input,
              // Add padding when button is hidden to center text
              { paddingRight: phone.length > 0 ? 0 : 20 },
            ]}
            maxLength={11} // Max 11 digits
          />

          {/* ============================================================= */}
          {/* SEND BUTTON - Animated, appears when user types */}
          {/* ============================================================= */}
          <Animated.View
            style={{
              transform: [{ scale: buttonScale }], // Scale animation
              opacity: buttonOpacity, // Fade animation
            }}
          >
            <TouchableOpacity onPress={handleSend} activeOpacity={0.85}>
              {/* Gradient background for the button */}
              <LinearGradient
                colors={["#5AC8FA", colors.primary]} // Light blue → primary blue
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.sendButton}
              >
                <Text style={styles.sendButtonText}>发送</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

// =============================================================================
// STYLES - All the visual styling for this screen
// =============================================================================

const styles = StyleSheet.create({
  // ---------------------------------------------------------------------------
  // Main container - full screen with centered content
  // ---------------------------------------------------------------------------
  container: {
    flex: 1, // Take up all available space
    alignItems: "center", // Center children horizontally
    justifyContent: "center", // Center children vertically
    backgroundColor: colors.tertiary, // Light blue background
  },

  // ---------------------------------------------------------------------------
  // Top shadow gradient - creates the blue glow at top
  // ---------------------------------------------------------------------------
  topShadow: {
    position: "absolute", // Position independently
    top: 0,
    left: 0,
    right: 0,
    height: 120, // How far the glow extends
  },

  // ---------------------------------------------------------------------------
  // Logo glow layers - creates the glowing effect around the avatar
  // ---------------------------------------------------------------------------
  logoGlowOuter: {
    width: 160,
    height: 160,
    borderRadius: 80, // Circle
    backgroundColor: "rgba(0, 170, 249, 0.08)", // Very subtle blue
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  logoGlowInner: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(0, 170, 249, 0.12)", // Slightly more visible blue
    alignItems: "center",
    justifyContent: "center",
  },

  // ---------------------------------------------------------------------------
  // Logo container - holds the actual avatar image
  // ---------------------------------------------------------------------------
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60, // Circle
    borderWidth: 3,
    borderColor: colors.white, // White border
    overflow: "hidden", // Clip image to circle
    backgroundColor: "#E5E7EB", // Fallback color
    // Shadow/glow effect
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10, // Android shadow
  },

  logoImage: {
    width: "100%",
    height: "100%",
  },

  // ---------------------------------------------------------------------------
  // Title text
  // ---------------------------------------------------------------------------
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 24,
  },

  // ---------------------------------------------------------------------------
  // Error message text
  // ---------------------------------------------------------------------------
  errorText: {
    color: colors.pink, // Pink/red for errors
    fontSize: 14,
    marginBottom: 8,
  },

  // ---------------------------------------------------------------------------
  // Input container - the pill-shaped input field
  // ---------------------------------------------------------------------------
  inputContainer: {
    width: "85%",
    maxWidth: 360,
    height: 52,
    borderRadius: 9999, // Very large = pill shape
    backgroundColor: colors.white,
    borderWidth: 2,
    flexDirection: "row", // Layout children in a row
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 6,
    // Subtle shadow
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  // ---------------------------------------------------------------------------
  // Text input
  // ---------------------------------------------------------------------------
  input: {
    flex: 1, // Take remaining space
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },

  // ---------------------------------------------------------------------------
  // Send button
  // ---------------------------------------------------------------------------
  sendButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 9999, // Pill shape
    // Button glow
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  sendButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "600",
  },
});
