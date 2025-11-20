# 🚀 Captea Platform - Production Deployment Guide

## 📋 Overview

This guide covers the complete production deployment process for Captea Platform:

- ✅ Android APK built and ready for testing
- ✅ GitHub repository configured
- ✅ EAS Build system configured
- 🔄 Cloudflare tunnel setup for web access (captea.cosmaslabs.com)

---

## 🎯 Build Information

### Latest Build Details

**Version**: 1.0.0
**Build ID**: `6b7398e2-60fb-4a23-b30a-944ad4b6035c`
**Platform**: Android
**Profile**: preview
**Status**: ✅ Finished
**APK Size**: 79.69 MB
**SDK Version**: 54.0.0

**Download Links**:

- **Local APK**: `~/projects/captea-platform-dev/captea-platform-v1.0.0.apk`
- **Expo Link**: <https://expo.dev/accounts/cosmaslabs/projects/captea-platform-dev/builds/6b7398e2-60fb-4a23-b30a-944ad4b6035c>
- **Direct Download**: <https://expo.dev/artifacts/eas/egzukAZyWRTNveR4Nepr2W.apk>

**QR Code**: Scan with your Android device to install directly

---

## 📱 Installing APK on Android Device

### Method 1: Direct Download on Phone

1. **On your Android phone**, open the Expo link:

   ```
   https://expo.dev/accounts/cosmaslabs/projects/captea-platform-dev/builds/6b7398e2-60fb-4a23-b30a-944ad4b6035c
   ```

2. **Tap "Download"** to download the APK

3. **Enable Unknown Sources**:
   - Go to **Settings** → **Security** (or **Privacy**)
   - Enable **Install unknown apps**
   - Select your browser (Chrome, Firefox, etc.)

4. **Install APK**:
   - Tap the downloaded file
   - Tap **Install**
   - Grant required permissions

5. **Launch App**: Find "Captea Platform" in your app drawer

### Method 2: Transfer from Computer (USB)

1. **Connect phone via USB** to your computer

2. **Enable USB Debugging**:
   - Settings → About Phone → Tap "Build Number" 7 times
   - Settings → Developer Options → Enable "USB Debugging"

3. **Transfer APK**:

   ```bash
   # Navigate to project directory
   cd ~/projects/captea-platform-dev

   # Install via ADB
   adb install captea-platform-v1.0.0.apk
   ```

4. **Launch**: Find "Captea Platform" in app drawer

### Method 3: Transfer via Cloud (Google Drive, Dropbox)

1. **Upload APK** to Google Drive or Dropbox from computer

2. **Download on phone** from cloud service

3. **Install** as described in Method 1

---

## 🧪 Testing Checklist

### Critical Features to Test

- [ ] **App Launch**: App opens without crashes
- [ ] **Welcome Screen**: Displays correctly with branding
- [ ] **Sign Up**: Create new account successfully
- [ ] **Login**: Login with credentials works
- [ ] **Session Persistence**: App remembers login after restart
- [ ] **Home Feed**: Displays (empty state if no posts)
- [ ] **Create Post**: Screen opens, text input works
- [ ] **Image Picker**: Camera and gallery access work
- [ ] **Video Picker**: Video selection works
- [ ] **Profile**: User profile displays
- [ ] **Notifications**: Screen accessible
- [ ] **Messages**: Screen accessible
- [ ] **Navigation**: Tab bar and back buttons work
- [ ] **Animations**: Smooth 60 FPS performance
- [ ] **Keyboard**: Doesn't cover input fields
- [ ] **Orientation**: Portrait mode locks correctly

### Performance Testing

- [ ] **Scrolling**: Smooth feed scrolling
- [ ] **Image Loading**: Images load without lag
- [ ] **Memory**: App doesn't crash after prolonged use
- [ ] **Network**: Works on WiFi and mobile data
- [ ] **Offline Mode**: Graceful handling of no internet

### Security Testing

- [ ] **Login Protection**: Can't access app without login
- [ ] **Session Timeout**: Sessions expire appropriately
- [ ] **Data Validation**: Form inputs validate correctly
- [ ] **Error Handling**: Errors display user-friendly messages

---

## 🌐 Web Deployment (Cloudflare Tunnel)

### Configure captea.cosmaslabs.com

Follow the detailed guide in `CLOUDFLARE_SETUP.md` for:

- Building Expo web app
- Configuring Cloudflare tunnel
- Setting up DNS records
- Testing web access

**Quick Commands**:

```bash
# Build web app
npx expo export -p web

# Serve on port 8082
npx serve dist -l 8082

# Update Cloudflare tunnel config
sudo nano /etc/cloudflared/config.yml

# Restart tunnel
sudo systemctl restart cloudflared
```

**Expected Result**: App accessible at `https://captea.cosmaslabs.com`

---

## 🔄 Continuous Deployment Workflow

### Making Changes and Rebuilding

1. **Make code changes** in your project

2. **Test locally**:

   ```bash
   npx expo start
   ```

3. **Commit changes**:

   ```bash
   git add .
   git commit -m "Descriptive commit message"
   git push origin main
   ```

4. **Rebuild APK**:

   ```bash
   eas build -p android --profile preview
   ```

5. **Download new build**:

   ```bash
   # Get latest build URL
   eas build:list --platform android --limit 1

   # Download
   wget -O captea-platform-v1.0.1.apk "ARTIFACT_URL"
   ```

6. **Test on device**

### Version Bumping

Update version in `app.json`:

```json
{
  "expo": {
    "version": "1.0.1",
    "android": {
      "versionCode": 2
    }
  }
}
```

**Important**: Increment `versionCode` for every new build!

---

## 📦 Building for Production (Google Play Store)

### Production Build (AAB)

```bash
# Build Android App Bundle for Play Store
eas build -p android --profile production
```

**AAB vs APK**:

- **APK**: For direct installation (testing, internal distribution)
- **AAB**: For Google Play Store (required for submission)

### Configure Google Play Console

1. **Create Google Play Developer Account**: <https://play.google.com/console>

2. **Create New App**:
   - Name: Captea Platform
   - Language: English
   - App Type: Application
   - Free/Paid: Free

3. **Complete Store Listing**:
   - Short description (80 chars)
   - Full description (4000 chars)
   - Screenshots (at least 2 per device type)
   - App icon (512x512 PNG)
   - Feature graphic (1024x500)

4. **Content Rating**: Complete questionnaire

5. **Upload AAB**:
   - Navigate to Production → Releases
   - Create new release
   - Upload AAB file
   - Submit for review

### Submit to Play Store

```bash
# Configure Google Play credentials
eas credentials

# Submit latest build
eas submit -p android --latest
```

**Review Time**: Typically 1-3 days

---

## 🍎 iOS Deployment (Future)

### Prerequisites

- Apple Developer Account ($99/year)
- Mac computer (for testing)
- Xcode installed

### Build iOS App

```bash
# Build iOS app
eas build -p ios --profile production

# Submit to App Store
eas submit -p ios --latest
```

**iOS specific requirements**:

- App Store screenshots
- Privacy policy URL
- App Store review guidelines compliance

---

## 🔐 Environment Variables for Production

### Create `.env.production`

```bash
# Supabase Production Credentials
EXPO_PUBLIC_SUPABASE_URL=https://your-prod-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
EXPO_PUBLIC_ENV=production
```

### Load Environment in Build

Configured in `eas.json`:

```json
{
  "build": {
    "production": {
      "env": {
        "EXPO_PUBLIC_ENV": "production"
      }
    }
  }
}
```

**Security Note**: Never commit `.env.production` to Git!

---

## 📊 Monitoring & Analytics

### Expo Analytics

View build analytics in Expo dashboard:

- Build history
- Download statistics
- Error reports

**Access**: <https://expo.dev/accounts/cosmaslabs/projects/captea-platform-dev>

### Supabase Dashboard

Monitor backend:

- User registrations
- API requests
- Database queries
- Storage usage

**Access**: <https://supabase.com/dashboard/project/your-project-id>

### Crash Reporting (Recommended)

Install Sentry for production crash tracking:

```bash
npm install @sentry/react-native
```

Configure in `app/_layout.jsx`:

```javascript
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'YOUR_SENTRY_DSN',
  enableInExpoDevelopment: false,
  debug: false,
});
```

---

## 🐛 Troubleshooting

### Build Fails

**Check**:

```bash
# View build logs
eas build:view --id BUILD_ID

# Check credentials
eas credentials
```

**Common Issues**:

- Missing environment variables
- Invalid app.json configuration
- Expired certificates

### APK Won't Install

**Solutions**:

1. Enable "Install unknown apps" in settings
2. Disable Play Protect temporarily
3. Clear old installation first
4. Check available storage space (>200MB)

### App Crashes on Launch

**Debug**:

```bash
# Connect phone via USB
adb logcat | grep Captea

# Or use Expo Go for development
npx expo start
```

**Common Causes**:

- Missing Supabase credentials
- Network connectivity issues
- Invalid app configuration

### Web Build Issues

**Check**:

```bash
# Test web build locally
npx expo export -p web
npx serve dist

# Check for errors
npx expo export -p web --dev
```

---

## 📚 Quick Reference

### Essential Commands

```bash
# Development
npx expo start                        # Start dev server
npx expo start --clear                # Clear cache and start

# Building
eas build -p android --profile preview          # Build preview APK
eas build -p android --profile production       # Build production AAB
eas build:list --platform android --limit 5    # List recent builds

# Downloading
wget -O app.apk "ARTIFACT_URL"        # Download APK

# Submitting
eas submit -p android --latest        # Submit to Play Store

# Web
npx expo export -p web                # Build web app
npx serve dist -l 8082                # Serve web app

# Git
git add .                             # Stage changes
git commit -m "message"               # Commit changes
git push origin main                  # Push to GitHub
```

### Important URLs

- **Expo Dashboard**: <https://expo.dev/accounts/cosmaslabs/projects/captea-platform-dev>
- **GitHub Repo**: <https://github.com/cosmaslabs/captea-platform-dev>
- **Web App**: <https://captea.cosmaslabs.com> (after Cloudflare setup)
- **Supabase**: <https://supabase.com/dashboard>

### Project IDs

- **EAS Project ID**: `58e0f865-932a-48b2-a91b-7500b705a297`
- **Android Package**: `com.cosmaslabs.captea`
- **iOS Bundle ID**: `com.cosmaslabs.captea`

---

## ✅ Deployment Checklist

### Phase 1: Testing (Current)

- [x] Build preview APK
- [x] Download APK locally
- [x] Configure GitHub repository
- [ ] Install APK on physical Android device
- [ ] Complete testing checklist
- [ ] Fix any bugs found
- [ ] Get user feedback

### Phase 2: Web Deployment

- [ ] Build Expo web app
- [ ] Configure Cloudflare tunnel
- [ ] Set up captea.cosmaslabs.com DNS
- [ ] Test web access
- [ ] Optimize for mobile browsers

### Phase 3: Production Release

- [ ] Complete all testing
- [ ] Prepare store assets (screenshots, descriptions)
- [ ] Build production AAB
- [ ] Set up Google Play Console
- [ ] Submit to Google Play Store
- [ ] Wait for approval
- [ ] Publish app

### Phase 4: Post-Launch

- [ ] Monitor crash reports
- [ ] Gather user feedback
- [ ] Plan feature updates
- [ ] Set up analytics
- [ ] Create marketing materials

---

## 🎉 Success Criteria

**MVP Launch Ready When**:

- ✅ APK installs on Android devices
- ✅ All core features functional
- ✅ No critical bugs
- ✅ Authentication works
- ✅ Posts can be created
- ✅ Web version accessible
- ✅ Performance is smooth (60 FPS)

---

**Last Updated**: November 20, 2025
**Status**: Phase 1 Complete - APK Built ✅
**Next Steps**: Install and test APK on physical Android device

---

## 📞 Support & Resources

- **Expo Documentation**: <https://docs.expo.dev/>
- **EAS Build Guide**: <https://docs.expo.dev/build/introduction/>
- **React Native Docs**: <https://reactnative.dev/>
- **Supabase Docs**: <https://supabase.com/docs>
- **Cloudflare Tunnel**: <https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/>

**Questions?** Open an issue on GitHub or contact the development team.
