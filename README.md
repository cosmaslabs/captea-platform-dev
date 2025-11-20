# 🎉 Captea Platform

> **Super Social App** - Connect, Share, and Engage

[![Built with Expo](https://img.shields.io/badge/Built%20with-Expo-000020?style=flat&logo=expo)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.76-61DAFB?style=flat&logo=react)](https://reactnative.dev)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=flat&logo=supabase)](https://supabase.com)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat)](LICENSE)

---

## 📱 About

**Captea Platform** is a modern social media application built with React Native and Expo, enabling users to:

- 📝 Create rich multimedia posts (text, images, videos)
- ❤️ Like, comment, and engage with content
- 👤 Manage personal profiles
- 🔔 Receive real-time notifications
- 💬 Chat with friends and connections
- 🚀 Experience seamless cross-platform performance

---

## ✨ Features

### Core Features

- ✅ **User Authentication** - Secure sign up/login with Supabase
- ✅ **Home Feed** - Scrollable feed with posts from all users
- ✅ **Create Posts** - Rich text editor with image/video upload
- ✅ **Engage** - Like, comment, and share posts
- ✅ **Profiles** - User profiles with posts and activity
- ✅ **Notifications** - Real-time notifications for interactions
- ✅ **Messages** - Direct messaging (coming soon)

### Technical Features

- 🎨 Modern, responsive UI with custom theme
- ⚡ Optimized performance (60 FPS scrolling)
- 🔄 Real-time updates with Supabase subscriptions
- 📸 Camera and gallery integration
- 🎥 Video playback and trimming
- 🌐 Web support via Expo
- 📱 Android & iOS support

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio or Xcode (for mobile testing)

### Installation

```bash
# Clone repository
git clone https://github.com/cosmaslabs/captea-platform-dev.git
cd captea-platform-dev

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npx expo start
```

### Running the App

```bash
# iOS Simulator
npx expo start --ios

# Android Emulator
npx expo start --android

# Web Browser
npx expo start --web
```

---

## 📲 Download & Install

### Android APK (Latest Build)

**Version**: 1.0.0
**Build Date**: November 20, 2025
**Size**: 79.69 MB

#### Quick Install Options

**Option 1: Scan QR Code**

Open your Android phone camera and scan:

[QR Code available in Expo dashboard]

**Option 2: Direct Download**

Download APK directly to your phone:

```
https://expo.dev/accounts/cosmaslabs/projects/captea-platform-dev/builds/6b7398e2-60fb-4a23-b30a-944ad4b6035c
```

**Option 3: Install via USB**

```bash
# Connect phone via USB, enable USB debugging
./install-apk.sh
```

#### Installation Steps

1. **Enable Unknown Sources**:
   - Settings → Security → Install unknown apps
   - Enable for your browser/file manager

2. **Download APK** using one of the methods above

3. **Install**: Tap the downloaded file and follow prompts

4. **Launch**: Find "Captea Platform" in your app drawer

---

## 🏗️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React Native** | Cross-platform mobile framework |
| **Expo Router** (SDK 51) | File-based navigation |
| **Supabase** | Backend-as-a-Service (auth, database, storage) |
| **React Native SVG** | Custom icons |
| **Expo Image Picker** | Camera and gallery access |
| **Expo AV** | Video playback |

---

## 📁 Project Structure

```
captea-platform-dev/
├── app/                      # Expo Router screens
│   ├── _layout.jsx          # Root layout
│   ├── index.jsx            # Auth check & redirect
│   ├── welcome.jsx          # Onboarding
│   ├── login.jsx            # Login screen
│   ├── signup.jsx           # Sign up screen
│   ├── (tabs)/              # Tab navigator
│   │   ├── home.jsx         # Home feed
│   │   ├── create.jsx       # Create post
│   │   ├── notifications.jsx
│   │   ├── profile.jsx
│   │   └── messages.jsx
│   └── post/[id].jsx        # Post detail
├── components/              # Reusable components
├── assets/                  # Images, icons
├── constants/               # Theme, config
├── contexts/                # React contexts
├── helpers/                 # Utilities
├── hooks/                   # Custom hooks
└── services/                # API services
```

---

## 🛠️ Development

### Key Commands

```bash
# Start development server
npx expo start

# Clear cache and restart
npx expo start --clear

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

### Building

```bash
# Build Android APK (preview)
eas build -p android --profile preview

# Build Android AAB (production)
eas build -p android --profile production

# Build iOS (requires Mac)
eas build -p ios --profile production
```

---

## 🌐 Web Deployment

### Access Web Version

**URL**: <https://captea.cosmaslabs.com> (coming soon)

### Deploy Web App

```bash
# Build web app
npx expo export -p web

# Serve locally
npx serve dist -l 8082
```

See [CLOUDFLARE_SETUP.md](CLOUDFLARE_SETUP.md) for detailed Cloudflare tunnel configuration.

---

## 📚 Documentation

- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Complete production deployment guide
- **[CLOUDFLARE_SETUP.md](CLOUDFLARE_SETUP.md)** - Cloudflare tunnel configuration
- **[.github/copilot-instructions.md](.github/copilot-instructions.md)** - Development guidelines

---

## 🧪 Testing

### Test on Physical Device

1. **Download APK** (see "Download & Install" section)
2. **Install on device**
3. **Test core features**:
   - Sign up / Login
   - Create post
   - Like / Comment
   - Profile view
   - Notifications

### Test Checklist

- [ ] Authentication flows
- [ ] Post creation with image/video
- [ ] Feed scrolling performance
- [ ] Real-time notifications
- [ ] Profile management
- [ ] Navigation between screens
- [ ] Offline behavior

---

## 🐛 Troubleshooting

### Common Issues

**App won't install**:

- Enable "Install unknown apps" in Android settings
- Check available storage (200MB+ required)

**App crashes on launch**:

- Check Supabase credentials in `.env`
- Clear app data and reinstall

**Images won't upload**:

- Grant camera/storage permissions
- Check internet connection

**Build fails**:

```bash
# Clear cache
npx expo start --clear

# Clean node modules
rm -rf node_modules package-lock.json
npm install
```

---

## 📊 Project Status

### Current Version: 1.0.0 (MVP)

**Completed** ✅:

- User authentication (sign up, login, logout)
- Home feed with posts
- Post creation with rich text
- Image and video upload
- Like and comment functionality
- User profiles
- Real-time notifications
- Responsive UI with custom theme
- Android APK build

**In Progress** 🔄:

- Direct messaging system
- Web deployment (captea.cosmaslabs.com)
- Push notifications
- Video trimming

**Planned** 📋:

- Stories feature
- Advanced search and filters
- User following/followers
- Hashtags and mentions
- Analytics dashboard
- Google Play Store release
- iOS App Store release

---

## 🤝 Contributing

This is a proprietary project by **Cosmaslabs Inc**.

For internal contributors:

1. Create feature branch: `git checkout -b feature/feature-name`
2. Make changes and test thoroughly
3. Commit: `git commit -m "Add feature description"`
4. Push: `git push origin feature/feature-name`
5. Create Pull Request for review

---

## 📄 License

**Proprietary** - Copyright © 2025 Cosmaslabs Inc. All rights reserved.

This software is private and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

---

## 📞 Contact

**Company**: Cosmaslabs Inc.
**Project**: Captea Platform (Super Social App)
**Website**: <https://cosmaslabs.com>
**Support**: <support@cosmaslabs.com>

---

## 🔗 Links

- **Expo Dashboard**: <https://expo.dev/accounts/cosmaslabs/projects/captea-platform-dev>
- **GitHub Repository**: <https://github.com/cosmaslabs/captea-platform-dev>
- **Web App**: <https://captea.cosmaslabs.com> (coming soon)
- **Supabase Project**: [Project Dashboard](https://supabase.com/dashboard)

---

## 🎯 Roadmap

### Phase 1: MVP (Current) ✅

- Core features complete
- Android APK available for testing

### Phase 2: Web Launch 🔄

- Deploy web version
- Configure captea.cosmaslabs.com
- Optimize for mobile browsers

### Phase 3: Production Release 📋

- Google Play Store submission
- App Store submission (iOS)
- Public launch

### Phase 4: Growth 🚀

- Marketing campaigns
- User acquisition
- Feature enhancements based on feedback
- Scale infrastructure

---

**Built with ❤️ by Cosmaslabs Inc**

---

## 🙏 Acknowledgments

- **Expo Team** - For amazing development tools
- **Supabase** - For powerful backend infrastructure
- **React Native Community** - For excellent libraries and support

---

**Last Updated**: November 20, 2025
**Status**: MVP Complete - Testing Phase
**Next Milestone**: Production Launch 🎉
