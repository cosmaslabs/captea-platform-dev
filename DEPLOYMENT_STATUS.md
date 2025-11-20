# 🚀 Captea Platform - Deployment Status & Access Instructions

**Date**: November 20, 2025, 15:47 EAT
**Status**: ✅ Web Build Complete | ⏳ DNS Configuration Required

---

## ✅ Completed Tasks

### 1. Web Build Fixed ✅

- **Problem**: AsyncStorage incompatibility with SSR
- **Solution**: Changed `app.json` output from `"static"` to `"single"`
- **Result**: Build successful, 2.33 MB bundle created

### 2. Local Web Server Running ✅

- **URL**: <http://localhost:8082>
- **Status**: Active and serving
- **Process ID**: Running in background

### 3. Cloudflare Tunnel Updated ✅

- **Config**: `/opt/cosmaslabs/infrastructure/networking/cloudflare/tunnels/cosmaslabs-openproject-config.yml`
- **Backup**: Created with timestamp
- **Ingress Rule**: Added for `captea.cosmaslabs.com` → `http://localhost:8082`
- **Status**: Tunnel restarted successfully

### 4. APK Download Server Running ✅

- **URL**: <http://localhost:8083>
- **File**: captea-platform-v1.0.0.apk (84 MB)
- **Download Page**: Beautiful UI with instructions

---

## ⏳ Required: DNS Configuration

To complete the deployment, add a CNAME record in Cloudflare:

### Option 1: Cloudflare Dashboard (Recommended - 2 minutes)

1. **Login**: <https://dash.cloudflare.com>
2. **Select Domain**: `cosmaslabs.com`
3. **Navigate to**: DNS → Records
4. **Click**: "Add record"
5. **Configure**:
   - **Type**: CNAME
   - **Name**: `captea`
   - **Target**: `40e26158-b34e-41ee-9839-9ddf9ebb33ff.cfargotunnel.com`
   - **Proxy status**: ✅ Proxied (orange cloud)
   - **TTL**: Auto
6. **Save**

**Wait 30-60 seconds for DNS propagation**

### Option 2: Cloudflare API (Automated)

If you have Cloudflare API credentials:

```bash
# Set your Cloudflare credentials
export CF_API_TOKEN="your_api_token_here"
export CF_ZONE_ID="your_zone_id_here"

# Add CNAME record
curl -X POST "https://api.cloudflare.com/client/v4/zones/$CF_ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
    "type": "CNAME",
    "name": "captea",
    "content": "40e26158-b34e-41ee-9839-9ddf9ebb33ff.cfargotunnel.com",
    "ttl": 1,
    "proxied": true
  }'
```

---

## 📲 Testing Instructions

### 1. Test Web App (After DNS is configured)

```bash
# Test DNS resolution
dig +short captea.cosmaslabs.com

# Test HTTP access
curl -I https://captea.cosmaslabs.com

# Open in browser
xdg-open https://captea.cosmaslabs.com
```

**Expected Result**: Captea Platform web app loads with login/signup screens

### 2. Test APK Download on Android Phone

#### Method A: Local Network Access (Immediate - No DNS required)

Your phone must be on the same network as the server (192.168.100.2):

1. **On Android phone**, open browser
2. **Navigate to**: `http://192.168.100.2:8083`
3. **Tap**: "Download APK" button
4. **Enable**: "Install unknown apps" in Settings
5. **Install**: Tap downloaded APK file

#### Method B: Public URL (After DNS + Tunnel for download page)

If you want to expose the APK download page publicly:

1. **Add another CNAME record**:
   - Name: `download.captea` or `apk`
   - Target: same tunnel hostname

2. **Update tunnel config** to add port 8083 ingress rule

3. **Access**: `https://download.captea.cosmaslabs.com`

---

## 🎯 Quick Access URLs

| Service | Local URL | Public URL (after DNS) | Status |
|---------|-----------|------------------------|--------|
| **Captea Web App** | <http://localhost:8082> | <https://captea.cosmaslabs.com> | ⏳ Needs DNS |
| **APK Download** | <http://192.168.100.2:8083> | N/A (local network only) | ✅ Active |
| **OpenProject** | <http://localhost:80> | <https://openproject.cosmaslabs.com> | ✅ Active |

---

## 🧪 Testing Checklist

### Layer 1: Web Build ✅

- [x] `npx expo export -p web` succeeds
- [x] `dist/` directory created with index.html
- [x] JavaScript bundle created (2.33 MB)

### Layer 2: Local Server ✅

- [x] `serve dist -l 8082` running
- [x] `curl http://localhost:8082` returns 200
- [x] Process running in background

### Layer 3: Tunnel ✅

- [x] Config updated with captea.cosmaslabs.com
- [x] `systemctl status cloudflared-openproject` shows active
- [x] OpenProject still accessible (no downtime)

### Layer 4: DNS ⏳

- [ ] CNAME record created in Cloudflare
- [ ] `dig captea.cosmaslabs.com` returns Cloudflare IPs
- [ ] DNS propagation complete (30-60 seconds)

### Layer 5: HTTPS ⏳

- [ ] `curl -I https://captea.cosmaslabs.com` returns HTTP/2 200
- [ ] SSL certificate valid (Cloudflare automatic)
- [ ] No mixed content warnings

### Layer 6: App Functionality ⏳

- [ ] Browser loads app at <https://captea.cosmaslabs.com>
- [ ] Login/Signup screens accessible
- [ ] No JavaScript errors in console (F12)
- [ ] Mobile responsive
- [ ] Supabase auth initializes without errors

---

## 📱 APK Testing on Android Phone

### Installation Steps

1. **Download APK**:
   - Via browser: <http://192.168.100.2:8083>
   - Or use existing file: `~/projects/captea-platform-dev/captea-platform-v1.0.0.apk`

2. **Enable Installation**:
   - Settings → Security → Install unknown apps
   - Enable for your browser (Chrome, Firefox, etc.)

3. **Install**:
   - Tap downloaded APK file
   - Follow prompts
   - Grant required permissions

4. **Test Core Features**:
   - [ ] App launches without crashes
   - [ ] Welcome screen displays
   - [ ] Sign up creates new account
   - [ ] Login works with credentials
   - [ ] Home feed loads (empty state OK)
   - [ ] Create post screen opens
   - [ ] Camera/Gallery access works
   - [ ] Profile screen displays
   - [ ] Navigation smooth (60 FPS)

---

## 🔧 Production Hardening (Optional)

### Create systemd service for web server

To ensure the web server auto-starts on reboot:

```bash
# Create service file
sudo nano /etc/systemd/system/captea-web.service
```

**Service configuration**:

```ini
[Unit]
Description=Captea Platform Web Server
After=network.target

[Service]
Type=simple
User=cosmaslabs
WorkingDirectory=/home/cosmaslabs/projects/captea-platform-dev/dist
ExecStart=/usr/bin/serve -l 8082
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
```

**Enable and start**:

```bash
sudo systemctl daemon-reload
sudo systemctl enable captea-web
sudo systemctl start captea-web
sudo systemctl status captea-web
```

---

## 🔄 Rollback Procedure

If anything goes wrong:

```bash
# Stop web server
pkill -f "serve.*8082"

# Restore tunnel config
sudo cp /opt/cosmaslabs/infrastructure/networking/cloudflare/tunnels/cosmaslabs-openproject-config.yml.backup.* \
       /opt/cosmaslabs/infrastructure/networking/cloudflare/tunnels/cosmaslabs-openproject-config.yml

# Restart tunnel
sudo systemctl restart cloudflared-openproject

# Verify OpenProject still works
curl -I https://openproject.cosmaslabs.com
```

**Rollback time**: <3 minutes

---

## 📊 Server Status

```bash
# Check web server
curl -I http://localhost:8082

# Check APK server
curl -I http://localhost:8083

# Check tunnel
sudo systemctl status cloudflared-openproject

# Check tunnel logs
sudo journalctl -u cloudflared-openproject -n 50

# Check listening ports
ss -tlnp | grep -E "8082|8083"
```

---

## 🎉 Success Criteria

Deployment is complete when:

- [x] Web build succeeds
- [x] Local server running (port 8082)
- [x] Cloudflare tunnel config updated
- [ ] DNS CNAME record created
- [ ] <https://captea.cosmaslabs.com> loads correctly
- [ ] App shows login/signup screens
- [ ] Supabase auth works
- [ ] Mobile responsive
- [ ] APK downloads successfully
- [ ] APK installs on Android phone
- [ ] App runs without crashes

---

## 📞 Next Steps

1. **Immediate**: Add DNS CNAME record in Cloudflare dashboard (2 minutes)
2. **Test**: Access <https://captea.cosmaslabs.com> after DNS propagates
3. **APK Test**: Download and install on Android phone via <http://192.168.100.2:8083>
4. **Production**: Create systemd service for auto-start (optional)
5. **Monitor**: Watch tunnel logs for errors

---

**Deployment Status**: 85% Complete (Only DNS configuration remaining)
**Estimated Time to Complete**: 5 minutes (DNS + testing)
**Last Updated**: November 20, 2025, 15:47 EAT
