# Captea Platform - Project Initialization Checklist

**Complete setup guide for starting development**

---

## 📋 Pre-Development Setup

### 1. Environment Requirements

- [ ] **Node.js**: v18+ installed

  ```bash
  node --version  # Should show v18.x.x or higher
  ```

- [ ] **npm/yarn**: Latest version

  ```bash
  npm --version  # Should show 9.x.x or higher
  ```

- [ ] **Expo CLI**: Installed globally

  ```bash
  npm install -g expo-cli
  npx expo --version
  ```

- [ ] **Git**: Installed and configured

  ```bash
  git --version
  git config --global user.name "cosmaslabs"
  git config --global user.email "cosmas.exe@gmail.com"
  ```

### 2. Development Tools

- [ ] **VS Code**: Latest version installed
- [ ] **VS Code Extensions**:
  - [ ] ES7+ React/Redux/React-Native snippets (dsznajder.es7-react-js-snippets)
  - [ ] Simple React Snippets (burkeholland.simple-react-snippets)
  - [ ] React Native Tools (msjsdiag.vscode-react-native)
  - [ ] ESLint (dbaeumer.vscode-eslint)
  - [ ] Prettier (esbenp.prettier-vscode)
  - [ ] **GitHub Copilot** (github.copilot) ⭐

### 3. Mobile Development Environment

**iOS Development** (Mac only):

- [ ] Xcode installed from App Store
- [ ] Xcode Command Line Tools: `xcode-select --install`
- [ ] iOS Simulator configured

**Android Development**:

- [ ] Android Studio installed
- [ ] Android SDK configured
- [ ] Android emulator created and tested
- [ ] `ANDROID_HOME` environment variable set

### 4. Supabase Account Setup

- [ ] Create Supabase account at <https://supabase.com>
- [ ] Create new project: "captea-platform-dev"
- [ ] Copy project URL and anon key
- [ ] Enable real-time in database settings

---

## 🚀 Project Initialization

### Step 1: Initialize Expo App

```bash
cd ~/projects
npx create-expo-app captea-platform-dev --template blank
## copy the .github folder into the new project
cp -r ~/projects/captea-platform/.github captea-platform-dev/.github
cd captea-platform-dev
```

**Verify**:

```bash
npx expo start
```

Should open Expo dev tools in browser.

### Step 2: Install Core Dependencies

```bash
# React Native SVG (for icons)
npm install react-native-svg

# Supabase client
npm install @supabase/supabase-js

# AsyncStorage (for auth persistence)
npm install @react-native-async-storage/async-storage

# Safe Area Context (for screen wrapper)
npm install react-native-safe-area-context

# URL Polyfill (for Supabase)
npm install react-native-url-polyfill
```

**Verify**:

```bash
npm list --depth=0
```

All packages should show without errors.

### Step 3: Create Environment Configuration

```bash
# Create .env file
touch .env

# Add to .gitignore
echo ".env" >> .gitignore
```

**Edit `.env`**:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
EXPO_PUBLIC_ENV=development
```

**Verify**:

```bash
cat .env  # Should show your credentials
```

### Step 4: Setup AI Agent Configuration

```bash
# Create .github directory
mkdir -p .github

# Copy AI agent files (already created)
ls -la .github/
```

**Should show**:

- `copilot-instructions.md` ✅
- `session-prompts.md` ✅
- `README.md` ✅
- `QUICK_REFERENCE.md` ✅

### Step 5: Initialize Git Repository

```bash
# Initialize git
git init

# Add .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/

# Expo
.expo/
.expo-shared/
dist/

# Environment
.env
.env.local

# macOS
.DS_Store

# IDE
.vscode/
.idea/

# Testing
coverage/

# Build
*.jks
*.p8
*.p12
*.key
*.mobileprovision
*.orig.*
web-build/
EOF

# Initial commit
git add .
git commit -m "Initial commit: Captea Platform with AI agent setup"
```

### Step 6: Test Expo Development Server

```bash
npx expo start --clear
```

**Expected output**:

- Metro bundler starts
- QR code displays
- No errors in console

**Test on device**:

- [ ] Scan QR code with Expo Go app (iOS/Android)
- [ ] App loads successfully
- [ ] No red error screens

---

## 🎯 Phase 0: Clean Slate & Foundation

### Step 1: Delete Default Template Files

```bash
# Delete default app files
rm -rf app/*

# Delete default assets
rm -rf assets/*

# Delete default components
rm -rf components/*

# Delete constants/Colors.ts (we'll use theme.js)
rm -rf constants/Colors.ts

# Delete hooks
rm -rf hooks/*
```

**Verify**:

```bash
ls -la app/        # Should be empty
ls -la assets/     # Should be empty
ls -la components/ # Should be empty
```

### Step 2: Create Directory Structure

```bash
# Create core directories
mkdir -p app/{auth,\(tabs\),post}
mkdir -p components
mkdir -p assets/{icons,images}
mkdir -p constants
mkdir -p helpers
mkdir -p contexts
mkdir -p hooks
mkdir -p services
```

**Verify**:

```bash
tree -L 2  # Should show clean structure
```

### Step 3: Create Theme System

**Open Copilot Chat** and paste:

```
Create constants/theme.js with:
- Primary brand colors (modern social media palette: blue, white, dark)
- Text colors (primary, light, disabled)
- Background colors
- Border and shadow styles
- Font weights (medium, semibold, bold, extrabold)
- Radius values (xs, sm, md, lg, xl, doublexl)

Make it production-ready following .github/copilot-instructions.md patterns.
```

**Verify**: `constants/theme.js` created with comprehensive theme object.

### Step 4: Create Responsive Helpers

**Copilot Chat**:

```
Create helpers/common.js with HP (Height Percentage) and WP (Width Percentage)
functions using Dimensions API. Include JSDoc comments.
Follow exact pattern in .github/copilot-instructions.md Phase 0 section.
```

**Verify**: `helpers/common.js` exports `HP` and `WP` functions.

### Step 5: Create Root Layout

**Copilot Chat**:

```
Create app/_layout.jsx with:
- Stack layout from expo-router
- screenOptions: { headerShown: false }
- Clean, minimal setup

Follow .github/copilot-instructions.md Phase 0 specification.
```

**Test**:

```bash
npx expo start
```

No errors should appear.

### Step 6: Create Screen Wrapper

**Copilot Chat**:

```
Create components/ScreenWrapper.jsx that:
- Uses useSafeAreaInsets from react-native-safe-area-context
- Applies dynamic padding for notch (top + 5 if notch exists, else 30px)
- Accepts bg prop for background color
- Wraps children with safe area handling

Follow exact implementation in .github/copilot-instructions.md.
```

**Verify**: Component created with proper safe area handling.

---

## ✅ Phase 0 Completion Checklist

Verify all Phase 0 tasks are complete:

- [ ] **Theme system**: `constants/theme.js` exists with colors, fonts, radius
- [ ] **Responsive helpers**: `helpers/common.js` exports HP and WP functions
- [ ] **Root layout**: `app/_layout.jsx` has Stack with headerShown: false
- [ ] **Screen wrapper**: `components/ScreenWrapper.jsx` handles safe areas
- [ ] **Dependencies installed**: All npm packages installed successfully
- [ ] **Environment configured**: `.env` file has Supabase credentials
- [ ] **Git initialized**: Repository initialized with `.gitignore`
- [ ] **Expo running**: `npx expo start` works without errors

**Test Phase 0**:

```bash
# Start dev server
npx expo start --clear

# Should see:
# - No errors in console
# - Expo dev tools open
# - Can scan QR code and load blank app
```

---

## 🎓 Load AI Agent Context

**Open VS Code** → **Open Copilot Chat** → **Paste**:

```
Load the Captea Platform project context from .github/copilot-instructions.md.
This is a React Native social media app using Expo Router (SDK 51) and Supabase.
Review the current project structure and confirm Phase 0 is complete. Then provide:
1. Current project status summary
2. Next recommended tasks (Phase 1: UI Components)
3. Any issues or missing dependencies
```

Agent should confirm Phase 0 completion and suggest starting Phase 1.

---

## 📝 Ready for Development

You're now ready to start building! Next steps:

### Phase 1: Start Building UI Components

**Copilot Chat**:

```
We've completed Phase 0. Let's start Phase 1: UI Components.
Guide me through creating:
1. components/Loading.jsx
2. components/Button.jsx
3. components/Input.jsx

Start with Button.jsx - provide complete implementation following
.github/copilot-instructions.md Component Architecture section.
```

### Development Workflow

1. **Start session**: Load context with Copilot
2. **Pick a task**: Reference `session-prompts.md` for specific prompts
3. **Implement**: Use Copilot suggestions and chat guidance
4. **Test**: Run app after each component
5. **Commit**: Save working code frequently
6. **Next task**: Move to next component/feature

### Daily Checklist

**Start of day**:

- [ ] Pull latest code: `git pull`
- [ ] Start Expo: `npx expo start --clear`
- [ ] Load Copilot context: Use session-start prompt

**During development**:

- [ ] Test after each component
- [ ] Commit working features: `git commit -am "Add Button component"`
- [ ] Use specific prompts from `session-prompts.md`

**End of day**:

- [ ] Push code: `git push`
- [ ] Document progress in commit messages
- [ ] Note any blockers for next session

---

## 🆘 Troubleshooting

### Expo Won't Start

```bash
# Clear cache
rm -rf node_modules .expo
npm install
npx expo start --clear
```

### Dependencies Not Installing

```bash
# Clear npm cache
npm cache clean --force
rm package-lock.json
npm install
```

### Copilot Not Providing Suggestions

1. Check Copilot icon in VS Code status bar (should be active)
2. Reload window: Cmd+Shift+P → "Reload Window"
3. Restart VS Code
4. Check Copilot logs: Cmd+Shift+P → "Copilot: Show Output Channel"

### Environment Variables Not Loading

```bash
# Restart Expo
# Expo needs restart to pick up .env changes
npx expo start --clear
```

---

## 📚 Resources

**Project Documentation**:

- `.github/copilot-instructions.md` - Comprehensive guide
- `.github/session-prompts.md` - 50+ ready-to-use prompts
- `.github/README.md` - How to use AI agent setup
- `.github/QUICK_REFERENCE.md` - One-page cheat sheet

**External Docs**:

- React Native: <https://reactnative.dev>
- Expo: <https://docs.expo.dev>
- Expo Router: <https://docs.expo.dev/router/introduction>
- Supabase: <https://supabase.com/docs>

---

## ✨ Success Criteria

Your project is initialized successfully if:

✅ Expo dev server runs without errors
✅ Can load app on physical device or simulator
✅ All Phase 0 files created and verified
✅ AI agent loads context and provides guidance
✅ Git repository initialized with clean commits
✅ Environment variables configured
✅ Ready to start Phase 1: UI Components

---

**Congratulations! You're ready to build Captea Platform! 🎉**

Start with Phase 1 UI components using prompts from `.github/session-prompts.md`.

---

**Version**: 1.0.0
**Last Updated**: November 19, 2025
**Maintained By**: Cosmaslabs Inc
**Status**: ACTIVE
