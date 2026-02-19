/**
 * WELCOME SCREEN - Phone input landing page
 *
 * Features: Logo with glow, phone input, animated send button
 * Navigation: Valid phone → Home screen
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
import Svg, { Defs, Filter, FeGaussianBlur, Circle as SvgCircle } from "react-native-svg";
import { colors } from "../constants/theme";

const CANVAS_SIZE = 240; // 120px circle + 40px glow on each side + padding
const CX = CANVAS_SIZE / 2;
const RADIUS = 60;

export default function WelcomeScreen({ navigation }: any) {
  // State
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Animation values for send button
  const buttonScale = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  // Animate button in/out when phone input changes
  React.useEffect(() => {
    const toValue = phone.length > 0 ? 1 : 0;
    Animated.parallel([
      Animated.timing(buttonScale, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(buttonOpacity, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [phone]);

  // Validate and navigate
  const handleSend = () => {
    if (phone.length !== 11) {
      setError("请输入11位手机号码");
      return;
    }
    setError("");
    navigation.navigate("Home", { phone });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        {/* Top gradient glow */}
        <LinearGradient
          colors={["rgba(0, 170, 249, 0.15)", "transparent"]}
          style={styles.topShadow}
          pointerEvents="none"
        />

        {/* Logo with real Gaussian blur glow via SVG filters */}
        <View style={styles.logoWrapper}>
          <Svg style={styles.glowCanvas} width={CANVAS_SIZE} height={CANVAS_SIZE}>
            <Defs>
              <Filter id="glow1" x="-100%" y="-100%" width="300%" height="300%">
                <FeGaussianBlur stdDeviation="20" />
              </Filter>
              <Filter id="glow2" x="-100%" y="-100%" width="300%" height="300%">
                <FeGaussianBlur stdDeviation="40" />
              </Filter>
            </Defs>
            <SvgCircle cx={CX} cy={CX} r={RADIUS} fill="rgba(0,170,249,0.2)" filter="url(#glow2)" />
            <SvgCircle cx={CX} cy={CX} r={RADIUS} fill="rgba(0,170,249,0.3)" filter="url(#glow1)" />
          </Svg>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/wolfe_avatar.png")}
              style={styles.logoImage}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>单词王者</Text>

        {/* Error message */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Phone input with embedded send button */}
        <View
          style={[
            styles.inputContainer,
            // Border invisible on white bg; subtle highlight on focus
            { borderColor: isFocused ? colors.secondary : colors.white },
          ]}
        >
          <TextInput
            placeholder="输入电话开始学习"
            placeholderTextColor={colors.greyDarker}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(text) => {
              setPhone(text.replace(/[^0-9]/g, ""));
              setError("");
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={[styles.input, { paddingRight: phone.length > 0 ? 0 : 20 }]}
            maxLength={11}
          />

          {/* Animated send button */}
          <Animated.View
            style={{
              transform: [{ scale: buttonScale }],
              opacity: buttonOpacity,
            }}
          >
            <TouchableOpacity onPress={handleSend} activeOpacity={0.85}>
              <LinearGradient
                colors={[colors.secondary, colors.primary]}
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
// STYLES
// =============================================================================

const styles = StyleSheet.create({
  // Full screen container
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.tertiary,
  },

  // Top blue glow - subtle, barely noticeable
  topShadow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 150, // Taller = more gradual fade
  },

  // Logo wrapper — contains Skia canvas + avatar image
  logoWrapper: {
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  glowCanvas: {
    position: "absolute",
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.white,
    overflow: "hidden",
    backgroundColor: colors.grey,
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },

  // Title
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: 24,
  },

  // Error text
  errorText: {
    color: colors.pink,
    fontSize: 14,
    marginBottom: 8,
  },

  // Phone input container (pill shape, subtle inner depth)
  inputContainer: {
    width: "85%",
    maxWidth: 360,
    height: 52,
    borderRadius: 9999,
    backgroundColor: colors.white,
    borderWidth: 1, // Thin border, invisible when white
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 6,
    // Simulated inset shadow for depth
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },

  // Text input
  input: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
    color: colors.black,
  },

  // Send button (pill shape with gradient)
  sendButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 9999,
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
