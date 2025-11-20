# 📱 Captea Platform - Mobile Testing Guide

**Date**: November 20, 2025, 16:05 EAT
**Status**: ✅ Ready for Testing

---

## 🎯 Quick Access URLs

| Service | URL | Status |
|---------|-----|--------|
| **APK Download** | <http://192.168.100.2:8083> | ✅ Ready |
| **Web App** | <http://192.168.100.2:8082> | ✅ Ready |
| **Public Web** | <https://captea.cosmaslabs.com> | ✅ Ready |

---

## 📲 Method 1: Download APK (Recommended)

### Step-by-Step Instructions

**1. Connect Your Phone**

- Connect your Android phone to the **same WiFi network** as the server
- WiFi network: Must be on 192.168.100.x subnet

**2. Open Download Page**

- On your phone, open any browser (Chrome, Firefox, Samsung Internet)
- Type this URL: **<http://192.168.100.2:8083>**
- Or scan the QR code (available at the URL above)

**3. Download APK**

- Tap the **"Download APK (84 MB)"** button
- Wait for download to complete (~1-2 minutes depending on WiFi speed)
- You'll see "captea-platform-v1.0.0.apk" in your downloads

**4. Enable Installation**

- Go to **Settings → Security → Install unknown apps**
- Find your **browser** in the list (e.g., Chrome, Firefox)
- Toggle **"Allow from this source"** to ON
- Alternative path: Settings → Apps → Special access → Install unknown apps

**5. Install APK**

- Open your **Downloads** folder or notification
- Tap **"captea-platform-v1.0.0.apk"**
- Tap **"Install"** when prompted
- Wait for installation (~10-20 seconds)
- Tap **"Open"** or find "Captea Platform" in your app drawer

**6. First Launch**

- Grant any requested permissions (Camera, Storage)
- You'll see the Welcome screen
- Tap **"Get Started"** to begin

---

## 🌐 Method 2: Use Web App on Phone

### Access via Local Network

**Option A: Local Network Access**

1. Open browser on your phone
2. Go to: **<http://192.168.100.2:8082>**
3. Bookmark for easy access

**Option B: Public URL (Internet Access)**

1. Open browser on your phone
2. Go to: **<https://captea.cosmaslabs.com>**
3. Works from anywhere with internet

### Why Web App on Phone?

✅ No installation required
✅ Always latest version
✅ Works on any device (Android, iOS, tablets)
✅ Less storage space (vs 84 MB APK)
✅ Test features before installing APK

---

## 🧪 Testing Checklist

### Essential Features to Test

**1. Authentication** (5 minutes)

- [ ] Welcome screen displays correctly
- [ ] Tap "Get Started" → goes to Sign Up
- [ ] Sign Up: Create account with email/password
- [ ] Receive confirmation
- [ ] Login: Sign in with credentials
- [ ] Session persists after closing app

**2. Home Feed** (3 minutes)

- [ ] Home tab loads
- [ ] Empty state shows if no posts
- [ ] Pull to refresh works
- [ ] Smooth scrolling (60 FPS)

**3. Create Post** (5 minutes)

- [ ] Tap "+" (Create) button
- [ ] Text input works
- [ ] Rich text formatting (bold, italic)
- [ ] Camera access works
- [ ] Gallery access works
- [ ] Upload image successfully
- [ ] Video selection works
- [ ] Post submits successfully

**4. Profile** (3 minutes)

- [ ] Profile tab displays your info
- [ ] Avatar/profile picture shows
- [ ] Posts count accurate
- [ ] Edit profile button works
- [ ] Logout works

**5. Notifications** (2 minutes)

- [ ] Notifications tab accessible
- [ ] Empty state shows if no notifications
- [ ] Real-time updates (if another user interacts)

**6. Performance** (3 minutes)

- [ ] App launches quickly (<3 seconds)
- [ ] No crashes or freezes
- [ ] Keyboard doesn't cover inputs
- [ ] Back button works correctly
- [ ] Navigation smooth (tabs, screens)

**7. Interactions** (5 minutes)

- [ ] Like a post (heart icon)
- [ ] Comment on a post
- [ ] Share functionality (if implemented)
- [ ] View post details
- [ ] Delete own post

---

## 🔧 Troubleshooting

### Issue: Can't Access <http://192.168.100.2:8083>

**Solution:**

1. Verify phone is on same WiFi network
2. Check server is running:

   ```bash
   # On server, run:
   curl http://192.168.100.2:8083
   ```

3. Try using server hostname instead of IP
4. Disable VPN on phone if active

### Issue: "Install Blocked" When Installing APK

**Solution:**

1. Go to Settings → Security → Install unknown apps
2. Enable for your browser
3. Try again

### Issue: APK Download Fails

**Solution:**

1. Check WiFi connection
2. Ensure enough storage (need 100+ MB free)
3. Try different browser
4. Clear browser cache

### Issue: Web App Loads But Blank Screen

**Solution:**

1. Clear browser cache
2. Disable ad blockers
3. Try incognito/private mode
4. Check JavaScript is enabled
5. Try different browser

### Issue: "Connection Refused" Error

**Solution:**

1. Verify servers are running:

   ```bash
   curl http://192.168.100.2:8082
   curl http://192.168.100.2:8083
   ```

2. Check firewall rules
3. Restart servers if needed

---

## 📊 What to Look For

### Good Signs ✅

- Fast loading (<3 seconds)
- Smooth animations
- No console errors (web version: F12 → Console)
- Images load quickly
- No crashes or hangs
- Keyboard appears/hides smoothly
- Back button works as expected

### Red Flags ⚠️

- App crashes on certain actions
- Slow loading (>5 seconds)
- Freezing or lag
- Images don't load
- Keyboard covers inputs
- Login doesn't persist
- 404 errors on navigation

---

## 🎥 Demo Flow (Show Off the App!)

**1. First Impression** (1 minute)

- Open app → Welcome screen
- "Get Started" → Sign Up
- Create account → Login

**2. Explore Features** (3 minutes)

- Home feed (empty state)
- Tap Create (+) → Upload image from gallery
- Add caption → Post
- See post in feed

**3. Profile** (1 minute)

- View profile
- Edit profile info
- Upload profile picture

**4. Interactions** (2 minutes)

- Like own post
- Comment on post
- View post details

---

## 🔄 Alternative: Direct APK Transfer

If network access doesn't work, transfer APK via USB:

```bash
# On server:
cd ~/projects/captea-platform-dev

# Connect phone via USB (enable USB debugging)
adb devices

# Install APK directly
adb install captea-platform-v1.0.0.apk
```

Or copy to phone storage and install from File Manager.

---

## 📞 Need Help?

**Quick Checks:**

```bash
# Verify servers running
curl http://192.168.100.2:8082
curl http://192.168.100.2:8083

# Check logs
tail -f /tmp/captea-web.log
tail -f /tmp/captea-apk.log

# Restart servers
pkill -f "serve.*808"
cd ~/projects/captea-platform-dev
serve dist -l tcp://0.0.0.0:8082 --single > /tmp/captea-web.log 2>&1 &
cd apk-download
serve . -l tcp://0.0.0.0:8083 > /tmp/captea-apk.log 2>&1 &
```

---

## 🎉 Success Criteria

Your testing session is successful when:

✅ APK downloads to phone
✅ APK installs without errors
✅ App launches and shows Welcome screen
✅ Sign up creates account
✅ Login works and persists
✅ Can create post with image
✅ Post appears in feed
✅ Navigation works smoothly
✅ No crashes during 5-minute use
✅ Web app accessible on phone (bonus)

---

## 📈 Next Steps After Testing

**If Everything Works:**

1. Document any minor UI issues
2. Test on multiple devices (different Android versions)
3. Invite team members to test
4. Gather feedback on user experience

**If Issues Found:**

1. Note exact steps to reproduce
2. Take screenshots/screen recordings
3. Check error logs
4. Report to development team

---

**QR Codes Available:**

- APK Download: `/home/cosmaslabs/projects/captea-platform-dev/apk-download/qr-apk.png`
- Web App: `/home/cosmaslabs/projects/captea-platform-dev/apk-download/qr-webapp.png`

**Print these QR codes** for instant access - just point your phone camera at them!

---

**Status**: ✅ **READY FOR MOBILE TESTING**
**Access**: Local network (192.168.100.x)
**Updated**: November 20, 2025, 16:05 EAT
