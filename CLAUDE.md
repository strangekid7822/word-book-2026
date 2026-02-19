# CLAUDE.md - Project Guide for AI Assistants

## Project Overview
**单词王者 (Word King)** - A React Native mobile app for vocabulary learning.
Built with Expo, TypeScript, React Navigation, and NativeWind (Tailwind CSS).

---

## Tech Stack
- **Framework:** React Native + Expo (managed workflow)
- **Language:** TypeScript
- **Navigation:** React Navigation (Native Stack)
- **Styling:** NativeWind v4 (Tailwind CSS for React Native)
- **Animations:** React Native Animated API
- **SVG / Blur effects:** react-native-svg (bundled in Expo Go)

---

## Key Files & Folders

### Entry Points
| File | Purpose |
|------|---------|
| `App.tsx` | Root component. Imports global.css, renders AppNavigator |
| `src/navigation/AppNavigator.tsx` | All screen routing. Add new screens here |

### Styling (Single Source of Truth)
| File | Purpose |
|------|---------|
| `src/constants/colors.js` | **THE source of truth for ALL colors**. Edit this file to change colors |
| `src/constants/theme.ts` | TypeScript wrapper - imports from colors.js |
| `tailwind.config.js` | Tailwind config - imports from colors.js |
| `global.css` | Tailwind directives. Don't edit |

### Screens
| File | Purpose |
|------|---------|
| `src/screens/WelcomeScreen.tsx` | Phone input screen (first screen users see) |

### Assets
| File | Purpose |
|------|---------|
| `assets/wolfe_avatar.png` | App logo/mascot |

### Config Files (Usually Don't Edit)
| File | Purpose |
|------|---------|
| `babel.config.js` | Babel config with NativeWind JSX support |
| `metro.config.js` | Metro bundler with NativeWind wrapper |
| `tsconfig.json` | TypeScript configuration |
| `app.json` | Expo app configuration |

### Specs
| File | Purpose |
|------|---------|
| `specs/01_welcome_page.md` | Design spec for Welcome Screen |

---

## Color System

### How It Works
```
colors.js (source) → tailwind.config.js (for className)
                   → theme.ts (for inline styles)
```

### Available Colors
- `primary` (#00AAF9) - Main blue
- `secondary` (#87D9FF) - Light blue
- `tertiary` (#F3FBFF) - Background blue
- `white`, `black`, `grey`, `greyDarker`
- `pink` (#FF7787) - Error/accent
- `green` (#95FF87) - Success
- `orange` (#FF5900) - Warning

### Usage in Components
```tsx
// Tailwind classes (use kebab-case)
<View className="bg-primary text-white" />

// Inline styles (import from theme.ts)
import { colors } from '../constants/theme';
<View style={{ backgroundColor: colors.primary }} />
```

---

## How to Add a New Screen

1. Create screen file in `src/screens/`:
```tsx
// src/screens/HomeScreen.tsx
import { View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-tertiary">
      <Text>Home Screen</Text>
    </View>
  );
}
```

2. Register in `src/navigation/AppNavigator.tsx`:
```tsx
import HomeScreen from '../screens/HomeScreen';
// Inside Stack.Navigator:
<Stack.Screen name="Home" component={HomeScreen} />
```

3. Navigate from another screen:
```tsx
navigation.navigate('Home', { phone: phoneNumber });
```

---

## Commands

```bash
# Start development server
npx expo start

# Run on iOS simulator
npx expo start --ios

# Run on Android emulator
npx expo start --android

# Install dependencies
npm install
```

---

## Important Patterns

### Keyboard Handling
Use `KeyboardAvoidingView` to prevent keyboard covering inputs:
```tsx
<KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  className="flex-1"
>
```

### Shadows/Glows (React Native Limitation)
React Native doesn't support CSS box-shadow or inset shadows. Use:
- `LinearGradient` from `expo-linear-gradient` for gradient fades
- Nested Views with decreasing opacity for glow effects

### Animations
Use React Native's `Animated` API:
```tsx
const scale = useRef(new Animated.Value(0)).current;
Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
```

---

## File Naming Conventions
- Screens: `PascalCase` + `Screen.tsx` (e.g., `WelcomeScreen.tsx`)
- Components: `PascalCase.tsx` (e.g., `Button.tsx`)
- Constants: `camelCase.ts` or `camelCase.js`
- Specs: `##_snake_case.md` (e.g., `01_welcome_page.md`)
