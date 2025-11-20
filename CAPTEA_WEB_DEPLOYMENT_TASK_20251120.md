# Captea Platform - Web Deployment Task Assignment

**Date**: November 20, 2025, 15:30 EAT
**Assigned To**: Senior Software Engineer Agent
**Priority**: P2 (Important - Non-Critical)
**Project**: Captea Platform (React Native Social Media App)
**Status**: 🔲 BLOCKED - AsyncStorage/SSR Compatibility Issue

---

## Executive Summary

**Objective**: Deploy Captea Platform web version at `https://captea.cosmaslabs.com` via Cloudflare tunnel

**Current Status**:

- ✅ Android APK built and functional (v1.0.0, 79.69 MB)
- ✅ Infrastructure ready (cloudflared updated to 2025.11.1)
- ✅ Prometheus monitoring configured for tunnel
- ✅ AlertManager rules created
- ❌ **Web build failing** due to AsyncStorage incompatibility with SSR

**Blocker**: `npx expo export -p web` fails with `ReferenceError: window is not defined` when AsyncStorage tries to access browser APIs during static rendering.

---

## Problem Analysis

### Error Details

**Command**: `npx expo export -p web`

**Error**:

```
ReferenceError: window is not defined
    at getValue (/home/cosmaslabs/projects/captea-platform-dev/node_modules/@react-native-async-storage/async-storage/lib/commonjs/AsyncStorage.js:63:52)
    at getItemAsync (/home/cosmaslabs/projects/captea-platform-dev/node_modules/@supabase/auth-js/dist/main/lib/helpers.js:129:33)
    at s._recoverAndRefresh (/home/cosmaslabs/projects/captea-platform-dev/node_modules/@supabase/auth-js/dist/main/GoTrueClient.js:1848:57)
```

**Root Cause**:

1. **React Native AsyncStorage** (`@react-native-async-storage/async-storage`) doesn't work with web SSR/static rendering
2. **Supabase Auth** uses AsyncStorage for session persistence
3. **Expo static export** (`output: "static"` in app.json) pre-renders pages at build time (no `window` object available)

### Why This Happens

**React Native Apps vs Web**:

- React Native: AsyncStorage uses native iOS/Android storage APIs
- Web: AsyncStorage needs `window.localStorage` API
- SSR/Static Export: No `window` object exists during build-time rendering

**Supabase Auth Chain**:

```
Supabase Client → Auth Client → AsyncStorage → window.localStorage
                                      ↑
                                  NOT AVAILABLE during static export
```

---

## Solution Options

### Option 1: Disable SSR/Static Rendering (Recommended) ⭐

**Change**: Switch from static export to Single Page App (SPA) mode

**Implementation**:

1. Update `app.json`:

   ```json
   "web": {
     "favicon": "./assets/favicon.png",
     "bundler": "metro",
     "output": "single"  // Changed from "static"
   }
   ```

2. Rebuild:
   ```bash
   cd ~/projects/captea-platform-dev
   npx expo export -p web
   ```

**Pros**:

- ✅ Fixes AsyncStorage issue immediately
- ✅ No code changes required
- ✅ Full React Native functionality preserved
- ✅ Supabase auth works correctly

**Cons**:

- ⚠️ SPA requires JavaScript enabled (not SEO-friendly)
- ⚠️ Larger initial bundle size
- ⚠️ No pre-rendered HTML (slower first load)

**Use Case**: Internal testing, mobile-first apps (Captea is mobile-first)

### Option 2: Add Web-Specific Storage Polyfill (Complex)

**Change**: Replace AsyncStorage with web-compatible alternative

**Implementation**:

1. Install web storage adapter:

   ```bash
   cd ~/projects/captea-platform-dev
   npm install @react-native-async-storage/async-storage-web
   ```

2. Create platform-specific Supabase client:

   ```javascript
   // services/supabaseClient.web.js
   import AsyncStorage from "@react-native-async-storage/async-storage-web";
   import { createClient } from "@supabase/supabase-js";

   export const supabase = createClient(
     process.env.EXPO_PUBLIC_SUPABASE_URL,
     process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
     {
       auth: {
         storage: AsyncStorage,
         autoRefreshToken: true,
         persistSession: true,
         detectSessionInUrl: false,
       },
     }
   );
   ```

3. Use Metro resolver to swap implementations:
   ```javascript
   // metro.config.js
   module.exports = {
     resolver: {
       sourceExts: ["jsx", "js", "ts", "tsx", "json"],
       platforms: ["web", "android", "ios"],
     },
   };
   ```

**Pros**:

- ✅ Keeps static export
- ✅ Better SEO (pre-rendered HTML)
- ✅ Works with SSR

**Cons**:

- ⚠️ Requires code refactoring
- ⚠️ Complex platform-specific logic
- ⚠️ More testing required
- ⚠️ May break existing mobile functionality

### Option 3: Simple Landing Page (Quick Workaround)

**Change**: Deploy static HTML landing page with APK download links

**Implementation**:

1. Create simple `index.html` in `~/projects/captea-platform-dev/web-landing/`
2. Serve static HTML on port 8082
3. Configure Cloudflare tunnel to serve static directory

**Pros**:

- ✅ Immediate deployment (<15 minutes)
- ✅ No build errors
- ✅ Works for APK distribution

**Cons**:

- ⚠️ No actual web app functionality
- ⚠️ Just a download page

**Use Case**: Temporary solution while fixing Option 1/2

---

## Recommended Approach

**Primary**: **Option 1** (Disable SSR) - Fastest path to functional web app

**Reasoning**:

1. Captea is **mobile-first** (web is secondary/testing only)
2. No SEO requirements (not a public website)
3. Quick fix (5 minutes)
4. Full app functionality preserved

**Fallback**: **Option 3** (Landing page) - If Option 1 fails for any reason

---

## Implementation Steps (Option 1)

### Phase 1: Fix Web Build (15 minutes)

**Step 1: Update app.json**

```bash
cd ~/projects/captea-platform-dev
```

Edit `app.json`:

```json
{
  "expo": {
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro",
      "output": "single" // CHANGE THIS from "static"
    }
  }
}
```

**Step 2: Clear cache and rebuild**

```bash
# Clear Expo cache
npx expo start --clear

# Export web build (SPA mode)
npx expo export -p web

# Verify dist directory created
ls -lah dist/
```

**Step 3: Test locally**

```bash
# Install serve if not already installed
npm install -g serve

# Serve on port 8082
serve dist -l 8082

# Test in browser
curl -I http://localhost:8082
# Expected: HTTP/1.1 200 OK

# Test in actual browser
firefox http://localhost:8082
# Expected: Captea app loads, shows login/signup
```

### Phase 2: Configure Cloudflare Tunnel (10 minutes)

**Step 4: Backup tunnel config**

```bash
sudo cp /opt/cosmaslabs/infrastructure/networking/cloudflare/tunnels/cosmaslabs-openproject-config.yml \
       /opt/cosmaslabs/infrastructure/networking/cloudflare/tunnels/cosmaslabs-openproject-config.yml.backup.$(date +%Y%m%d-%H%M%S)
```

**Step 5: Add Captea ingress rule**

```bash
sudo nano /opt/cosmaslabs/infrastructure/networking/cloudflare/tunnels/cosmaslabs-openproject-config.yml
```

Add BEFORE the catch-all rule:

```yaml
# Captea Platform web app (ADDED November 20, 2025)
- hostname: captea.cosmaslabs.com
  service: http://localhost:8082
  originRequest:
    httpHostHeader: captea.cosmaslabs.com
    connectTimeout: 30s
    tlsTimeout: 10s
    tcpKeepAlive: 30s
    noTLSVerify: true # localhost doesn't have TLS
```

**Complete config should look like**:

```yaml
ingress:
  # OpenProject service routing through Apache
  - hostname: openproject.cosmaslabs.com
    service: http://localhost:80
    originRequest:
      httpHostHeader: openproject.cosmaslabs.com
      connectTimeout: 30s
      tlsTimeout: 10s
      tcpKeepAlive: 30s
      keepAliveConnections: 100
      keepAliveTimeout: 90s

  # Captea Platform web app (ADDED November 20, 2025)
  - hostname: captea.cosmaslabs.com
    service: http://localhost:8082
    originRequest:
      httpHostHeader: captea.cosmaslabs.com
      connectTimeout: 30s
      tlsTimeout: 10s
      tcpKeepAlive: 30s
      noTLSVerify: true

  # Catch-all rule (required as the last rule)
  - service: http_status:404
```

**Step 6: Validate YAML syntax**

```bash
sudo yamllint /opt/cosmaslabs/infrastructure/networking/cloudflare/tunnels/cosmaslabs-openproject-config.yml
# Expected: No errors
```

**Step 7: Restart tunnel**

```bash
sudo systemctl restart cloudflared-openproject

# Check status
sudo systemctl status cloudflared-openproject --no-pager | head -20

# Verify no errors in logs
sudo journalctl -u cloudflared-openproject -n 30 --no-pager
```

### Phase 3: DNS Configuration (5 minutes)

**Step 8: Add DNS CNAME record**

1. Login to Cloudflare Dashboard: <https://dash.cloudflare.com>
2. Select domain: `cosmaslabs.com`
3. Navigate to: **DNS** → **Records**
4. Click **Add record**
5. Configure:
   - **Type**: `CNAME`
   - **Name**: `captea` (subdomain)
   - **Target**: `40e26158-b34e-41ee-9839-9ddf9ebb33ff.cfargotunnel.com` (OpenProject tunnel hostname)
   - **Proxy status**: ✅ Proxied (orange cloud)
   - **TTL**: Auto
6. Click **Save**

**Step 9: Wait for DNS propagation**

```bash
# Check DNS resolution (may take 30-60 seconds)
dig captea.cosmaslabs.com +short
# Expected: Cloudflare IPs (104.28.x.x or 172.67.x.x)

# Alternative check
nslookup captea.cosmaslabs.com
```

### Phase 4: Testing & Validation (10 minutes)

**Step 10: Test HTTPS access**

```bash
# Test HTTP status
curl -I https://captea.cosmaslabs.com
# Expected: HTTP/2 200 OK

# Test HTML content
curl -s https://captea.cosmaslabs.com | head -20
# Expected: HTML with Captea app
```

**Step 11: Browser testing**

1. Open browser: `firefox https://captea.cosmaslabs.com`
2. Verify:
   - [ ] Page loads without errors
   - [ ] Captea branding visible
   - [ ] Login/Signup buttons work
   - [ ] No console errors (F12)
   - [ ] Supabase auth initializes

**Step 12: Mobile device testing**

1. Open phone browser: `https://captea.cosmaslabs.com`
2. Verify:
   - [ ] Responsive layout
   - [ ] Touch interactions work
   - [ ] Can create account
   - [ ] Can login

### Phase 5: Production Hardening (Optional, 20 minutes)

**Step 13: Create systemd service for Captea web**

```bash
sudo tee /etc/systemd/system/captea-web.service > /dev/null <<'EOF'
[Unit]
Description=Captea Platform Web Server
After=network.target
Wants=network.target

[Service]
Type=simple
User=cosmaslabs
Group=cosmaslabs
WorkingDirectory=/home/cosmaslabs/projects/captea-platform-dev/dist
ExecStart=/usr/bin/npm exec -y serve@latest -- -l 8082 -s
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal
SyslogIdentifier=captea-web

# Security
NoNewPrivileges=yes
PrivateTmp=yes

[Install]
WantedBy=multi-user.target
EOF
```

**Step 14: Enable auto-start**

```bash
# Reload systemd
sudo systemctl daemon-reload

# Enable service
sudo systemctl enable captea-web

# Start service
sudo systemctl start captea-web

# Check status
sudo systemctl status captea-web --no-pager
```

**Step 15: Add to Prometheus monitoring**

```bash
# Add to Prometheus config (optional - web server metrics)
sudo tee -a /etc/prometheus/prometheus.yml > /dev/null <<'EOF'

  # Captea Web Server - ADDED November 20, 2025
  - job_name: 'captea-web'
    static_configs:
      - targets: ['localhost:8082']
        labels:
          instance: 'buildv1'
          component: 'captea-web'
          tier: 'application'
          service: 'captea-platform'
          environment: 'production'
EOF

# Restart Prometheus
sudo systemctl restart prometheus
```

---

## Testing Checklist

### Layer-by-Layer Validation

**Layer 1: Web Build**

- [ ] `npx expo export -p web` succeeds
- [ ] `dist/` directory created
- [ ] `dist/index.html` exists and contains app code
- [ ] No console errors during build

**Layer 2: Local Web Server**

- [ ] `serve dist -l 8082` starts successfully
- [ ] `curl http://localhost:8082` returns HTTP 200
- [ ] `ss -tlnp | grep 8082` shows serve process listening
- [ ] Browser loads `http://localhost:8082` correctly

**Layer 3: Cloudflare Tunnel**

- [ ] Tunnel config YAML is valid (yamllint)
- [ ] `systemctl status cloudflared-openproject` shows active/running
- [ ] No errors in `journalctl -u cloudflared-openproject -n 50`
- [ ] Tunnel logs show ingress rule loaded

**Layer 4: DNS Resolution**

- [ ] `dig captea.cosmaslabs.com +short` returns Cloudflare IPs
- [ ] DNS propagation complete (30-60 seconds)
- [ ] CNAME record visible in Cloudflare dashboard

**Layer 5: HTTPS Access**

- [ ] `curl -I https://captea.cosmaslabs.com` returns HTTP/2 200
- [ ] SSL certificate valid (Cloudflare Universal SSL)
- [ ] No redirect loops
- [ ] Browser shows green padlock

**Layer 6: Application Functionality**

- [ ] Captea app loads in browser
- [ ] Login/Signup screens accessible
- [ ] Supabase auth initializes (check console)
- [ ] No JavaScript errors (F12 console)
- [ ] Mobile responsive (test on phone)

---

## Rollback Procedure

**If deployment fails**, rollback in <3 minutes:

```bash
# Step 1: Restore tunnel config backup
sudo cp /opt/cosmaslabs/infrastructure/networking/cloudflare/tunnels/cosmaslabs-openproject-config.yml.backup.* \
       /opt/cosmaslabs/infrastructure/networking/cloudflare/tunnels/cosmaslabs-openproject-config.yml

# Step 2: Restart tunnel
sudo systemctl restart cloudflared-openproject

# Step 3: Verify OpenProject still works
curl -I https://openproject.cosmaslabs.com
# Expected: HTTP/2 302 (redirect to /login)

# Step 4: Stop Captea web server (if systemd service created)
sudo systemctl stop captea-web

# Step 5: Remove DNS record from Cloudflare dashboard (optional)
```

**Rollback Time**: <3 minutes
**Impact**: Captea web unavailable, OpenProject unaffected

---

## Known Issues & Solutions

### Issue 1: "Text file busy" when updating cloudflared

**Symptom**: `wget` fails with "Text file busy"
**Solution**: Stop service first

```bash
sudo systemctl stop cloudflared-openproject
# Then download new binary
sudo wget -O /usr/local/bin/cloudflared <URL>
sudo systemctl start cloudflared-openproject
```

### Issue 2: "window is not defined" persists after changing to SPA

**Symptom**: Build still fails with AsyncStorage error
**Solution**: Clear Expo cache completely

```bash
cd ~/projects/captea-platform-dev
rm -rf .expo node_modules/.cache
npx expo start --clear
npx expo export -p web
```

### Issue 3: DNS not resolving

**Symptom**: `dig captea.cosmaslabs.com` returns NXDOMAIN
**Solutions**:

1. Wait 60 seconds for DNS propagation
2. Verify CNAME record exists in Cloudflare dashboard
3. Check proxy status is "Proxied" (orange cloud)
4. Flush local DNS cache: `sudo systemd-resolve --flush-caches`

### Issue 4: HTTP 502 Bad Gateway

**Symptom**: `curl https://captea.cosmaslabs.com` returns 502
**Diagnosis**: Backend web server not running
**Solutions**:

1. Check server: `ss -tlnp | grep 8082`
2. Start server: `cd ~/projects/captea-platform-dev && serve dist -l 8082`
3. Check logs: `journalctl -u captea-web -n 50` (if systemd service)

### Issue 5: HTTP 530 Error (Tunnel Issue)

**Symptom**: Cloudflare returns 530 error
**Diagnosis**: Tunnel not connected to Cloudflare edge
**Solutions**:

1. Check tunnel status: `systemctl status cloudflared-openproject`
2. Check logs: `journalctl -u cloudflared-openproject -n 50`
3. Restart tunnel: `sudo systemctl restart cloudflared-openproject`
4. Wait 30 seconds for connections to establish

---

## Success Criteria

**Deployment Complete** when:

- [x] ✅ cloudflared updated to 2025.11.1
- [x] ✅ Prometheus monitoring configured for tunnel
- [x] ✅ AlertManager rules created (4 rules)
- [ ] ⏳ Web build succeeds (`npx expo export -p web`)
- [ ] ⏳ Local web server running on port 8082
- [ ] ⏳ Cloudflare tunnel config updated with Captea ingress
- [ ] ⏳ DNS CNAME record created for `captea.cosmaslabs.com`
- [ ] ⏳ HTTPS access working: `https://captea.cosmaslabs.com`
- [ ] ⏳ Browser loads Captea app correctly
- [ ] ⏳ Supabase auth initializes without errors
- [ ] ⏳ Mobile responsive (tested on phone)
- [ ] ⏳ systemd service created (optional but recommended)
- [ ] ⏳ Documentation updated

---

## Infrastructure Status (As of November 20, 2025, 15:30 EAT)

**Completed by Infrastructure Agent**:

1. ✅ **cloudflared updated**: 2025.9.1 → 2025.11.1 (5-minute downtime, restored successfully)
2. ✅ **Prometheus monitoring**: Cloudflared metrics endpoint added to scrape targets
3. ✅ **AlertManager rules**: 4 rules created (CloudflaredTunnelDown, CloudflaredConnectionLow, CloudflaredConfigPushErrors, CloudflaredHighRequestErrorRate)
4. ✅ **Tunnel operational**: OpenProject accessible at `https://openproject.cosmaslabs.com`

**Current Tunnel Configuration**:

- **Tunnel ID**: `40e26158-b34e-41ee-9839-9ddf9ebb33ff`
- **Version**: cloudflared 2025.11.1 (built 2025-11-07-16:59 UTC)
- **Process ID**: 97026
- **Uptime**: ~1 hour (stable)
- **Resource Usage**: 37.5 MB RAM, <0.1% CPU
- **Connections**: 1 active (functional despite ISP UDP blocking)
- **Hosted Services**: 1 (OpenProject)
- **Available Capacity**: 9+ additional services (port 8082+ available)

---

## Resources & References

**Project Documentation**:

- `~/projects/captea-platform-dev/README.md` - Project overview
- `~/projects/captea-platform-dev/DEPLOYMENT_GUIDE.md` - Deployment workflow
- `~/projects/captea-platform-dev/CLOUDFLARE_SETUP.md` - Cloudflare tunnel setup
- `~/projects/captea-platform-dev/PRODUCTION_SUMMARY.md` - Build status

**Infrastructure Documentation**:

- `/usr/share/doc/cosmaslabs/technical-architecture/infrastructure-operations/guides/CLOUDFLARE_TUNNEL_INFRASTRUCTURE_AUDIT.md` - Complete tunnel audit (50+ pages)
- `/usr/share/doc/cosmaslabs/technical-architecture/infrastructure-operations/AGENTS.md` - Infrastructure agent instructions (see "Cloudflare Tunnel Infrastructure" section)

**Cloudflare Dashboard**:

- Tunnel Management: <https://dash.cloudflare.com> → Networks → Cloudflare Tunnel
- DNS Management: <https://dash.cloudflare.com> → cosmaslabs.com → DNS → Records

**Expo Resources**:

- Build Dashboard: <https://expo.dev/accounts/cosmaslabs/projects/captea-platform-dev>
- Latest Build: <https://expo.dev/accounts/cosmaslabs/projects/captea-platform-dev/builds/6b7398e2-60fb-4a23-b30a-944ad4b6035c>
- APK Download: <https://expo.dev/artifacts/eas/egzukAZyWRTNveR4Nepr2W.apk>

---

## Estimated Timeline

**Total Time**: 40-60 minutes (depends on Option chosen)

| Phase                                        | Duration | Status     |
| -------------------------------------------- | -------- | ---------- |
| **Phase 1**: Fix web build                   | 15 min   | 🔲 Pending |
| **Phase 2**: Configure tunnel                | 10 min   | 🔲 Pending |
| **Phase 3**: DNS setup                       | 5 min    | 🔲 Pending |
| **Phase 4**: Testing                         | 10 min   | 🔲 Pending |
| **Phase 5**: Production hardening (optional) | 20 min   | 🔲 Pending |

**Fast Track** (Option 1): ~40 minutes
**Full Production** (Option 1 + Phase 5): ~60 minutes
**Quick Workaround** (Option 3): ~15 minutes

---

## Next Steps for Software Engineer Agent

1. **Read this document completely** - Understand the problem and solutions
2. **Choose Option 1** (Disable SSR) - Fastest path to success
3. **Execute Phase 1** - Fix web build by changing `output: "single"` in app.json
4. **Test locally** - Verify build works and server runs on port 8082
5. **Execute Phase 2** - Update Cloudflare tunnel config (infrastructure changes)
6. **Execute Phase 3** - Add DNS CNAME record in Cloudflare dashboard
7. **Execute Phase 4** - Complete testing checklist
8. **Execute Phase 5** (Optional) - Create systemd service for auto-start
9. **Update documentation** - Update Captea project docs with deployment status
10. **Notify founder** - Send deployment confirmation with URL

---

## Contact & Support

**For Infrastructure Questions**:

- Infrastructure Team: <infrastructure@cosmaslabs.com>
- Escalation: CTO

**For Captea App Questions**:

- Development Team: <dev@cosmaslabs.com>
- Project Owner: Founder/CEO

**Emergency Rollback**: Use procedure above (<3 minutes)

---

**Document Version**: 1.0.0
**Created**: November 20, 2025, 15:30 EAT
**Author**: Senior Infrastructure Administrator Agent
**Status**: Ready for Software Engineer Agent
**Priority**: P2 (Important - Non-Critical)
