# Welcome Page Specification

## Overview
A simple, centered landing page with a logo, title, phone input field, and animated send button.

---

## Layout Structure
```
┌─────────────────────────────────────┐
│                                     │
│          (vertical flex,            │
│           center content)           │
│                                     │
│         ┌─────────────┐             │
│         │    LOGO     │  (80x80 px) │
│         │ (circular)  │             │
│         └─────────────┘             │
│                                     │
│           单词王者                   │
│         (App Title)                 │
│                                     │
│     ┌──────────────────────┐        │
│     │ 输入电话开始学习        │        │
│     │   [    Send Btn     ]│        │
│     └──────────────────────┘        │
│        (Phone Input Field)          │
│                                     │
└─────────────────────────────────────┘
```

---

## Colors (use these exact hex values)

| Token | Hex |
|-------|-----|
| Primary Blue | `#00AAF9` |
| Secondary Blue | `#87D9FF` |
| Tertiary (background) | `#F3FBFF` |
| White | `#FFFFFF` |
| Black | `#000000` |
| Grey | `#D9D9D9` |
| Error Pink | `#FF7787` |

---

## Component Details

### 1. Background
- Full screen, color: `#F3FBFF`
- **Inner shadow at top:** `inset 0px 15px 30px rgba(0, 170, 249, 0.3)`
  - Creates a soft blue glow fading down from top edge

### 2. Logo
- Image file: `wolfe_avatar.png` (add to assets folder)
- Size: `120 x 120` pixels
- Shape: Circular (`borderRadius: 60`)
- Border: `3px solid #FFFFFF`
- **Glow effect** (two-layer shadow):
  - Inner: `0 0 20px rgba(0, 170, 249, 0.3)`
  - Outer: `0 0 40px rgba(0, 170, 249, 0.2)`
- Margin bottom: `24px`

### 3. Title
- Text: `单词王者`
- Font size: `28px`
- Font weight: `bold`
- Color: `#00AAF9` (primary blue)
- Margin bottom: `24px`

### 4. Error Message (conditional)
- Only shows when validation fails
- Text color: `#FF7787`
- Font size: `14px`
- Margin bottom: `8px`

### 5. Phone Input Field
- Width: `90%` of screen, max `400px`
- Height: `48px`
- Border radius: `9999` (full pill shape)
- Background: `#FFFFFF`
- Border: `1px solid #FFFFFF`
- Text alignment: `center`
- Font size: `16px`
- Placeholder: `输入电话开始学习`
- Keyboard type: `phone-pad`
- Inner shadow: `inset 2px 2px 5px rgba(0,0,0,0.05)` (use `elevation` or shadow props)
- On focus: add `2px` ring with `#00AAF9`

### 6. Send Button (inside input, right side)
- Only appears when input has text (animate in)
- Animation: scale from 0→1, opacity 0→1, duration `300ms`
- Position: absolute right inside the input
- Text: `发送`
- Font size: `14px`, bold, white
- Background: `linear-gradient(to bottom, #1AB6FF, #00AAF9)` (use `expo-linear-gradient`)
- Border: `2px solid rgba(255,255,255,0.3)`
- Border radius: `9999`
- Padding horizontal: `16px`
- Shadow: `0 4px 12px rgba(0,100,180,0.4)`
- On press: `scale(1.05)` briefly

---

## User Flow

1. User opens app → sees Welcome page
2. User taps input → phone keyboard appears
3. User types → send button animates in when text exists
4. User taps "发送":
   - If NOT 11 digits: show error `请输入11位手机号码`
   - If valid: navigate to Home screen (pass phone via navigation params)

---

## Implementation Notes

- Use `KeyboardAvoidingView` to prevent keyboard covering input
- Use `react-native-reanimated` or `Animated` API for send button reveal
- Pass phone number to Home screen via `navigation.navigate('Home', { phone })`
